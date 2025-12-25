import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import BuyProduct from "./pages/BuyProduct";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route path="/buy/:id" element={<BuyProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
