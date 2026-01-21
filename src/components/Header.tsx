import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiPlusCircle, FiBookmark, FiShield, FiMoon, FiSun, FiSearch } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import './Header.css';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Init from storage if available, else system preference
        const saved = localStorage.getItem('theme') as 'light' | 'dark';
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const { user, profile, signOut } = useAuthStore();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    // Set theme on mount and when changed
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Update local search query state when URL changes
    useEffect(() => {
        setSearchQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/');
        }
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
        setUserMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container container">
                <Link to="/" className="header-logo">
                    <span className="logo-icon">😂</span>
                    <span className="logo-text">Truyện Cười</span>
                </Link>

                <form className="header-search" onSubmit={handleSearch}>
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm truyện cười..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Desktop Navigation */}
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Trang chủ</Link>
                    <Link to="/submit" className="nav-link">Đóng góp</Link>
                    {user && <Link to="/saved" className="nav-link">Đã lưu</Link>}
                    {profile?.is_admin && (
                        <Link to="/admin" className="nav-link">Quản trị</Link>
                    )}
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-icon"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </button>

                    {user ? (
                        <div className="user-menu">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="user-menu-trigger"
                            >
                                <div className="user-avatar">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt={profile.full_name || 'User'} />
                                    ) : (
                                        <FiUser size={20} />
                                    )}
                                </div>
                                <span className="user-name">{profile?.full_name || profile?.username || 'User'}</span>
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div className="user-menu-backdrop" onClick={() => setUserMenuOpen(false)} />
                                    <div className="user-menu-dropdown">
                                        <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                            <FiUser /> Trang cá nhân
                                        </Link>
                                        <Link to="/submit" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                            <FiPlusCircle /> Đóng góp truyện
                                        </Link>
                                        <Link to="/saved" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                            <FiBookmark /> Truyện đã lưu
                                        </Link>
                                        {profile?.is_admin && (
                                            <Link to="/admin" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                                <FiShield /> Quản trị
                                            </Link>
                                        )}
                                        <hr className="dropdown-divider" />
                                        <button onClick={handleSignOut} className="dropdown-item">
                                            <FiLogOut /> Đăng xuất
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn-ghost">Đăng nhập</Link>
                            <Link to="/register" className="btn btn-primary">Đăng ký</Link>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="btn btn-ghost btn-icon mobile-menu-btn"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <>
                    <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} />
                    <div className="mobile-menu">
                        <Link to="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                            Trang chủ
                        </Link>
                        <Link to="/submit" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                            Đóng góp
                        </Link>
                        {user && (
                            <>
                                <Link to="/saved" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                                    Đã lưu
                                </Link>
                                <Link to="/profile" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                                    Trang cá nhân
                                </Link>
                            </>
                        )}
                        {profile?.is_admin && (
                            <Link to="/admin" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                                Quản trị
                            </Link>
                        )}
                        {!user && (
                            <>
                                <Link to="/login" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </>
            )}
        </header>
    );
}
