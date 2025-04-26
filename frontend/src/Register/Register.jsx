import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });
  const { setUser } = useContext(AuthContext);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return alert("Enter a valid Email");
    }

    let mobileRegex =
      /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    if (!mobileRegex.test(formData.mobile)) {
      return alert("Enter a valid Mobile number");
    }

    axios
      .post("https://d2vjesayznpn67.cloudfront.net/api/auth/signup/request-otp", {
        email: formData.email,
      })
      .then((res) => {
        alert("OTP sent to your email.");
        navigate("/verify-otp", { state: { email: formData.email } });
      })
      .catch((err) => {
        console.log("Error:", err);
        alert("Error sending OTP. Please try again.");
      });
  }

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="register-title">Join ResumeLens</h1>
        <p className="register-subtitle">
          Sign up and unlock AI-powered career insights.
        </p>

        <form className="register-form">
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
          </div>

          <button className="register-button" onClick={handleSubmit}>
            Register <ChevronRight className="cta-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}
