import React, { useState } from "react";
import "../styles/addProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    discount: "",
    stock: "",
    status: "active",
    image: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Added Successfully ✅");

        // form reset
        setProduct({
          name: "",
          price: "",
          category: "",
          description: "",
          discount: "",
          stock: "",
          status: "active",
          image: ""
        });
      } else {
        alert("Failed to add product ❌");
      }
    } catch (error) {
      alert("Server error ❌");
      console.error(error);
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} />
        <input name="price" placeholder="Price" value={product.price} onChange={handleChange} />
        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange}></textarea>
        <input name="discount" placeholder="Discount" value={product.discount} onChange={handleChange} />
        <input name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} />

        <select name="status" value={product.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
