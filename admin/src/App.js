import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ProductsList from "./pages/ProductsList";
import EditProduct from "./pages/EditProduct";

export default function App() {
  return (
    <BrowserRouter>
      <div className="admin-layout">
        <Sidebar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products-list" element={<ProductsList />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/products-list" element={<productList />} />
 
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
