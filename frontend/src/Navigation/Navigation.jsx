import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Navbar.css"; 

export default function Navigation() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) return;

                const response = await axios.get(`https://resume-lens-ygtf.onrender.com/api/auth/profile?email=${userEmail}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data && response.data.profilePicture) {
                    setProfileImage(response.data.profilePicture);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (user) {
            fetchUserProfile();
        }
    }, [user]);

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
                            <div className="profile-image-container" onClick={() => navigate('/profile')}>
                                {profileImage ? (
                                    <img 
                                        src={`https://resume-lens-ygtf.onrender.com${profileImage}`} 
                                        alt="Profile" 
                                        className="nav-profile-image"
                                    />
                                ) : (
                                    <div className="nav-profile-placeholder">
                                        {user.email ? user.email[0].toUpperCase() : 'U'}
                                    </div>
                                )}
                            </div>
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