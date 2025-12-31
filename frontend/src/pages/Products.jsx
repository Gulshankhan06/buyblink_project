import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/baseUrl";
import "../styles/product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/products${category ? `?category=${category}` : ""}`
        );
        const data = await res.json();

        setProducts(
          data.products || data.data || data || []
        );
      } catch (err) {
        setError("Products is not loading");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <p className="products-status">Loading products...</p>;
  }

  if (error) {
    return <p className="products-status error">{error}</p>;
  }

  return (
    <div className="products-container">
      <h2 className="products-title">Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              className="product-image"
              src={
                product.image ||
                product.images?.[0] ||
                "https://via.placeholder.com/300"
              }
              alt={product.title}
              onClick={() => navigate(`/product/${product._id}`)}
            />

            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">₹{product.price}</p>

              {/* ✅ VIEW BUTTON */}
              <button
                className="view-btn"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
