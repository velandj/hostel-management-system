import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./Feedback.css";

export default function FeedbackForm() {
  const [form, setForm] = useState({
  name: "",
  rollno: "",
  meal: "lunch",
  rating: 5,
  remarks: "", 
});
  const navigate = useNavigate();

 const submitFeedback = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("access");

    const payload = {
      taste_rating: form.rating,
      quality_rating: form.rating,
      quantity_rating: form.rating,
      hygiene_rating: form.rating,
      overall_rating: form.rating,
      comments: form.remarks,
    };

    await axios.post(
      "http://127.0.0.1:8000/api/feedbacks/",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Feedback submitted successfully!");

    setForm({
      name: "",
      rollno: "",
      meal: "lunch",
      rating: 5,
      remarks: "",
    });

    navigate("/feedback-list");

  } catch (err) {
    console.error("Submit error: ", err);
    alert("❌ Error submitting feedback.");
  }
};


  return (
    <div className="feedback-page">
      <form className="feedback-form" onSubmit={submitFeedback}>
        <h2>🍽️ Mess Feedback</h2>

        <label className="label">Name</label>
        <input
          className="input"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          placeholder="Enter your name"
        />

        <label className="label">Roll No (optional)</label>
        <input
          className="input"
          type="text"
          value={form.rollno}
          onChange={(e) => setForm({ ...form, rollno: e.target.value })}
          placeholder="Enter roll number"
        />

        <label className="label">Meal</label>
        <select
          className="select"
          value={form.meal}
          onChange={(e) => setForm({ ...form, meal: e.target.value })}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="other">Other</option>
        </select>

        <label className="label">Rating (1–5)</label>
        <input
          className="input"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          required
        />

        <label className="label">Comments</label>
<textarea
  className="textarea"
  value={form.remarks} 
  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
  placeholder="Share your thoughts about the meal..."
/>


        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>

      <Link to="/feedback" className="link">View All Feedbacks</Link>
    </div>
  );
}
