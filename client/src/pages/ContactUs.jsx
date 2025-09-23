import React, { useState } from "react";
import "./styles/ContactUs.css"; // external css

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // loader state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    setStatus("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully! \n We will reach you soon...");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus("Server error, please try again later.");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      {/* Intro Section */}
      <div className="contact-intro">
        <p>
          Welcome to the <strong>Online Examination Portal</strong>.  
          Our platform helps students take exams seamlessly and securely from anywhere.  
          If you face any issues during registration, login, or while attempting an exam,  
          feel free to reach out to us using the form below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? <span className="loading-text">Please wait...</span> : "Send"}
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default ContactUs;
