import React, { useState, useEffect } from "react";
import { getCart, removeFromCart } from "../utils/cart";
import "../styles/cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const removeItem = (id) => {
    removeFromCart(id);
    setItems(getCart());
  };

  const totalCost = items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const buyProducts = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }
    alert(`Proceeding to buy products worth ₹${totalCost}`);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {items.length === 0 && <p className="empty">Cart is empty</p>}

      {items.length > 0 && (
        <div className="cart-layout">
          {/* LEFT SIDE */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={item._id || item.name} className="cart-card">
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="price">₹{item.price}</p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item._id || item.name)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <p>
              Items <span>{items.length}</span>
            </p>
            <p>
              Total <span>₹{totalCost}</span>
            </p>

            <button className="checkout-btn" onClick={buyProducts}>
              Buy Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
