import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

      try {
  await sendEmail(
    email,
    "Welcome to Amazon Clone 🎉",
    `<h2>Hello ${name}</h2>
     <p>Your account has been created successfully.</p>`
  );
} catch (err) {
  console.log("Email failed:", err);
}

  res.json({ userId: user._id, name: user.name });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Wrong password" });

  res.json({ userId: user._id, name: user.name });
});

export default router;