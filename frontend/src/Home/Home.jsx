import React, { useState } from "react";
import { Upload, Star, HelpCircle, Zap, ChevronRight } from 'lucide-react';
import "./Home.css";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: <Zap />,
      title: "AI-Powered Analysis",
      description: "Deep, comprehensive resume evaluation using advanced machine learning algorithms.",
      details: "Our AI scrutinizes every detail, providing insights beyond traditional resume reviews."
    },
    {
      icon: <HelpCircle />,
      title: "Interview Mastery",
      description: "Personalized interview preparation with AI-generated strategic questions.",
      details: "Anticipate and excel in interviews with targeted, role-specific question simulations."
    },
    {
      icon: <Star />,
      title: "Career Optimization",
      description: "Tailored recommendations for professional growth and skill enhancement.",
      details: "Transform your career trajectory with data-driven, intelligent guidance."
    }
  ];

  return (
    <div className="resume-lens-home">
      <div className="resume-lens-home-container">
        <div className="resume-lens-hero-badge-container">
          <div className="resume-lens-hero-badge">
            AI-Powered Career Intelligence
          </div>
        </div>
        <header className="resume-lens-hero">
          <div className="resume-lens-hero-content">
            <h1 className="resume-lens-hero-title">ResumeLens</h1>
            <p className="resume-lens-hero-tagline">
              Elevate Your Professional Narrative
            </p>
            <p className="resume-lens-hero-description">
              Unlock the full potential of your professional journey with intelligent resume analysis 
              and strategic career insights.
            </p>
            <div className="resume-lens-cta-group">
              <button className="resume-lens-primary-cta">
                Analyze Your Resume
                <ChevronRight className="cta-icon" />
              </button>
            </div>
          </div>
        </header>

        <section className="resume-lens-features">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`resume-lens-feature ${activeFeature === index ? 'feature-active' : ''}`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="feature-header">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
              </div>
              <p className="feature-description">{feature.description}</p>
              {activeFeature === index && (
                <div className="feature-details">
                  <p>{feature.details}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;