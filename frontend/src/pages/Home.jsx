import React from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import Footer from "../components/Footer";
import "../pages/Home.css";
import cart from "../assets/shopping-cart.png";
import shop from "../assets/shop.png";

const Home = () => {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products");
  };

  const openCategory = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <Hero onShopNow={goToProducts} />

      {/* ANIMATION / SHOPPING BANNER SECTION */}
      <div className="shopping-animation">
        <h2>Experience Smart Shopping</h2>

        <div className="animation-slider">
          <img src={cart} alt="cart" />

          <img src={shop} alt="shop" />
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about-section">
        <h2>About BuyBlink</h2>
        <p>
          BuyBlink is your all-in-one online shopping destination where quality
          meets style. We bring you the latest fashion, electronics, and
          accessories at the best prices. Enjoy smooth shopping, fast delivery,
          and secure payments.
        </p>
      </div>

      {/* CATEGORY SECTION */}
      <div className="categories-container">
        <h2 className="section-title">Shop by Category</h2>

        <div className="categories-grid">
          <div className="category-card" onClick={() => openCategory("mens")}>
            Mens
          </div>
          <div className="category-card" onClick={() => openCategory("womens")}>
            Womens
          </div>
          <div className="category-card" onClick={() => openCategory("kids")}>
            Kids
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
