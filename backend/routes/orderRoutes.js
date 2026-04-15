import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// PLACE ORDER
router.post("/", async (req, res) => {
  try {
    const { items, shippingAddress, userId } = req.body;

    // ✅ Validate user
    if (!userId) {
      return res.status(400).json({ error: "User required" });
    }

    // ✅ Validate cart
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // ✅ Check user FIRST (important)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Calculate total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ✅ Create order
    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      total
    });

    // ✅ Send email (safe)
    try {
      await sendEmail(
        user.email,
        "Order Confirmed 🛒",
        `<h2>Hello ${user.name}</h2>
         <p>Your order is placed successfully!</p>
         <p><strong>Total: ₹${total}</strong></p>`
      );
    } catch (err) {
      console.log("Email failed:", err.message);
    }

    // ✅ Clear user's cart
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );

    // ✅ Response
    res.json(order);

  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ORDERS (user-specific)
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "User required" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;