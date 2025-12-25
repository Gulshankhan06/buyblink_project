import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

/* ================= MULTER SETUP ================= */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= SEED ROUTE ================= */
router.get("/seed", async (req, res) => {
  const count = await Product.countDocuments();
  if (count > 0) {
    return res.json({ seeded: false, count });
  }

  const demo = [
    {
      name: "Men Shirt",
      price: 799,
      category: "mens",
      image: "https://via.placeholder.com/400",
      description: "Premium cotton men shirt",
      colors: ["blue", "black"],
      stock: 10,
      deliveryDate: "3–5 days",
    },
    {
      name: "Women Dress",
      price: 1299,
      category: "womens",
      image: "https://via.placeholder.com/400",
      description: "Stylish women dress",
      colors: ["red", "pink"],
      stock: 5,
      deliveryDate: "2–4 days",
    },
  ];

  await Product.insertMany(demo);
  res.json({ seeded: true, count: demo.length });
});

/* ================= GET ALL PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

/* ================= 🔥 GET SINGLE PRODUCT ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Invalid product ID" });
  }
});

/* ================= CREATE PRODUCT ================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    };

    const product = await Product.create(productData);
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ================= UPDATE PRODUCT ================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
