import React from "react";
import "./Footer.css";

// Import social icons
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* TOP SECTION */}
      <div className="footer-top">
        {/* BRAND */}
        <div className="footer-section">
          <h2 className="footer-logo">BuyBlink</h2>
          <p>
            Your trusted shopping platform for Mens, Womens, and kids fashion.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/products">Shop</a>
            </li>
            <li>
              <a href="/products?category=mens">Mens</a>
            </li>
            <li>
              <a href="/products?category=womens">Womens</a>
            </li>
            <li>
              <a href="/products?category=kids">Kids</a>
            </li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Order Tracking</a>
            </li>
            <li>
              <a href="#">Shipping & Delivery</a>
            </li>
            <li>
              <a href="#">Returns & Refunds</a>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@buyblink.com</p>
          <p>Phone: +91 8120035177</p>
          <p>Address: Indore, Madhya Pradesh, India</p>
        </div>
      </div>

      {/* SOCIAL ICONS */}
      <div className="social-icons">
        <a href="#" className="icon instagram">
          <FaInstagram />
        </a>
        <a href="#" className="icon facebook">
          <FaFacebookF />
        </a>
        <a href="#" className="icon twitter">
          <FaTwitter />
        </a>
        <a href="#" className="icon whatsapp">
          <FaWhatsapp />
        </a>
      </div>

      {/* COPYRIGHT */}
      <p className="footer-bottom">© 2025 BuyBlink. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
