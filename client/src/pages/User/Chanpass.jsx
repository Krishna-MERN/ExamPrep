import axios from 'axios';
import React, { useState } from 'react';

const Chanpass = () => {
  const userId = localStorage.getItem('userId');
  const [data, setData] = useState({
    op: '',
    np: '',
    cnp: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (data.np !== data.cnp) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    setLoading(true); // disable button & show loader
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/examinee/change/${userId}`,
        data
      );
      if (res) {
        alert("Password Changed Successfully ✅");
        setData({ op: '', np: '', cnp: '' });
      }
    } catch (er) {
      alert("Sorry! Try Again Later ❌");
      console.error(er);
    } finally {
      setLoading(false); // enable button again
    }
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <div
          className="card"
          style={{
            border: "1px solid #6f42c1",
            minHeight: "220px",
            width: "100%",
          }}
        >
          <div className="">
            <form onSubmit={handleSubmit} className="border p-2 rounded">
              <div className="row">
                <div className="col-sm-12">
                  <h5 className="fw-bold" style={{ color: "#6f42c1" }}>
                    <i className="fa-solid fa-plus" style={{ marginRight: "8px" }}></i>
                    Update Password
                  </h5>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-sm-12"><h6>Old Password</h6></div>
                <div className="col-sm-12">
                  <input
                    type="password"
                    name="op"
                    placeholder=""
                    className="form-control"
                    onChange={handleChange}
                    value={data.op}
                    required
                  />
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-sm-12"><h6>New Password</h6></div>
                <div className="col-sm-12">
                  <input
                    type="password"
                    name="np"
                    placeholder=""
                    className="form-control"
                    onChange={handleChange}
                    value={data.np}
                    required
                  />
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-sm-12">
                  <h6>Confirm New Password</h6>
                  <input
                    type="password"
                    name="cnp"
                    placeholder=""
                    className="form-control"
                    onChange={handleChange}
                    value={data.cnp}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-light text-white mt-3"
                style={{ background: "#39064fff" }}
                disabled={loading}
              >
                {loading ? "⏳ Please wait..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chanpass;
