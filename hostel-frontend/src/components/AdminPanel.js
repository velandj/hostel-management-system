import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [deleteId, setDeleteId] = useState(""); 

  const token = localStorage.getItem("access");

 
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/complaints/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  
  const updateStatus = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/admin/update_complaint/",
        { complaint_id: selectedId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Status updated!");
      fetchComplaints();
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update status.");
    }
  };

  
  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/complaints/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Complaint deleted!");
      fetchComplaints();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("❌ Failed to delete complaint.");
    }
  };

  return (
    <div>
      <h2>🛠️ Admin Panel – Manage Complaints</h2>

    
      <div>
        <h4>Update Complaint Status</h4>
        <input
          type="text"
          placeholder="Complaint ID"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button onClick={updateStatus}>Update</button>
      </div>

     
      <div>
        <h4>Delete Complaint by ID</h4>
        <input
          type="text"
          placeholder="Complaint ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button onClick={() => deleteComplaint(deleteId)}>Delete</button>
      </div>

    </div>
  );
}
