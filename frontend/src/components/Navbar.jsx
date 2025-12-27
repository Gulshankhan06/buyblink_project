import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="logo">BuyBlink</div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <ul className={open ? "nav-links open" : "nav-links"}>
        <li onClick={() => setOpen(false)}>
          <Link to="/">Home</Link>
        </li>

        <li onClick={() => setOpen(false)}>
          <Link to="/products">Products</Link>
        </li>

        {isLogin && (
          <li onClick={() => setOpen(false)}>
            <Link to="/cart">Cart</Link>
          </li>
        )}

        {!isLogin ? (
          <li onClick={() => setOpen(false)}>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </li>
        ) : (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
