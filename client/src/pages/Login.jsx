import React, { useState } from "react";
import axios from "axios";
import loginImage from "../assets/images/login1.png";
import { Link } from "react-router";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/examinee/login`,
        data
      );

      if (res.data.message === "Login Successfully") {
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        window.location.href = "/userdash/";
      } else {
        alert("Invalid credentials. Please try again.");
        setData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // stop loader
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
      fontFamily: "Segoe UI, sans-serif",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "900px",
      minHeight: "520px",
      display: "flex",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      backgroundColor: "#fff",
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #570c78ff, #593a78, #8b44d2ff)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      textAlign: "center",
    },
    subheading: {
      color: "#d4a3ff",
      fontSize: "28px",
      marginBottom: "8px",
    },
    welcomeText: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "6px",
      color: "#cbb7f0",
    },
    subText: {
      fontSize: "14px",
      opacity: 0.9,
      textAlign: "center",
      maxWidth: "280px",
    },
    rightPanel: {
      flex: 1,
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
    },
    formBox: {
      width: "100%",
      maxWidth: "320px",
    },
    heading: {
      fontSize: "32px",
      marginBottom: "12px",
      fontWeight: "600",
      display: "inline-block",
      borderBottom: "4px solid",
      color: "#4a0b65ff",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "3px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px 8px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      marginBottom: "12px",
      outline: "none",
    },
    submitBtn: {
      width: "100%",
      padding: "11px",
      border: "none",
      borderRadius: "6px",
      background: "linear-gradient(to right, #3a0451ff, #7827c0ff)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "12px",
    },
    checkbox: {
      marginTop: "8px",
      fontSize: "13px",
      textAlign: "center",
    },
    loader: {
      textAlign: "center",
      marginTop: "8px",
      fontSize: "14px",
      color: "#7827c0ff",
      fontWeight: "500",
      animation: "blink 1.5s infinite",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="responsive-login">
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <img
            src={loginImage}
            alt="Login Illustration"
            style={{ width: "70%", maxWidth: "320px", marginBottom: "15px" }}
          />
          <div style={styles.subheading}>Welcome to Examprep!</div>
          <div style={styles.welcomeText}>"Your Journey Starts Here"</div>
          <div style={styles.subText}>
            Login to view your exams, results, and profile — all in one smart
            dashboard.
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} style={styles.formBox} method="POST">
            <div style={{ textAlign: "center" }}>
              <div style={styles.heading}>User Login</div>
            </div>
            <br />

            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={handleChange}
              value={data.email}
              style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              required
              onChange={handleChange}
              value={data.password}
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.submitBtn}
              disabled={loading} // disable while loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {loading && <p style={styles.loader}>Please wait...</p>}

            <div style={styles.checkbox}>
              Don’t have an account? <Link to="/register">Register here</Link>.
            </div>
          </form>
        </div>
      </div>

      {/* Media Query + Loader Animation */}
      <style>
        {`
          .responsive-login {
            flex-direction: row;
          }
          @media (max-width: 768px) {
            .responsive-login {
              flex-direction: column;
              max-width: 100%;
            }
            .responsive-login > div {
              width: 100% !important;
            }
            .responsive-login img {
              max-width: 200px !important;
            }
          }
          @keyframes blink {
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
