import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// ✅ GET wishlist
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, items: [] });
  }

  res.json(wishlist.items); // ✅ return only items
});

// ✅ ADD to wishlist
router.post("/", async (req, res) => {
  const userId = req.query.userId;
  const item = req.body;

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, items: [] });
  }

  const exists = wishlist.items.find(
    i => String(i.productId) === String(item.productId)
  );

  if (!exists) {
    wishlist.items.push({
      productId: String(item.productId),
      name: item.name,
      image: item.image,
      price: item.price
    });
  }

  await wishlist.save();

  res.json(wishlist.items);
});

// ✅ REMOVE
router.delete("/:productId", async (req, res) => {
  const userId = req.query.userId;

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) return res.json([]);

  wishlist.items = wishlist.items.filter(
    i => String(i.productId) !== String(req.params.productId)
  );

  await wishlist.save();

  res.json(wishlist.items);
});

export default router;