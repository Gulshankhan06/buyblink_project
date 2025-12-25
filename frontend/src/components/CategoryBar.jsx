import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";

export default function CategoryBar({ setCategory }) {
  const navigate = useNavigate();

  const handleCategory = (cat) => {
    setCategory(cat);
    navigate(cat === "all" ? "/products" : `/products?category=${cat}`);
  };

  return (
    <div className="category-bar">
      <button onClick={() => handleCategory("all")}>All</button>
      <button onClick={() => handleCategory("mens")}>Mens</button>
      <button onClick={() => handleCategory("womens")}>Womens</button>
      <button onClick={() => handleCategory("kids")}>Kids</button>
    </div>
  );
}
