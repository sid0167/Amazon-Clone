import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const products = [
  {
    name: "Samsung Galaxy M14 5G",
    description: "Triple camera setup with 50MP main camera. 6000mAh battery.",
    price: 10999,
    originalPrice: 14999,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400"
    ],
    category: "Electronics",
    stock: 45,
    rating: 4.2,
    reviewCount: 12453
  },
  {
    name: "boAt Rockerz 450 Headphones",
    description: "40mm drivers, up to 15 hours playback.",
    price: 1299,
    originalPrice: 3990,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
    ],
    category: "Electronics",
    stock: 120,
    rating: 4.0,
    reviewCount: 87654
  },
  {
    name: "HP Laptop i5 12th Gen",
    description: "8GB RAM, 512GB SSD, Full HD display.",
    price: 48990,
    originalPrice: 62738,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    ],
    category: "Computers",
    stock: 18,
    rating: 4.3,
    reviewCount: 3421
  },
  {
    name: "Echo Dot 5th Gen",
    description: "Smart speaker with Alexa, deep bass.",
    price: 4499,
    originalPrice: 5499,
    images: [
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400",
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400"
    ],
    category: "Smart Home",
    stock: 200,
    rating: 4.5,
    reviewCount: 45230
  },
  {
    name: "Levi's Cotton T-Shirt",
    description: "100% cotton, regular fit.",
    price: 599,
    originalPrice: 1499,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400"
    ],
    category: "Clothing",
    stock: 500,
    rating: 4.1,
    reviewCount: 9876
  },
  {
    name: "Atomic Habits Book",
    description: "Best-selling self-improvement book.",
    price: 399,
    originalPrice: 799,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
    ],
    category: "Books",
    stock: 1000,
    rating: 4.7,
    reviewCount: 156789
  },
  {
    name: "Fire-Boltt Smart Watch",
    description: "Bluetooth calling, AI voice assistant.",
    price: 1499,
    originalPrice: 8999,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400"
    ],
    category: "Electronics",
    stock: 75,
    rating: 3.9,
    reviewCount: 23456
  },
  {
    name: "Prestige Electric Kettle",
    description: "1.5L, auto cut-off, stainless steel.",
    price: 749,
    originalPrice: 1195,
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
    ],
    category: "Home Appliances",
    stock: 60,
    rating: 4.0,
    reviewCount: 5678
  }
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();