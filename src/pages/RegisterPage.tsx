import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        username: username,
                    },
                },
            });

            if (error) throw error;

            toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Đăng ký thất bại');
            toast.error('Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card card">
            <div className="auth-header">
                <h1 className="auth-title">Đăng ký</h1>
                <p className="auth-subtitle">Tạo tài khoản mới 🎉</p>
            </div>

            {error && (
                <div className="auth-error">
                    <FiAlertCircle />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                        Họ và tên
                    </label>
                    <div className="input-wrapper">
                        <FiUser className="input-icon" />
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                            className="input"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Tên người dùng
                    </label>
                    <div className="input-wrapper">
                        <FiUser className="input-icon" />
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="nguyenvana"
                            className="input"
                            required
                        />
                    </div>
                </div>

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

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                        Xác nhận mật khẩu
                    </label>
                    <div className="input-wrapper">
                        <FiLock className="input-icon" />
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            Đang đăng ký...
                        </>
                    ) : (
                        'Đăng ký'
                    )}
                </button>
            </form>

            <div className="auth-footer">
                <p>
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="auth-link">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}
