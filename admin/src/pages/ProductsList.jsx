import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productsList.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <h3 style={{ padding: "20px" }}>Loading products...</h3>;

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === "active").length;
  const inactiveProducts = totalProducts - activeProducts;

  return (
    <div className="products-page">
      {/* SUMMARY CARDS */}
      <div className="summary-cards">
        <div className="card">
          <h2>{totalProducts}</h2>
          <p>Total Products</p>
        </div>
        <div className="card active">
          <h2>{activeProducts}</h2>
          <p>Active</p>
        </div>
        <div className="card inactive">
          <h2>{inactiveProducts}</h2>
          <p>Inactive</p>
        </div>
      </div>

      <h2 className="page-title">Products List</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `${BASE_URL}${product.image}`
                      }
                      alt={product.name}
                      className="product-img"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>{product.name}</td>

                {/* ✅ DESCRIPTION COLUMN */}
                <td className="desc-cell">
                  {product.description
                    ? product.description.length > 60
                      ? product.description.substring(0, 60) + "..."
                      : product.description
                    : "-"}
                </td>

                <td>₹{product.price}</td>
                <td>{product.discountPrice ? `₹${product.discountPrice}` : "-"}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>

                <td>
                  <span
                    className={
                      product.status === "active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {product.status}
                  </span>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsList;
