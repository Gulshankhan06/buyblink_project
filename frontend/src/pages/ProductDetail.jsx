import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/baseUrl";
import { addToCart } from "../utils/cart";
import "../styles/productDetail.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await res.json();
        const p = data.product || data;

        setProduct(p);
        setActiveImage(p.image || p.images?.[0]);
      } catch (err) {
        console.error("Product fetch error ❌", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="pd-status">Loading...</p>;
  if (!product) return <p className="pd-status">Product not found</p>;

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart 🛒");
  };

  // ⚡ BUY NOW
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="pd-container">
      {/* IMAGE SECTION */}
      <div className="pd-image-section">
        <img
          src={activeImage}
          className="pd-main-img"
          alt={product.title}
        />
{/* THUMBNAILS (show only if multiple images) */}
{product.images && product.images.length > 1 && (
  <div className="pd-thumbs">
    {product.images.map((img, i) => (
      <img
        key={i}
        src={img}
        className={`pd-thumb ${activeImage === img ? "active" : ""}`}
        onClick={() => setActiveImage(img)}
        alt=""
      />
    ))}
  </div>
)}

        
      </div>

      {/* INFO SECTION */}
      <div className="pd-info-section">
        <h2>{product.name}</h2>

        <p className="pd-price">₹{product.price}</p>

        <p className="pd-desc">{product.description}</p>

        <div className="pd-meta">
          <p>
            <b>Status:</b>{" "}
            <span
              className={`pd-status ${
                product.status === "active" ? "active" : "inactive"
              }`}
            >
              {product.status}
            </span>
          </p>
          <p><b>Stock:</b> {product.stock}</p>
          <p className="pd-delivery">
            🚚 Free delivery in 5–7 days
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="pd-actions">
          <button className="cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="buy-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
