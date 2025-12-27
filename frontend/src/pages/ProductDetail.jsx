import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../utils/cart";
import "../styles/productDetail.css";
import API_URL from "../utils/baseUrl";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
     fetch(`${API_URL}/api/products/${id}`)

      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data?.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      })
      .catch((err) => console.error("Product detail error:", err));
  }, [id]);

  if (!product) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  const buyNow = () => {
    alert(`Buying: ${product.name}`);
  };

  return (
    <div className="product-detail-page">
      {/* LEFT IMAGE */}
      <div className="image-section">
        <img src={product.image} alt={product.name} />
      </div>

      {/* RIGHT INFO */}
      <div className="info-section">
        <h1>{product.name}</h1>
        <h2 className="price">₹{product.price}</h2>

        <p className="description">{product.description}</p>

        {/* COLORS */}
        {product.colors && product.colors.length > 0 && (
          <div className="colors">
            <p>Available Colors</p>
            <div className="color-list">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className={`color-circle ${
                    selectedColor === color ? "active" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {/* DELIVERY */}
        <p className="delivery">
          🚚 Delivery by <b>{product.deliveryDate || "5-7 Working Days"}</b>
        </p>

        {/* STOCK */}
        <p className="stock">
          {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
        </p>

        {/* ACTION BUTTONS */}
        <div className="buttons">
          <button
            className="cart-btn"
            onClick={() => addToCart({ ...product, selectedColor })}
          >
            Add to Cart
          </button>

          <button className="buy-btn" onClick={buyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
