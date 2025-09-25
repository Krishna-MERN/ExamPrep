import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserHome = () => {
  const examineId = localStorage.getItem('userId');

  const [exams, setExams] = useState([]);
  const [passed, setPassed] = useState(0);

  const handleFetch = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/exams/${examineId}`);
      const result = await response.json();
      const examsArray = Array.isArray(result) ? result : result.data || [];
      setExams(examsArray);

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/examinee-result/${examineId}`);
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

  const totalExams = exams.length;
  const failed = totalExams - passed;
  const progress = totalExams ? Math.round((passed / totalExams) * 100) : 0;

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* Total Exams */}
        <div className="col-sm-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body text-center">
              <h6 className="fw-bold text-white p-2 rounded" style={{ background: "linear-gradient(90deg, #6f42c1, #9c6ef3)" }}>
                <i className="fa-solid fa-file-lines me-2"></i> Total Exams
              </h6>
              <h2 className="fw-bold mt-3 text-dark">{totalExams}</h2>
            </div>
          </div>
        </div>

        {/* Result Summary */}
        <div className="col-sm-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body text-center">
              <h6 className="fw-bold text-white p-2 rounded" style={{ background: "linear-gradient(90deg, #28a745, #6fdc8c)" }}>
                <i className="fa-solid fa-chart-line me-2"></i> Result Summary
              </h6>
              <div className="mt-3">
                <h6 className="fw-bold text-success mb-2">
                  <i className="fa-solid fa-circle-check me-2"></i> Passed: {passed}
                </h6>
                <h6 className="fw-bold text-danger">
                  <i className="fa-solid fa-circle-xmark me-2"></i> Failed: {failed}
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Performance */}
        <div className="col-sm-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body text-center">
              <h6 className="fw-bold text-white p-2 rounded" style={{ background: "linear-gradient(90deg, #007bff, #4da6ff)" }}>
                <i className="fa-solid fa-gauge-high me-2"></i> Overall Performance
              </h6>
              <div className="progress mt-3" style={{ height: "22px", borderRadius: "12px" }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success"
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
      </div>

      {/* Exams List */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-dark">
                <i className="fa-solid fa-list-check me-2 text-primary"></i> Exams List
              </h5>
              {totalExams > 0 ? (
                <ul className="list-group list-group-flush">
                  {exams.map((exam, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      <span>
                        <i className="fa-solid fa-file-circle-question me-2 text-secondary"></i>
                        {exam.name || `Exam ${index + 1}`}
                      </span>
                      <span className="badge bg-primary rounded-pill">#{index + 1}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No exams found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
