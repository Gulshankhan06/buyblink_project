import React from "react";
import "./Hero.css";
import heroimage from "../assets/heroimage.png";

const Hero = ({ onShopNow }) => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Welcome to BuyBlink</h1>
          <p>Shop the latest collections & trending products</p>
          <button className="shop-btn" onClick={onShopNow}>
            Shop Now
          </button>
        </div>

        <div className="hero-image-wrapper">
          <img src={heroimage} alt="purchase" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
