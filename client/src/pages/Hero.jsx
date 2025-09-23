import React from 'react';
import './styles/Hero.css';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            Welcome to <span className="highlight">ExamPrep</span>
          </h1>
          <p>
            Your all-in-one exam preparation portal. Access study materials, take mock tests, and track your performance — all in one place.
          </p>
          <div className="hero-buttons">
            <Link to="/register"><button className="start-btn">Get Started</button></Link>
            <a href="#manual"><button className="learn-btn">How It Works</button></a>
          </div>
        </div>
        <div className="hero-right">
          <img src="src/assets/images/hero.png" alt="Exam Prep Illustration" />
        </div>
      </div>

      {/* Manual Section */}
      <div id="manual" className="manual-section">
        <h2>How to Use ExamPrep</h2>
        <p>Follow these simple steps to get started and make the most out of the platform.</p>

        <div className="manual-content">
          <div className="manual-card">
            <h3>1. Create an Account</h3>
            <ul>
              <li>Sign up with your details</li>
              <li>Choose your course or subject</li>
              <li>Set up your profile</li>
            </ul>
          </div>

          <div className="manual-card">
            <h3>2. Access Study Material</h3>
            <ul>
              <li>Browse curated notes and guides</li>
              <li>Save important resources</li>
              <li>Learn anytime, anywhere</li>
            </ul>
          </div>

          <div className="manual-card">
            <h3>3. Take Mock Tests</h3>
            <ul>
              <li>Attempt subject-wise mock exams</li>
              <li>Instant result evaluation</li>
              <li>Review correct answers</li>
            </ul>
          </div>

          <div className="manual-card">
            <h3>4. Track Your Progress</h3>
            <ul>
              <li>Check your performance dashboard</li>
              <li>Identify strengths & weaknesses</li>
              <li>Improve with detailed insights</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
