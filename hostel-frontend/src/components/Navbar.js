import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

export default function Navbar({ setToken }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/auth/userinfo/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data;
          if (user.is_staff || user.is_superuser) {
            setIsAdmin(true);
          }
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
        });
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/complaints">🧾 Complaints</Link></li>
          <li><Link to="/feedback">⭐ Feedback</Link></li>
          {isAdmin && <li><Link to="/admin-panel">🛠️ Admin Panel</Link></li>}
        </ul>
      </div>

      <div className="nav-right">
        <button onClick={() => setToken("")}>Logout</button>
      </div>
    </nav>
  );
}
