import { FiHeart, FiGithub, FiMail } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">
                            <span className="footer-logo">😂</span>
                            Truyện Cười
                        </h3>
                        <p className="footer-description">
                            Nơi chia sẻ những câu chuyện cười hay nhất.
                            Mang tiếng cười đến với mọi người!
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Liên kết</h4>
                        <ul className="footer-links">
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href="/submit">Đóng góp truyện</a></li>
                            <li><a href="/about">Giới thiệu</a></li>
                            <li><a href="/contact">Liên hệ</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Danh mục</h4>
                        <ul className="footer-links">
                            <li><a href="/category/tieu-lam">Tiếu lâm</a></li>
                            <li><a href="/category/vo-va">Vô vạ</a></li>
                            <li><a href="/category/cong-so">Công sở</a></li>
                            <li><a href="/category/hoc-duong">Học đường</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Kết nối</h4>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="GitHub">
                                <FiGithub size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Email">
                                <FiMail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Truyện Cười. Made with <FiHeart className="heart-icon" /> in Vietnam
                    </p>
                </div>
            </div>
        </footer>
    );
}
