import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [id, setId] = useState('');
  const [editForm, setEditForm] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editForm) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/question/${id}`, formData);
        alert('Question updated successfully ✅');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/question`, formData);
        alert('Question added successfully ✅');
      }

      setFormData({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        subject: "",
      });
      setEditForm(false);
      setId('');
      handleFetch();
    } catch (err) {
      console.error(err);
      alert("Sorry, try again later ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/question`);
      setData(res.data.data || []);

      const res1 = await axios.get(`${import.meta.env.VITE_API_URL}/api/subject`);
      setSubjects(res1.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { handleFetch(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/question/${id}`);
      alert("Deleted Successfully ✅");
      handleFetch();
    } catch (err) {
      console.error(err);
      alert("Try Again Later ❌");
    }
  };

  const handleEdit = (q) => {
    setFormData({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      subject: q.subject?._id || "",
    });
    setId(q._id);
    setEditForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredData = data.filter(q => {
    const keyword = search.toLowerCase();
    return (
      q.question.toLowerCase().includes(keyword) ||
      q.optionA.toLowerCase().includes(keyword) ||
      q.optionB.toLowerCase().includes(keyword) ||
      q.optionC.toLowerCase().includes(keyword) ||
      q.optionD.toLowerCase().includes(keyword) ||
      q.correctAnswer.toLowerCase().includes(keyword) ||
      (q.subject?.subjectname?.toLowerCase().includes(keyword))
    );
  });

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / perPage);

  return (
    <div className="container-fluid p-0">
      {/* Form */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <div className="card p-3" style={{ border: "1px solid #6f42c1" }}>
            <form onSubmit={handleSubmit}>
              <h5 className="fw-bold" style={{ color: "#6f42c1" }}>
                {editForm ? 'Edit Question' : 'Add Question'}
              </h5>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="form-control my-2"
                placeholder="Enter Question"
                required
              />
              <div className="row">
                <div className="col-sm-6"><input type="text" name="optionA" value={formData.optionA} onChange={handleChange} placeholder="Option A" className="form-control mb-2" required /></div>
                <div className="col-sm-6"><input type="text" name="optionB" value={formData.optionB} onChange={handleChange} placeholder="Option B" className="form-control mb-2" required /></div>
              </div>
              <div className="row">
                <div className="col-sm-6"><input type="text" name="optionC" value={formData.optionC} onChange={handleChange} placeholder="Option C" className="form-control mb-2" required /></div>
                <div className="col-sm-6"><input type="text" name="optionD" value={formData.optionD} onChange={handleChange} placeholder="Option D" className="form-control mb-2" required /></div>
              </div>
              <div className="row">
                <div className="col-sm-6"><input type="text" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} placeholder="Correct Answer" className="form-control mb-2" required /></div>
                <div className="col-sm-6">
                  <select name="subject" value={formData.subject} onChange={handleChange} className="form-select mb-2" required>
                    <option value="">Select Subject</option>
                    {subjects.map(sub => <option key={sub._id} value={sub._id}>{sub.subjectname}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "⏳ Please wait..." : editForm ? "Update Question" : "Add Question"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Question Table */}
      <div className="card p-3" style={{ border: "1px solid #6f42c1" }}>
        <div className="row mb-2">
          <div className="col-sm-6"><h4 className="fw-bold" style={{ color: "#6f42c1" }}>Questions</h4></div>
          <div className="col-sm-3"><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" /></div>
          <div className="col-sm-3">
            <select className="form-select" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
        </div>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Question</th>
              <th>Subject</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Correct</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? currentData.map((q, i) => (
              <tr key={q._id}>
                <td>{indexOfFirst + i + 1}</td>
                <td>{q.question}</td>
                <td>{q.subject?.subjectname}</td>
                <td>{q.optionA}</td>
                <td>{q.optionB}</td>
                <td>{q.optionC}</td>
                <td>{q.optionD}</td>
                <td>{q.correctAnswer}</td>
                <td>
                  <button className="btn btn-warning me-1" onClick={() => handleEdit(q)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(q._id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={9}>No matching records found</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-between mt-2">
          <button className="btn btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="btn btn-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
