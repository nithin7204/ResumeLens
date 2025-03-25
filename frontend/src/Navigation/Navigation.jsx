import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"; 

export default function Navigation() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="resume-lens-navbar">
            <div className="resume-lens-navbar-container">
                {/* Left Section - Logo and Navigation */}
                <div className="resume-lens-navbar-left">
                    <div className="resume-lens-logo">
                        <span>ResumeLens</span>
                    </div>
                    <nav className="resume-lens-nav-links">
                        <Link to="/" className="resume-lens-nav-link">Home</Link>
                        <Link to="/selection" className="resume-lens-nav-link">Analysis</Link>
                        <Link to="/history" className="resume-lens-nav-link">History</Link>
                    </nav>
                </div>

                {/* Right Section - User Actions */}
                <div className="resume-lens-navbar-right">
                    {user ? (
                        <div className="resume-lens-user-actions">
                            <button className="resume-lens-nav-button" onClick={() => navigate('/profile')}>
                                Profile
                            </button>
                            <button className="resume-lens-nav-button resume-lens-logout-button" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="resume-lens-auth-buttons">
                            <Link to="/login" className="resume-lens-nav-button">Login</Link>
                            <Link to="/register" className="resume-lens-nav-button resume-lens-cta-button">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}