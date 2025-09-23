import React, { useEffect, useState } from "react";
import axios from "axios";
import loginImage from "../assets/images/login1.png";
import { Link } from "react-router";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    college: "",
    qualification: "",
    session: "",
  });

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const handlefetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/session`);
        setSessions(res.data.data);
      } catch (er) {
        console.log(er);
      }
    };
    handlefetch();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/examinee`, formData);
      alert(
        "You have Registered Successfully...\n Check your Emailbox for Confirmation.\n\n You Can Login Now"
      );
      setFormData({
        name: "",
        email: "",
        number: "",
        address: "",
        password: "",
        college: "",
        qualification: "",
        session: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to Register");
    }
  };

  // Styles
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
      display: "flex",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      backgroundColor: "#fff",
    },
    leftPanel: {
      flex: 0.7,
      background: "linear-gradient(135deg,#570c78ff, #593a78, #8b44d2ff)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      textAlign: "center",
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
      maxWidth: "600px",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "10px",
    },
    input: {
      flex: 1,
      minWidth: "100px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
    },
    select: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
    },
    textArea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      resize: "vertical",
      marginBottom: "10px",
    },
    heading: {
      fontSize: "32px",
      marginBottom: "15px",
      fontWeight: "600",
      display: "inline-block",
      borderBottom: "4px solid",
      color: "#4a0b65ff",
    },
    submitBtn: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      background: "linear-gradient(to right, #3a0451ff, #7827c0ff)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="responsive-card">
        {/* Left Panel */}
        <div style={styles.leftPanel}>
            <img
            src={loginImage}
            alt="Login Illustration"
            style={{ width: "70%", maxWidth: "320px", marginBottom: "15px" }}
          />
          <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "15px" }}>
           
            Welcome to ExamPrep
          </div>
          <div style={{ fontSize: "15px", opacity: 0.9, maxWidth: "250px" }}>
            Register now and unlock your personalized dashboard to manage exams,
            view results, and access all your academic details in one place.
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} style={styles.formBox}>
            <div style={{ textAlign: "center" }}>
              <div style={styles.heading}>Registration Page</div>
            </div>
            <br />
            <div style={styles.row}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <input
                type="tel"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select Session</option>
                {sessions.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.row}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <textarea
              name="address"
              placeholder="Address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
              style={styles.textArea}
            ></textarea>

            <div style={styles.row}>
              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              Register Here
            </button>

            <div style={{ marginTop: "10px", textAlign: "center" }}>
              Have an account? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Media Query */}
      <style>
        {`
          .responsive-card {
            flex-direction: row;
          }
          @media (max-width: 668px) {
            .responsive-card {
              flex-direction: column;
            }
            .responsive-card > div {
              width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Registration;
