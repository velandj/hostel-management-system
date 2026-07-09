import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Feedback.css";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get("http://127.0.0.1:8000/api/feedbacks/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="feedback-page-list">
      <div className="feedback-header">
        <h3>⭐ Mess Feedback List</h3>
        <Link to="/feedback/new" className="btn">➕ Give Feedback</Link>
      </div>

      <div className="feedback-cards">
        {feedbacks.length > 0 ? (
          feedbacks.map((f) => (
            <div className="feedback-card" key={f.id}>
              <div className="card-header">
                <span className="meal">{f.meal}</span>
                <span className="rating">⭐ {f.overall_rating}/5</span>
              </div>
              <p className="comments">{f.comments || "No comments provided."}</p>
              <div className="card-footer">
                <span className="roll">
                  Student ID: {f.user}
                </span>{" date"}
                • {new Date(f.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p>No feedbacks yet. Be the first to submit one!</p>
        )}
      </div>
    </div>
  );
}
