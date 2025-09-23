import React from 'react';
import { Link, Outlet } from 'react-router';

const UserDash = () => {
  const role = localStorage.getItem('userRole');
  const email = role === 'user' ? localStorage.getItem('userEmail') : (window.location.href = '/');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar / Navbar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Link className="nav-links text-light fs-5 text-decoration-none" to="/userdash">
            Welcome
          </Link>
        </div>
        <ul className="nav-links list-unstyled">
          <li>
            <i className="fa-solid fa-user"></i>
            <span className="link-text">
              <Link to="/userdash/profile" className="text-white text-decoration-none">Profile</Link>
            </span>
          </li>
          <li>
            <i className="fa-solid fa-pen-to-square"></i>
            <span className="link-text">
              <Link to="/userdash/myexam" className="text-white text-decoration-none">My Exams</Link>
            </span>
          </li>
          <li>
            <i className="fa-solid fa-trophy"></i>
            <span className="link-text">
              <Link to="/userdash/results" className="text-white text-decoration-none">Result</Link>
            </span>
          </li>
          <li>
            <i className="fa-solid fa-key"></i>
            <span className="link-text">
              <Link to="/userdash/chanpass" className="text-white text-decoration-none">Change Key</Link>
            </span>
          </li>
          <li>
            <i className="fa-solid fa-message"></i>
            <span className="link-text">
              <Link to="/userdash/contact1" className="text-white text-decoration-none">Contact Us</Link>
            </span>
          </li>
          <li>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="link-text">
              <Link
                className="text-white text-decoration-none"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
              >
                Log Out
              </Link>
            </span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="topbar">
          <div className="greeting">
            {getGreeting()}, <b>{email}</b>
          </div>
            <Link className="nav-links text-light fs-5 text-decoration-none" to="/userdash">
          <h4 className="dashboard-title">Examinee Dashboard</h4></Link>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* Styles */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        /* Sidebar */
        .sidebar {
          width: 220px;
          background: linear-gradient(180deg,  #4a3365ff, #3c2e58ff);
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: start;
          box-shadow: 4px 0 12px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .sidebar-header {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          border-bottom: 2px solid rgba(255,255,255,0.3);
          padding-bottom: 0.5rem;
        }

        .nav-links {
          display: flex;
          flex-wrap: wrap; 
          justify-content: space-around;
          padding: 0;
          gap: 6px;
        }

        .nav-links li {
          display: flex;
          align-items: center;
          margin: 4px 0;
          padding: 6px 10px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .nav-links li:hover {
          background-color: rgba(255,255,255,0.1);
          cursor: pointer;
        }

        .nav-links i {
          width: 20px;
          text-align: center;
        }

        /* Fixed width for link-text on laptop & desktop */
        @media (min-width: 769px) {
          .link-text {
            min-width: 100px;
            max-width: 120px;
            display: inline-block;
            white-space: nowrap;
          }
        }

        /* Gradually shrink link-text on smaller screens */
        @media (max-width: 768px) {
          .link-text {
            font-size: clamp(0.65rem, 1.5vw, 0.85rem);
          }
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f4f2f8;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 25px;
          background: linear-gradient(90deg,  #4a3365ff, #ac66e9ff, #3c2e58ff);
          color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          border-radius: 0 0 12px 12px;
          flex-wrap: wrap;
        }

        .greeting {
          font-size: 1.1rem;
        }

        .dashboard-title {
          font-size: 1.4rem;
          font-weight: 600;
        }

        .content {
          padding: 25px;
          flex: 1;
        }

        .nav-links a {
          font-weight: 500;
          text-decoration: none;
          color: white;
        }

        .nav-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
            padding: 10px 0;
          }

          .sidebar-header {
            display: none;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }

          .nav-links li {
            margin: 5px;
            padding: 5px 8px;
          }

          .main {
            width: 100%;
          }

          .topbar {
            flex-direction: column;
            text-align: center;
            padding: 10px;
          }

          .content {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDash;
