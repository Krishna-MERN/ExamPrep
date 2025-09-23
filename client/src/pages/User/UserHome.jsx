import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserHome = () => {
  const examineId = localStorage.getItem('userId');

  const [exams, setExams] = useState([]);
  const [passed, setPassed] = useState(0);

  // Fetch exams and results
  const handleFetch = async () => {
    try {
      // Fetch exams
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/exams/${examineId}`);
      const result = await response.json();
      console.log("Exams API response:", result);

      // Adjust based on API response structure
      const examsArray = Array.isArray(result) ? result : result.data || [];
      setExams(examsArray);

      // Fetch results
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/examinee-result/${examineId}`);
      console.log("Result API response:", res.data.message);

      const passedCount = typeof res.data.message === "number"
        ? res.data.message
        : Array.isArray(res.data.message)
          ? res.data.message.length
          : 0;

      setPassed(passedCount);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // Calculations
  const totalExams = exams.length;
  const failed = totalExams - passed;
  const progress = totalExams ? Math.round((passed / totalExams) * 100) : 0;

  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        {/* Total Exams */}
        <div className="col-sm-4 mb-3">
          <div className="shadow p-4 bg-light text-center" style={{ border: "1px solid #6f42c1" }}>
            <u style={{ color: "#6f42c1" }}>
              <h5 className="fw-bold">
                <i className="fa-solid fa-file-lines me-2"></i>Total Exams
              </h5>
            </u>
            <h5>{totalExams}</h5>
          </div>
        </div>

        {/* Result Summary */}
        <div className="col-sm-4 mb-3">
          <div className="shadow p-4 bg-light text-center" style={{ border: "1px solid #6f42c1" }}>
            <u style={{ color: "#6f42c1" }}>
              <h6 className="fw-bold">
                <i className="fa-solid fa-chart-line me-2"></i>Result Summary
              </h6>
            </u>
            <h6 className="fw-bold text-success mb-1">
              <i className="fa-solid fa-circle-check me-2"></i>Passed: {passed}
            </h6>
            <h6 className="fw-bold text-danger">
              <i className="fa-solid fa-circle-xmark me-2"></i>Failed: {failed}
            </h6>
          </div>
        </div>

        {/* Overall Performance */}
        <div className="col-sm-4 mb-3">
          <div className="shadow p-4 bg-light text-center" style={{ border: "1px solid #6f42c1" }}>
            <u style={{ color: "#6f42c1" }}>
              <h6 className="fw-bold">
                <i className="fa-solid fa-chart-line me-2"></i>Overall Performance
              </h6>
            </u>
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Display exam list */}
      <div className="row">
        <div className="col-12">
          <div className="card p-3" style={{ border: "1px solid #6f42c1" }}>
            <h5 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>Exams List</h5>
            {totalExams > 0 ? (
              <ul className="list-group">
                {exams.map((exam, index) => (
                  <li className="list-group-item" key={index}>
                    {exam.name || `Exam ${index + 1}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No exams found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
