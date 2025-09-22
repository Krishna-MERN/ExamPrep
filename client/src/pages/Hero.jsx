import React from 'react';
import './styles/Hero.css';
import { Link } from 'react-router';
// import Navbar from './Navbar';

const Hero = () => {
  
  return (<>
    {/* <Navbar/> */}
    <div className="hero-container">
        
      <div className="hero-left">
        <h1>
          Welcome to <span className="highlight">ExamPrep</span>
        </h1>
        <p>Conduct, manage, and monitor exams seamlessly on the most trusted online examination platform.</p>
        <div className="hero-buttons">
         <Link to="/register"> <button className="start-btn">Start Now</button></Link>
          <button className="learn-btn">Learn More</button>
        </div>
      </div>
      <div className="hero-right">
        <img src="src/assets/images/hero.png" alt="Exam Prep Illustration" />
      </div>
    </div></>
  );
};

export default Hero;
