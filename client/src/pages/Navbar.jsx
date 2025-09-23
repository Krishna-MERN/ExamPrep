// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router";
import "./styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Branding */}
        <div className="navbar-logo">
          <Link to="/">ExamPrep</Link>
        </div>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Quick Links */}
        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/register" className="highlight">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
