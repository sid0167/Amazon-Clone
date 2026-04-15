import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  const userId = req.query.userId || "guest";

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  res.json(cart);
});

// ADD to cart
router.post("/add", async (req, res) => {
  const { product, userId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    item => item.productId === product.id
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += 1;
  } else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1
    });
  }

  await cart.save();
  res.json(cart);
});

// UPDATE quantity
router.put("/:productId", async (req, res) => {
  const { quantity, userId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const item = cart.items.find(
    item => item.productId === req.params.productId
  );

  if (item) {
    item.quantity = quantity;
  }

  await cart.save();
  res.json(cart);
});

// DELETE item
router.delete("/:productId", async (req, res) => {
  const userId = req.query.userId;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.json({ items: [] }); // safe return
  }

  cart.items = cart.items.filter(
    item => item.productId !== req.params.productId
  );

  await cart.save();
  res.json(cart);
});

export default router;