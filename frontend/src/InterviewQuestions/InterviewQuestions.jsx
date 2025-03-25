import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import "./InterviewQuestions.css";

export default function InterviewQuestions() {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [currentRole, setCurrentRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!file || !jobDescription || !currentRole) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobDescription", jobDescription);
        formData.append("currentRole", currentRole);

        axios.post("http://localhost:4000/api/questions", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        .then((res) => {
            setLoading(false);
            navigate("/display-questions", { state: { questions: res.data.analysis.technical_questions } });
        })
        .catch((err) => {
            console.error("Error:", err);
            setError("Failed to analyze resume. Please try again.");
            setLoading(false);
        });
    }

    return (
        <div className="interview-container">
            <div className="interview-box">
                <h2 className="interview-title">🎤 AI-Powered Interview Prep</h2>
                <p className="interview-subtitle">Upload your resume and get AI-generated interview questions instantly.</p>
                
                <form className="interview-form" onSubmit={handleSubmit}>
                    <div className="file-upload">
                        <label className="file-label">
                            <FiUploadCloud className="upload-icon" />
                            {file ? file.name : "Upload Resume (PDF)"}
                            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden-input" />
                        </label>
                    </div>
                    
                    <div className="form-group">
                        <label>Job Description</label>
                        <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="input-box"/>
                    </div>

                    <div className="form-group">
                        <label>Current Role</label>
                        <input type="text" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} className="input-box"/>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="interview-button" disabled={loading}>
                        {loading ? "Analyzing..." : "Generate Questions"}
                    </button>
                </form>
            </div>
        </div>
    );
}
