import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    FiCheck,
    FiX,
    FiBarChart2,
    FiMessageSquare,
    FiUsers,
    FiHeart,
    FiClock,
    FiEdit2,
    FiSave
} from 'react-icons/fi';
import { adminService } from '../services/adminService';
import { categoryService } from '../services/categoryService';
import { jokeService } from '../services/jokeService';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import toast from 'react-hot-toast';
import type { Joke } from '../lib/supabase';
import './AdminPage.css';

type AdminTab = 'dashboard' | 'pending' | 'all';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
    const [editingJoke, setEditingJoke] = useState<Joke | null>(null);
    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    // Fetch Stats
    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: () => adminService.getStats(),
    });

    // Fetch Categories
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.getCategories(),
    });

    // Fetch Jokes
    const { data: jokesData, isLoading: jokesLoading } = useQuery({
        queryKey: ['admin-jokes', activeTab],
        queryFn: () => jokeService.getJokes({
            status: activeTab === 'pending' ? 'pending' : undefined
        }, 1, 50),
        enabled: activeTab !== 'dashboard'
    });

    // Mutation for Approve
    const approveMutation = useMutation({
        mutationFn: (jokeId: string) => jokeService.approveJoke(jokeId, user?.id || ''),
        onSuccess: () => {
            toast.success('Đã duyệt truyện thành công');
            queryClient.invalidateQueries({ queryKey: ['admin-jokes'] });
            queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
        }
    });

    // Mutation for Reject
    const rejectMutation = useMutation({
        mutationFn: ({ jokeId, reason }: { jokeId: string, reason: string }) =>
            jokeService.rejectJoke(jokeId, user?.id || '', reason),
        onSuccess: () => {
            toast.success('Đã từ chối truyện');
            queryClient.invalidateQueries({ queryKey: ['admin-jokes'] });
            queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
        }
    });

    // Mutation for Update
    const updateMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string, updates: Partial<Joke> }) =>
            jokeService.updateJoke(id, updates),
        onSuccess: () => {
            toast.success('Đã cập nhật truyện thành công');
            setEditingJoke(null);
            queryClient.invalidateQueries({ queryKey: ['admin-jokes'] });
        }
    });

    const handleReject = (jokeId: string) => {
        const reason = window.prompt('Lý do từ chối (không bắt buộc):') || 'Nội dung không phù hợp';
        rejectMutation.mutate({ jokeId, reason });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingJoke) return;

        updateMutation.mutate({
            id: editingJoke.id,
            updates: {
                title: editingJoke.title,
                content: editingJoke.content,
                category_id: editingJoke.category_id
            }
        });
    };

    return (
        <div className="admin-page">
            <div className="container">
                <header className="admin-header">
                    <h1 className="admin-title">Quản trị hệ thống</h1>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon stat-purple">
                            <FiBarChart2 />
                        </div>
                        <div className="stat-info">
                            <h3>Tổng số truyện</h3>
                            <p className="stat-value">{stats?.totalJokes || 0}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon stat-orange">
                            <FiClock />
                        </div>
                        <div className="stat-info">
                            <h3>Chờ duyệt</h3>
                            <p className="stat-value">{stats?.pendingJokes || 0}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon stat-blue">
                            <FiUsers />
                        </div>
                        <div className="stat-info">
                            <h3>Người dùng</h3>
                            <p className="stat-value">{stats?.totalUsers || 0}</p>
                        </div>
                    </div>
                    {/* Likes stat hidden temporarily */}
                </div>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <FiBarChart2 /> Tổng quan
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        <FiClock /> Chờ duyệt {stats?.pendingJokes ? `(${stats.pendingJokes})` : ''}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        <FiMessageSquare /> Tất cả truyện
                    </button>
                </div>

                {activeTab === 'dashboard' ? (
                    <div className="dashboard-view animate-fade-in">
                        <div className="card">
                            <h3>Chào mừng Admin!</h3>
                            <p>Chào mừng bạn quay lại hệ thống quản trị Truyện Cười. Hãy kiểm tra các truyện đang chờ duyệt để kịp thời cập nhật nội dung tốt nhất cho người dùng.</p>
                            {stats?.pendingJokes ? (
                                <div className="pending-alert">
                                    <span>Bạn có <strong>{stats.pendingJokes}</strong> truyện đang chờ được duyệt.</span>
                                    <button onClick={() => setActiveTab('pending')} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-primary)' }}>Xem ngay</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="management-view animate-fade-in">
                        <div className="admin-content-card">
                            <table className="management-table">
                                <thead>
                                    <tr>
                                        <th>Truyện</th>
                                        <th>Tác giả</th>
                                        <th>Danh mục</th>
                                        <th>Ngày gửi</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jokesLoading ? (
                                        <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}><span className="spinner"></span> Đang tải...</td></tr>
                                    ) : (jokesData?.jokes || []).map(joke => (
                                        <tr key={joke.id}>
                                            <td>
                                                <div className="joke-cell-content">
                                                    <span className="joke-cell-title">{joke.title}</span>
                                                    <div className="joke-cell-snippet">{joke.content}</div>
                                                </div>
                                            </td>
                                            <td>{joke.author?.full_name || joke.author?.username || 'Ẩn danh'}</td>
                                            <td>{joke.category?.icon} {joke.category?.name}</td>
                                            <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                                                {format(new Date(joke.created_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                                            </td>
                                            <td>
                                                <span className={`status-badge status-${joke.status}`}>
                                                    {joke.status === 'pending' ? 'Chờ duyệt' : joke.status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button
                                                        onClick={() => setEditingJoke(joke)}
                                                        className="btn btn-secondary btn-sm"
                                                        title="Sửa truyện"
                                                    >
                                                        <FiEdit2 />
                                                    </button>
                                                    {joke.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => approveMutation.mutate(joke.id)}
                                                                className="btn btn-approve btn-sm"
                                                                disabled={approveMutation.isPending}
                                                                title="Duyệt truyện"
                                                            >
                                                                <FiCheck />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(joke.id)}
                                                                className="btn btn-reject btn-sm"
                                                                disabled={rejectMutation.isPending}
                                                                title="Từ chối"
                                                            >
                                                                <FiX />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {!jokesLoading && jokesData?.jokes.length === 0 && (
                                        <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>Không có truyện nào.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingJoke && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal card animate-fade-in">
                        <div className="modal-header">
                            <h3>Chỉnh sửa truyện</h3>
                            <button className="btn-close" onClick={() => setEditingJoke(null)}>
                                <FiX />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="edit-form">
                            <div className="form-group">
                                <label className="form-label">Tiêu đề</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={editingJoke.title}
                                    onChange={e => setEditingJoke({ ...editingJoke, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Danh mục</label>
                                <select
                                    className="input select"
                                    value={editingJoke.category_id || ''}
                                    onChange={e => setEditingJoke({ ...editingJoke, category_id: e.target.value })}
                                    required
                                >
                                    <option value="">-- Chọn danh mục --</option>
                                    {categories?.map(c => (
                                        <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Nội dung</label>
                                <textarea
                                    className="input textarea"
                                    rows={12}
                                    value={editingJoke.content}
                                    onChange={e => setEditingJoke({ ...editingJoke, content: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setEditingJoke(null)}>Hủy</button>
                                <button type="submit" className="btn btn-primary" disabled={updateMutation.isPending}>
                                    {updateMutation.isPending ? <span className="spinner"></span> : <><FiSave /> Lưu thay đổi</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
