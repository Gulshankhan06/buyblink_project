import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Image folder public
app.use("/uploads", express.static("uploads"));

// Products API
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("BuyBlink backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
