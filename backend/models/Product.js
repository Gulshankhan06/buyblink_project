import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    size: {
      type: String,
    },

    color: {
      type: String,
    },

    stock: {
      type: Number,
      default: 1,
    },

    image: {
      type: String,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
