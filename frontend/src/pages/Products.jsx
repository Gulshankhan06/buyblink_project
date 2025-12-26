import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar";
import "../styles/product.css";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();

  /* 🔹 URL se category read karna */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");

    if (cat) {
      setCategory(cat.toLowerCase());
    } else {
      setCategory("all");
    }
  }, [location.search]);

  /* 🔹 Products fetch (BACKEND se) */
  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
  }, []);

  /* 🔹 Category click → URL update */
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === "all") {
      navigate("/products");
    } else {
      navigate(`/products?category=${cat}`);
    }
  };

  /* 🔹 Filter logic */
  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (p) => p.category && p.category.toLowerCase() === category
        );

  return (
    <div className="product-page">
      <CategoryBar setCategory={handleCategoryChange} />

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  );
}
