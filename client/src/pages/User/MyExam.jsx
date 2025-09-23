import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const MyExam = () => {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/exams/exams`);
      // Support multiple possible response shapes:
      // - an array (res.data)
      // - { data: [...] } or { exams: [...] }
      const payload = res.data;
      const dataArray = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.exams)
        ? payload.exams
        : [];

      setExam(dataArray);
    } catch (err) {
      console.error('Error fetching exams:', err);
      setError('Failed to load exams. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Inline CSS (same file) */}
      <style>{`
        .thead-light-purple {
          background-color: #f3e8ff;
          color: #6f42c1;
        }
        .btn-start {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 6px;
          background: #6f42c1;
          color: white !important;
          font-size: 14px;
          transition: 0.18s;
          text-decoration: none;
        }
        .btn-start:hover { background: #512b8a; color: #fff !important; transform: translateY(-1px); }
        .exam-card {
          border: 1px solid #e6dbff;
          border-left: 4px solid #6f42c1;
          border-radius: 10px;
          background: linear-gradient(180deg, #ffffff, #faf7ff);
          box-shadow: 0 6px 18px rgba(79, 38, 139, 0.06);
        }
        .text-purple { color: #6f42c1; }
        .table-responsive { overflow-x: auto; }
        .empty-msg { text-align:center; padding: 30px 0; color:#666; }
        /* small polish */
        .card.custom-card { border-radius: 12px; overflow: hidden; }
        @media (max-width: 768px) {
          .card-body { padding: 12px; }
          .btn-start { width: 100%; display: block; text-align: center; padding: 10px 12px; }
        }
      `}</style>

      <div
        className="card mx-auto mt-3 custom-card"
        style={{
          border: '1px solid #6f42c1',
          width: '100%',
        }}
      >
        <div className="card-body">
          <h3 className="fw-bold text-center mb-3" style={{ color: '#6f42c1' }}>
            Question List
          </h3>

          {loading ? (
            <div className="empty-msg">Loading exams...</div>
          ) : error ? (
            <div className="empty-msg">{error}</div>
          ) : !exam || exam.length === 0 ? (
            <div className="empty-msg">No exams found.</div>
          ) : (
            <>
              {/* Desktop / Tablet: table view */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-bordered text-center mb-0">
                  <thead className="thead-light-purple">
                    <tr>
                      <th>S.No.</th>
                      <th>Exam name</th>
                      <th>Date Of Exam</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.map((item, i) => (
                      <tr key={item._id ?? i}>
                        <td>{i + 1}</td>
                        <td>{item.title ?? '—'}</td>
                        <td>{item.date ? new Date(item.date).toLocaleDateString() : '—'}</td>
                        <td>{item.time ?? '—'}</td>
                        <td>
                          <Link to={`/userdash/getexam/${item._id}`} className="btn-start">
                            Start Exam
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: card view */}
              <div className="d-md-none mt-2">
                {exam.map((item, i) => (
                  <div className="exam-card mb-3 p-3" key={item._id ?? i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <h5 className="fw-bold text-purple" style={{ marginBottom: 6 }}>{item.title ?? `Exam ${i + 1}`}</h5>
                        <div style={{ fontSize: 14, color: '#444' }}>
                          <div><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : '—'}</div>
                          <div><strong>Time:</strong> {item.time ?? '—'}</div>
                        </div>
                      </div>
                      <div style={{ minWidth: 120, marginLeft: 12, alignSelf: 'center' }}>
                        <Link to={`/userdash/getexam/${item._id}`} className="btn-start">
                          Start Exam
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyExam;
