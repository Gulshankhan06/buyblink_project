import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>

      {/* Short description only */}
      <p className="desc">
        {product.description?.slice(0, 60)}...
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation(); 
          navigate(`/product/${product._id}`);
        }}
      >
        View Details
      </button>
    </div>
  );
}
