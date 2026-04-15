import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true // ✅ FIXED
  },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number
    }
  ]
});

export default mongoose.model("Cart", cartSchema);