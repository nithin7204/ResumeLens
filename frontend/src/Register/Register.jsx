import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronRight, UploadCloud } from "lucide-react";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    profilePicture: null,
    githubUrl: "",
    linkedinUrl: "",
    badges: []
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      const file = files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        return alert("Please upload an image file.");
      }

      if (file.size > 5 * 1024 * 1024) {
        return alert("File size must be under 5MB.");
      }

      setFormData({ ...formData, profilePicture: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if (!emailRegex.test(formData.email)) return alert("Enter a valid Email.");
    if (!mobileRegex.test(formData.mobile)) return alert("Enter a valid Mobile number.");
    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) return alert("Enter a valid GitHub URL.");
    if (formData.linkedinUrl && !isValidUrl(formData.linkedinUrl)) return alert("Enter a valid LinkedIn URL.");

    try {
      setIsUploading(true);
      let profilePictureUrl = "";

      if (formData.profilePicture) {
        const imgData = new FormData();
        imgData.append("image", formData.profilePicture);

        try {
          const uploadRes = await axios.post("https://resume-lens-ygtf.onrender.com/api/upload", imgData, {
            headers: { 
              "Content-Type": "multipart/form-data"
            }
          });
          
          if (uploadRes.data && uploadRes.data.url) {
            profilePictureUrl = uploadRes.data.url;
          } else {
            throw new Error("No URL received from server");
          }
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          alert("Error uploading profile picture. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      await axios.post("https://resume-lens-ygtf.onrender.com/api/auth/signup/request-otp", {
        email: formData.email
      });

      alert("OTP sent to your email.");
      navigate("/verify-otp", {
        state: {
          email: formData.email,
          formData: { ...formData, profilePicture: profilePictureUrl }
        }
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Error in registration. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-form-scroll">
        <div className="register-form-container">
          <h1 className="register-title">Join ResumeLens</h1>
          <p className="register-subtitle">Sign up and unlock AI-powered career insights.</p>

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Profile Picture Upload */}
            <div className="form-section flex flex-col items-center justify-center mb-6">
              <label htmlFor="profileUpload" className="profile-preview cursor-pointer">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center text-blue-500">
                    <UploadCloud size={30} />
                    <span className="text-sm mt-1 text-center">Upload Profile Picture</span>
                  </div>
                )}
              </label>

              {/* Hidden input only triggered by clicking label */}
              <input
                id="profileUpload"
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>


            {/* Basic Information */}
            <div className="form-section">
              <h3 className="form-section-title">Basic Information</h3>
              <div className="input-group">
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
              </div>
            </div>

            {/* Social Links */}
            <div className="form-section">
              <h3 className="form-section-title">Social Links</h3>
              <div className="input-group">
                <input type="url" name="githubUrl" placeholder="GitHub Profile URL (optional)" onChange={handleChange} />
              </div>
              <div className="input-group">
                <input type="url" name="linkedinUrl" placeholder="LinkedIn Profile URL (optional)" onChange={handleChange} />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="register-button" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Register"}
              {!isUploading && <ChevronRight className="cta-icon" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
