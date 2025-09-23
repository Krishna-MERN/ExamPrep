import axios from "axios";
import React, { useEffect, useState } from "react";


const Result = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  const handleFetch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/exams/examinee-result/${userId}`
      );
      setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // Print function
  const handlePrint = (item) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Result - ${item.examId?.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .card {
              border: 2px solid #6f42c1;
              border-radius: 10px;
              padding: 20px;
              width: 100%;
              max-width: 600px;
              margin: auto;
              box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            h2 { text-align: center; color: #6f42c1; margin-bottom: 20px; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            td, th {
              border: 1px solid #6f42c1;
              padding: 10px;
              text-align: center;
            }
            th { background-color: #f2f2f2; }
            .status-pass { color: green; font-weight: bold; }
            .status-fail { color: red; font-weight: bold; }
            @media print {
              body { margin: 0; }
              .card { box-shadow: none; border: none; }
            }
          </style>
        </head>
        <body>
          <div class="card">
              
            <h2>ExamPrep - Result</h2>
            <table>
              <tr><th>Exam Name</th><td>${item.examId?.title}</td></tr>
              <tr><th>Candidate Name</th><td>${item.examineeId?.name || item.examineeId}</td></tr>
              <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
              <tr><th>Score</th><td>${item.score}</td></tr>
              <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
              <tr><th>Status</th>
                <td class="${item.status === "Passed" ? "status-pass" : "status-fail"}">
                  ${item.status}
                </td>
              </tr>
              <tr><th>Date</th><td>${new Date(item.createdAt).toLocaleString()}</td></tr>
            </table>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="container-fluid p-0">
      <div
        className="card mx-auto mt-2"
        style={{
          border: "1px solid #6f42c1",
          width: "100%",
        }}
      >
        <div className="card-body">
          <h3 className="fw-bold" style={{ color: "#6f42c1" }}>
            Examinee Result
          </h3>

          {data.length === 0 ? (
            <p className="text-center text-muted mt-3">No results available</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table table-bordered text-center" style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th>S.N</th>
                    <th>Exam Name</th>
                    <th>Your Name</th>
                    <th>Total Marks</th>
                    <th>Score</th>
                    <th>Passing Marks</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.examId?.title}</td>
                      <td>{item.examineeId?.name || item.examineeId}</td>
                      <td>{item.totalMarks}</td>
                      <td>{item.score}</td>
                      <td>{item.passingMarks}</td>
                      <td>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "8px",
                            color: "#fff",
                            backgroundColor:
                              item.status === "Passed" ? "green" : "red",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          style={styles.printBtn}
                          onClick={() => handlePrint(item)}
                        >
                          🖨️ Print
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        @media (max-width: 768px) {
          table {
            font-size: 14px;
          }
          th, td {
            padding: 6px;
          }
          button {
            font-size: 12px;
            padding: 4px 8px;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  thead: {
    backgroundColor: "#f3e8ff",
    color: "#6f42c1",
    fontWeight: "bold",
  },
  printBtn: {
    backgroundColor: "#6f42c1",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Result;
