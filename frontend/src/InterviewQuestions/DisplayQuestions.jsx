import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Copy, Check, ArrowLeft } from "lucide-react";
import "./DisplayQuestions.css"; 

export default function DisplayQuestions() {
    const location = useLocation();
    const navigate = useNavigate();
    const questions = location.state?.questions || [];
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="display-container">
            <div className="display-header">
                <button className="back-button" onClick={handleBack}>
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h2 className="display-title">Generated Interview Questions</h2>
            </div>
            
            <div className="questions-box">
                {questions.length > 0 ? (
                    <ul className="question-list">
                        {questions.map((question, index) => (
                            <li key={index} className="question-item">
                                <span className="question-number">{index + 1}.</span>
                                <div className="question-content">
                                    <p className="question-text">{question}</p>
                                    <button 
                                        className="copy-button"
                                        onClick={() => handleCopy(question, index)}
                                        title="Copy question"
                                    >
                                        {copiedIndex === index ? (
                                            <Check size={16} className="copy-icon" />
                                        ) : (
                                            <Copy size={16} className="copy-icon" />
                                        )}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="no-questions">
                        <p>No questions available.</p>
                        <p className="no-questions-subtitle">Please try generating questions again.</p>
                    </div>
                )}
            </div>
        </div>
    );
}