import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Complaints.css"; 

export default function Complaints({ token }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/complaints/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tablelist">
      <h2>📋 Hostel Complaints</h2>
      
      <table className="tablecontainer">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.category}</td>
                <td>{c.description}</td>
                <td>
                  <b style={{ color: c.status === "resolved" ? "green" : "#ff8c00" }}>
                    {c.status}
                  </b>
                </td>
                <td>
                  {c.image ? (
                    <a
                      href={c.image}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#667eea", textDecoration: "none" }}
                    >
                      View
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No complaints found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/complaints/new">➕ Raise New Complaint</Link>

    </div>
  );
}
