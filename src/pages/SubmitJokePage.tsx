import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FiSend, FiAlertCircle, FiCheckCircle, FiPlus } from 'react-icons/fi';
import { categoryService } from '../services/categoryService';
import { jokeService } from '../services/jokeService';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import './SubmitJokePage.css';

export default function SubmitJokePage() {
    const { user } = useAuthStore();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.getCategories(),
    });

    const submitMutation = useMutation({
        mutationFn: (data: { title: string; content: string; category_id: string; author_id: string }) =>
            jokeService.createJoke(data),
        onSuccess: () => {
            toast.success('Truyện của bạn đã được gửi và đang chờ duyệt!');
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (err: any) => {
            console.error('Submit error:', err);
            const errorMsg = err.message || 'Có lỗi xảy ra khi gửi truyện';
            setError(errorMsg);
            toast.error(errorMsg);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!user) {
            setError('Bạn cần đăng nhập để đóng góp truyện');
            return;
        }

        if (!title.trim()) {
            setError('Vui lòng nhập tiêu đề');
            return;
        }

        if (!content.trim()) {
            setError('Vui lòng nhập nội dung truyện');
            return;
        }

        if (!categoryId) {
            setError('Vui lòng chọn danh mục');
            return;
        }

        if (title.length < 5) { // Relaxed validation
            setError('Tiêu đề phải có ít nhất 5 ký tự');
            return;
        }

        if (content.length < 20) { // Relaxed validation
            setError('Nội dung phải có ít nhất 20 ký tự');
            return;
        }

        submitMutation.mutate({
            title: title.trim(),
            content: content.trim(),
            category_id: categoryId,
            author_id: user.id,
        });
    };

    const handleReset = () => {
        setTitle('');
        setContent('');
        setCategoryId('');
        setError('');
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        return (
            <div className="submit-page">
                <div className="submit-container container-sm">
                    <div className="success-card card animate-fade-in">
                        <div className="success-icon">
                            <FiCheckCircle size={64} color="var(--color-success)" />
                        </div>
                        <h2 className="success-heading">Gửi truyện thành công!</h2>
                        <p className="success-paragraph">
                            Cảm ơn bạn đã đóng góp cho cộng đồng. Truyện của bạn đã được gửi đến ban quản trị và đang chờ duyệt.
                        </p>
                        <div className="success-actions">
                            <button onClick={handleReset} className="btn btn-primary">
                                <FiPlus /> Gửi thêm truyện khác
                            </button>
                            <button onClick={() => window.location.href = '/'} className="btn btn-secondary">
                                Quay về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="submit-page">
            <div className="submit-container container">
                <div className="submit-header">
                    <h1 className="submit-title">
                        <span className="submit-emoji">✍️</span>
                        Đóng góp truyện cười
                    </h1>
                    <p className="submit-subtitle">
                        Chia sẻ những câu chuyện cười hay của bạn với mọi người!
                    </p>
                </div>

                {/* Guidelines */}
                <div className="guidelines-card card">
                    <h3 className="guidelines-title">
                        <FiAlertCircle />
                        Hướng dẫn đóng góp
                    </h3>
                    <ul className="guidelines-list">
                        <li>Tiêu đề phải rõ ràng, súc tích (tối thiểu 5 ký tự)</li>
                        <li>Nội dung truyện phải đầy đủ, dễ hiểu (tối thiểu 20 ký tự)</li>
                        <li>Chọn đúng danh mục phù hợp với nội dung</li>
                        <li>Không đăng nội dung vi phạm pháp luật, phản cảm</li>
                        <li>Truyện sẽ được admin duyệt trước khi hiển thị công khai</li>
                    </ul>
                </div>

                <div className="submit-grid">
                    {/* Submit Form */}
                    <form onSubmit={handleSubmit} className="submit-form card">
                        {error && (
                            <div className="submit-error">
                                <FiAlertCircle />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Title */}
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Tiêu đề truyện <span className="required">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="VD: Chuyện cười về anh hàng xóm..."
                                className="input"
                                maxLength={255}
                            />
                            <div className="form-hint">
                                {title.length}/255 ký tự
                            </div>
                        </div>

                        {/* Category */}
                        <div className="form-group">
                            <label htmlFor="category" className="form-label">
                                Danh mục <span className="required">*</span>
                            </label>
                            {categoriesLoading ? (
                                <div className="skeleton" style={{ height: '48px' }}></div>
                            ) : (
                                <select
                                    id="category"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="input select"
                                >
                                    <option value="">-- Chọn danh mục --</option>
                                    {categories?.map((category: any) => (
                                        <option key={category.id} value={category.id}>
                                            {category.icon} {category.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Content */}
                        <div className="form-group">
                            <label htmlFor="content" className="form-label">
                                Nội dung truyện <span className="required">*</span>
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Nhập nội dung truyện cười của bạn ở đây..."
                                className="input textarea"
                                rows={12}
                            />
                            <div className="form-hint">
                                {content.length} ký tự
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="btn btn-secondary"
                                disabled={submitMutation.isPending}
                            >
                                Làm mới
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitMutation.isPending}
                            >
                                {submitMutation.isPending ? (
                                    <>
                                        <span className="spinner"></span>
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        <FiSend />
                                        Gửi truyện
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Preview Area */}
                    <div className="preview-sticky">
                        {(title || content) ? (
                            <div className="preview-section card">
                                <h3 className="preview-title">
                                    <FiCheckCircle />
                                    Xem trước
                                </h3>
                                <div className="preview-card">
                                    {categoryId && categories && (
                                        <span className="preview-category badge badge-primary">
                                            {categories.find((c: any) => c.id === categoryId)?.icon}{' '}
                                            {categories.find((c: any) => c.id === categoryId)?.name}
                                        </span>
                                    )}
                                    <h4 className="preview-joke-title">
                                        {title || 'Tiêu đề truyện'}
                                    </h4>
                                    <div className="preview-joke-content">
                                        {content || 'Nội dung truyện sẽ hiển thị ở đây...'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="preview-empty card">
                                <div className="empty-icon">👀</div>
                                <p>Nhập nội dung để xem trước hiển thị tại đây</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
