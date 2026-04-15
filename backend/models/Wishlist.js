import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true // ✅ FIXED
  },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number
    }
  ]
});

export default mongoose.model("Wishlist", wishlistSchema);