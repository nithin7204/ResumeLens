import React from "react";
import { useNavigate } from "react-router-dom";
import "./Selection.css";

export default function Selection() {
    const navigate = useNavigate();

    return (
        <div className="analysis-container">
            <div className="analysis-box">
                <h2 className="analysis-title">🚀 Welcome to Career Assistant</h2>
                <p className="analysis-subtitle">Analyze your resume & prepare for interviews with AI.</p>

                <div className="features-container">
                    <div className="feature-card">
                        <h3>📄 Resume Analysis</h3>
                        <p>Get AI-driven insights on your resume, including strengths, weaknesses, and suggestions.</p>
                        <button className="feature-btn" onClick={() => navigate("/resume-analysis")}>
                            Analyze Resume →
                        </button>
                    </div>

                    <div className="feature-card">
                        <h3>🎤 Interview Questions</h3>
                        <p>Get AI-curated interview questions tailored to your job role and experience level, and industry needs.</p>
                        <button className="feature-btn" onClick={() => navigate("/interview-questions")}>
                            Get Questions →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
