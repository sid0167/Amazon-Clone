import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// GET wishlist
router.get("/", async (req, res) => {
  let wishlist = await Wishlist.findOne({ userId: "user_default_1" });

  if (!wishlist) {
    wishlist = await Wishlist.create({ items: [] });
  }

  res.json(wishlist);
});

// ADD to wishlist
router.post("/add", async (req, res) => {
  const { product } = req.body;

  let wishlist = await Wishlist.findOne({ userId: "user_default_1" });

  if (!wishlist) {
    wishlist = await Wishlist.create({ items: [] });
  }

  const exists = wishlist.items.find(
    item => item.productId === product._id
  );

  if (!exists) {
    wishlist.items.push({
      productId: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price
    });
  }

  await wishlist.save();
  res.json(wishlist);
});

// REMOVE
router.delete("/:productId", async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: "user_default_1" });

  wishlist.items = wishlist.items.filter(
    item => item.productId !== req.params.productId
  );

  await wishlist.save();
  res.json(wishlist);
});

export default router;