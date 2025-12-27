import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../utils/baseUrl";


const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;

export default function BuyProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 🔹 Fetch single product by ID
  useEffect(() => {
fetch(`${API_URL}/api/products/${id}`)

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

    const upiID = "yourupiid@bank"; // demo
    const amount = product.price;
    const name = product.name;

    const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;
    window.location.href = upiLink;
  };

  // 🔹 COD
  const handleCOD = () => {
    alert("Order placed successfully (Cash on Delivery)");
  };

  if (!product) return <h2 style={{ padding: 20 }}>Loading Product...</h2>;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Buy Product</h1>

      <img
        src={product.image}
        alt={product.name}
        width="300"
        style={{ borderRadius: "10px", marginBottom: "20px" }}
      />

      <h2>{product.name}</h2>
      <h3 style={{ color: "green" }}>₹{product.price}</h3>

      <p style={{ maxWidth: "500px", margin: "10px auto" }}>
        {product.description}
      </p>

      <br />

      <button
        onClick={startRazorpay}
        style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}
      >
        Pay Online (Razorpay)
      </button>

      <button
        onClick={handleUPI}
        style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}
      >
        Pay Using PhonePe / Paytm / Google Pay
      </button>

      <button
        onClick={handleCOD}
        style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}
      >
        Cash on Delivery
      </button>
    </div>
  );
}
