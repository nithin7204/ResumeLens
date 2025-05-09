import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Award, Edit2 } from 'lucide-react';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    occupation: '',
    skills: [],
    experience: '',
    education: '',
    profilePicture: '' // Add profilePicture field
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          console.error('No user email found');
          return;
        }

        const response = await axios.get(`https://resume-lens-ygtf.onrender.com/api/auth/profile?email=${userEmail}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });          

        if (response.data) {
            console.log('User profile data:', response.data);
          setProfileData({
            name: response.data.username || '',
            email: response.data.email || '',
            phone: response.data.mobile || '',
            location: response.data.location || '',
            occupation: response.data.occupation || '',
            skills: response.data.skills || [],
            experience: response.data.experience || '',
            education: response.data.education || '',
            profilePicture: response.data.profilePicture || '' // Set profile picture URL
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-header">
          <div className="profile-avatar">
            {/* Display the profile picture */}
            {profileData.profilePicture ? (
              <img src={`https://resume-lens-ygtf.onrender.com${profileData.profilePicture}`} alt="Profile" className="avatar-img" />
            ) : (
              <User size={48} /> // Fallback if no profile picture
            )}
          </div>
          <div className="profile-title-section">
            <h2 className="profile-title">{profileData.name}</h2>
            <p className="profile-subtitle">{profileData.occupation}</p>
          </div>
          <button className="edit-button" onClick={handleEdit}>
            <Edit2 size={20} />
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <Mail size={20} />
                <span>{profileData.email}</span>
              </div>
              <div className="info-item">
                <Phone size={20} />
                <span>{profileData.phone}</span>
              </div>
              <div className="info-item">
                <MapPin size={20} />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">Professional Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <Briefcase size={20} />
                <span>Experience: {profileData.experience}</span>
              </div>
              <div className="info-item">
                <Award size={20} />
                <span>{profileData.education}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-container">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
