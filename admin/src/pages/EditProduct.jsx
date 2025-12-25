import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          image: data.image || "",
          description: data.description || ""
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("Product Updated");
      navigate("/products-list");
    }
  };

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  return (
    <div className="edit-product-page">
      <h2>Edit Product</h2>

      <form className="edit-product-form" onSubmit={handleUpdate}>
        <input
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
        />

        <input
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          name="image"
          value={form.image}
          placeholder="Image URL"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Product Description"
          onChange={handleChange}
        />

        <div className="edit-product-actions">
          <button type="submit" className="update-btn">
            Update Product
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/products-list")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
