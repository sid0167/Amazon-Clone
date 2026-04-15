import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true // ✅ FIXED
  },
  items: Array,
  shippingAddress: Object,
  total: Number,
  status: {
    type: String,
    default: "Processing"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);