import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Complaints.css"; 

export default function ComplaintForm({ token }) {
  const [form, setForm] = useState({
    category: "electricity",
    description: "",
    image: null,
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("category", form.category);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    try {
      await axios.post("http://127.0.0.1:8000/api/complaints/", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Complaint raised successfully!");
      navigate("/complaints");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to raise complaint.");
    }
  };

  return (
    <div className="complaint-page">
      <form className="complaint-form" onSubmit={submit}>
        <h3 className="form-title">🛠 Raise a Complaint</h3>

        <label>Category:</label>
        <select
          className="form-input"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="electricity">Electricity</option>
          <option value="plumbing">Plumbing</option>
          <option value="wifi">Wi-Fi</option>
          <option value="food">Food</option>
          <option value="other">Other</option>
        </select>

        <label>Description:</label>
        <textarea
          className="form-textarea"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe your issue clearly..."
          required
        />

        <label>Image (optional):</label>
        <input
          className="form-input"
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>

        <Link to="/complaints" className="back-link">
          ← Back to Complaints
        </Link>
      </form>
    </div>
  );
}
