import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleLogin(e) {
    e.preventDefault();
    axios.post('https://d2vjesayznpn67.cloudfront.net/api/auth/login', formData)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          setUser({ token: res.data.token });
          navigate('/selection');
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) alert('User does not exist');
          else if (err.response.status === 400) alert('Incorrect password');
          else alert('Network Error');
        } else {
          alert('Server unreachable');
        }
      });
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Sign in to continue</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password" 
                onChange={handleChange} 
                placeholder="Enter your password" 
                required 
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
}
