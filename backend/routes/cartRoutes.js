import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ GET CART
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  res.json(cart.items); // 🔥 FIXED (important)
});

// ✅ ADD TO CART (MATCH FRONTEND)
router.post("/", async (req, res) => {
  const userId = req.query.userId;
  const item = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const index = cart.items.findIndex(
    i => String(i.productId) === String(item.productId)
  );

  if (index > -1) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({
      productId: String(item.productId),
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1
    });
  }

  await cart.save();

  res.json(cart.items);
});

// ✅ UPDATE
router.put("/:productId", async (req, res) => {
  const userId = req.query.userId;
  const { quantity } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) return res.json([]);

  const item = cart.items.find(
    i => String(i.productId) === String(req.params.productId)
  );

  if (item) {
    item.quantity = quantity;
  }

  await cart.save();
  res.json(cart.items);
});

// ✅ DELETE
router.delete("/:productId", async (req, res) => {
  const userId = req.query.userId;

  let cart = await Cart.findOne({ userId });

  if (!cart) return res.json([]);

  cart.items = cart.items.filter(
    i => String(i.productId) === String(req.params.productId)
  );

  await cart.save();
  res.json(cart.items);
});

export default router;