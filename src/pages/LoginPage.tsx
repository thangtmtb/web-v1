import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success('Đăng nhập thành công!');
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại');
            toast.error('Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card card">
            <div className="auth-header">
                <h1 className="auth-title">Đăng nhập</h1>
                <p className="auth-subtitle">Chào mừng bạn trở lại! 👋</p>
            </div>

            {error && (
                <div className="auth-error">
                    <FiAlertCircle />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <div className="input-wrapper">
                        <FiMail className="input-icon" />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="input"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Mật khẩu
                    </label>
                    <div className="input-wrapper">
                        <FiLock className="input-icon" />
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="input"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Đang đăng nhập...
                        </>
                    ) : (
                        'Đăng nhập'
                    )}
                </button>
            </form>

            <div className="auth-footer">
                <p>
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="auth-link">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
