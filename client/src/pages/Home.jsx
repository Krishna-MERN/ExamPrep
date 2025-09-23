import React from "react";
import heroImage from "../assets/images/hero.png"; 
// Add your image here
import { Link } from "react-router";
import Hero from "./Hero";

const Home = () => {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 20px",
          boxShadow: " 0 0 20px 0  #ffffffaa inset",
          background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
          color: "#fff",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "300px", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "2.8rem", marginBottom: "20px" }}>
            Prepare, Practice, and Pass with ExamPrep
          </h1>
          <p style={{ fontSize: "1.1rem", marginBottom: "25px", opacity: 0.9 }}>
            Register now to access personalized exams, track your results, and boost your preparation efficiently.
          </p>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <Link
              to="/register"
              style={{
                padding: "12px 25px",
                background: "linear-gradient(to right, #3a0451ff, #7827c0ff)",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Register Now
            </Link>
            <Link
              to="/login"
              style={{
                padding: "12px 25px",
                border: "2px solid #fff",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
          <img
            src={heroImage}
            alt="Hero Illustration"
            style={{ width: "80%", maxWidth: "400px" }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#f4f2f8" }}>
        <h2 style={{ textAlign: "center", color: "#6f42c1", marginBottom: "40px" }}>
          Features
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {[
            { title: "Personalized Exams", icon: "fa-solid fa-file" },
            { title: "Instant Results", icon: "fa-solid fa-chart-line" },
            { title: "Track Progress", icon: "fa-solid fa-trophy" },
            { title: "Secure & Reliable", icon: "fa-solid fa-lock" },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                flex: "1 1 200px",
                maxWidth: "250px",
                borderRadius: "12px",
                padding: "30px 20px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
              }}
              className="feature-card"
            >
              <i className={`${feature.icon} fa-2x`} style={{ color: "#6f42c1", marginBottom: "15px" }}></i>
              <h3 style={{ marginBottom: "10px" }}>{feature.title}</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Detailed explanation of the feature can go here.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", color: "#6f42c1", marginBottom: "40px" }}>
          How It Works
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {[
            { step: "Step 1", title: "Register & Create Profile", icon: "fa-solid fa-user-plus" },
            { step: "Step 2", title: "Select or Attempt Exams", icon: "fa-solid fa-pen-to-square" },
            { step: "Step 3", title: "View Results & Analyze", icon: "fa-solid fa-chart-line" },
            { step: "Step 4", title: "Improve & Repeat", icon: "fa-solid fa-rocket" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                flex: "1 1 200px",
                maxWidth: "220px",
                borderRadius: "12px",
                padding: "25px 15px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
              }}
              className="step-card"
            >
              <i className={`${item.icon} fa-2x`} style={{ color: "#6f42c1", marginBottom: "15px" }}></i>
              <h4 style={{ marginBottom: "10px" }}>{item.step}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section
        style={{
          padding: "50px 20px",
         background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Start Your Exam Preparation Today!</h2>
        <Link
          to="/register"
          style={{
            padding: "12px 30px",
            background: "#fff",
            color: "#6f42c1",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Register Now
        </Link>
<footer
        style={{
          padding: "25px ",
          marginTop:"20px",
          textAlign: "center",
         // background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
          color: "#fff",
        }}
      >
        <p>&copy; 2025 ExamPrep. All Rights Reserved.</p>
      </footer>
      </section>

      {/* Footer */}
      

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          section {
            flex-direction: column !important;
          }
        }

        .feature-card:hover, .step-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default Home;
