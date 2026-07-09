
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const access = res.data.access;
      const refresh = res.data.refresh;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      setToken(access);

      const userRes = await axios.get("http://127.0.0.1:8000/api/auth/userinfo/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      const user = userRes.data;
      console.log("Logged in user:", user);

      if (user.is_staff || user.is_superuser) {
        navigate("/admin-panel");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("❌ Invalid credentials or server error");
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Login</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
