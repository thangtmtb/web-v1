import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export default function AuthLayout() {
    return (
        <div className="auth-layout">
            <div className="auth-background">
                <div className="auth-gradient"></div>
                <div className="auth-pattern"></div>
            </div>
            <div className="auth-content">
                <Outlet />
            </div>
        </div>
    );
}
