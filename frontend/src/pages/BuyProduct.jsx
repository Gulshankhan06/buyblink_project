import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;

export default function BuyProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 🔹 Fetch single product by ID
  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, [id]);

  // 🔹 Razorpay Online Payment
  const startRazorpay = async () => {
    if (!product) return;

    const res = await fetch(`${BASE_URL}/api/payment/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: product.price }),
    });

    const order = await res.json();

    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "BuyBlink Store",
      description: `Payment for ${product.name}`,
      order_id: order.id,
      handler: function (response) {
        alert(
          "Payment Successful! Payment ID: " +
            response.razorpay_payment_id
        );
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🔹 UPI Intent Payment
  const handleUPI = () => {
    if (!product) return;

    const
