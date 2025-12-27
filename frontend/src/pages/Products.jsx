import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar";
import "../styles/product.css";
import API_URL from "../utils/baseUrl";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Read category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");

    if (cat) {
      setCategory(cat.toLowerCase().trim());
    } else {
      setCategory("all");
    }
  }, [location.search]);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();

        console.log("PRODUCTS FROM API 👉", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Category click handler
  const handleCategoryChange = (cat) => {
    const selected = cat.toLowerCase().trim();
    setCategory(selected);

    if (selected === "all") {
      navigate("/products");
    } else {
      navigate(`/products?category=${selected}`);
    }
  };

  // 🔹 Filter products (SAFE & CASE-INSENSITIVE)
  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (p) =>
            p.category &&
            p.category.toString().toLowerCase().trim() === category
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
