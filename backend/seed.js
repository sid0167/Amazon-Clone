import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "iPhone 14",
    description: "Apple smartphone",
    price: 70000,
    originalPrice: 80000,
    images: ["https://via.placeholder.com/300"],
    category: "Electronics",
    stock: 10,
    rating: 4.5,
    reviewCount: 120
  },
  {
    name: "Laptop",
    description: "Gaming laptop",
    price: 90000,
    images: ["https://via.placeholder.com/300"],
    category: "Computers",
    stock: 5,
    rating: 4.2,
    reviewCount: 80
  }
];

const seedData = async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("Data seeded");
  process.exit();
};

seedData();