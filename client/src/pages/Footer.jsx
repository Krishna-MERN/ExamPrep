import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h3>ExamPrep</h3>
        <p>Conduct, manage, and monitor exams seamlessly on the most trusted online examination platform.</p>
        <div className="footer__links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="https://kkshukla.vercel.app/Contact"target="_blank">Contact</a>
        </div>
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} ExamPrep. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
