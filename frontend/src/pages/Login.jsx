import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Clear form on page load
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 dummy login (replace with API later)
    if (email && password) {
      localStorage.setItem("token", "user_logged_in");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to BuyBlink</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button className="login-btn-form">Login</button>
        </form>
      </div>
    </div>
  );
}
