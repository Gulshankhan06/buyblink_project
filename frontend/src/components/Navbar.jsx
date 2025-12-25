import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true }); 
  };

  return (
    <nav className="navbar">
      <div className="logo">BuyBlink</div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>

        {isLogin && <li><Link to="/cart">Cart</Link></li>}

        {!isLogin ? (
          <li>
            <Link to="/login" className="login-btn">Login</Link>
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
