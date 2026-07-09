import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Complaints from "./components/Complaints";
import ComplaintForm from "./components/ComplaintForm";
import Feedback from "./components/Feedback";
import FeedbackForm from "./components/FeedbackForm";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import "./Auth.css"; // ✅ Corrected import

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  if (!token) {
    return (
      <div className="container">
        <h1 className="title">🏨 Hostel Management</h1>
        <div className="auth-container">
          <Login setToken={setToken} />
          <Register />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar setToken={setToken} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/complaints" element={<Complaints token={token} />} />
          <Route path="/complaints/new" element={<ComplaintForm token={token} />} />
          <Route path="/feedback" element={<Feedback token={token} />} />
          <Route path="/feedback/new" element={<FeedbackForm token={token} />} />
          <Route path="/admin-panel" element={<AdminPanel token={token} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
