import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  images: [String],
  category: String,
  stock: Number,
  rating: Number,
  reviewCount: Number,
  specifications: [
    {
      key: String,
      value: String
    }
  ]
});

export default mongoose.model("Product", productSchema);