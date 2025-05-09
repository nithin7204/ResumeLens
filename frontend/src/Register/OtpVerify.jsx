import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './OtpVerify.css';

export default function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email && location.state.formData) {
      setEmail(location.state.email);
      setFormData(location.state.formData);
    } else {
      alert("Missing registration data. Please register again.");
      navigate("/register");
    }
  }, [location, navigate]);

  async function handleVerify(e) {
    e.preventDefault();
    try {
      // Step 1: Verify OTP
      await axios.post("https://resume-lens-ygtf.onrender.com/api/auth/signup/verify-otp", {
        email,
        user_otp: otp
      });

      // Step 2: Save user to DB
      await axios.post("https://resume-lens-ygtf.onrender.com/api/auth/signup", {
        ...formData,
        email // in case it's not included in formData
      });

      alert("Registration successful!");
      navigate("/selection");
    } catch (err) {
      console.error("OTP verification or registration failed:", err);
      alert("Invalid or expired OTP, or registration failed.");
    }
  }

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleVerify}>
        <div className="mb-3">
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>
        <button type="submit" className="otp-button">Verify & Register</button>
      </form>
    </div>
  );
}
