# 🛒 E-Commerce Platform (Amazon Clone)

A full-stack Amazon-inspired e-commerce web application built as part of an SDE Intern Fullstack Assignment.
The application replicates core Amazon functionalities including product browsing, cart management, wishlist, and order placement with a clean and responsive UI.

---

## 🚀 Live Demo

Frontend: https://amazon-clone-sable-xi.vercel.app/
Backend API: https://amazon-clone-u3xt.onrender.com/api

---

## 🧠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## ✨ Features

* 🛍️ Product browsing with Amazon-style UI
* 🔍 Product search by name
* 🗂️ Category-based filtering
* 🛒 Add to cart & update quantity (+ / -)
* ❌ Remove items from cart
* 💰 Real-time subtotal calculation
* ❤️ Wishlist functionality
* 📦 Place orders with shipping details
* 📊 Order history with status tracking
* 👤 Guest login (no signup required)
* 🔐 Optional login/signup support
* 📩 Email notification (Resend - demo mode)

---

## 📦 Core Features (Assignment Requirements)

### 1️⃣ Product Listing Page

* Grid layout similar to Amazon
* Product cards with image, name, price
* Add to Cart functionality
* Search and filtering support

---

### 2️⃣ Product Detail Page

* Product image display
* Description and details
* Price and stock information
* Add to Cart & Buy Now

---

### 3️⃣ Shopping Cart

* View all items
* Update quantity (+ / -)
* Remove items
* Subtotal calculation

---

### 4️⃣ Order Placement

* Checkout page with shipping details
* Order summary before placing order
* Order confirmation with Order ID

---

## ⭐ Bonus Features

* 📊 Order history page
* ❤️ Wishlist functionality
* 📩 Email notification system
* 👤 Guest login
* ⚡ Backend auto-ping to prevent cold starts
* 🎨 Responsive UI

---

## 🔐 Authentication

This project includes a simplified authentication system:

### 👤 Guest Login

* Click **"Continue as Guest"**
* Automatically logs in using a predefined demo account
* No manual input required

### 🔑 Login / Signup

* Users can create an account
* Credentials stored in database
* User-specific cart and orders maintained

👉 As per assignment, authentication is kept optional and simplified.

---

## 🗄️ Database Design

* **Users Collection**

  * Stores user credentials and details

* **Products Collection**

  * name, price, category, images, stock

* **Cart Collection**

  * userId, items (productId, quantity, price)

* **Wishlist Collection**

  * userId, saved productIds

* **Orders Collection**

  * userId, items, total, shippingAddress, status

---

## 🧠 Why MongoDB?

MongoDB was chosen over SQL databases for:

* 📦 Flexible schema design for dynamic product data
* 🔗 Easy handling of nested structures (cart, orders)
* ⚡ Faster development and prototyping
* 🚀 Suitable for MVP and assignment-scale applications

👉 SQL databases can be used in production for stricter consistency if needed.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_connection
PORT=5000
RESEND_API_KEY=your_resend_key
```

Run:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=https://your-backend-link/api
```

Run:

```bash
npm run dev
```

---

## 🧪 Assumptions

* A default user is considered logged in (guest mode available)
* Email system works in demo mode due to domain limitations
* Sample product data is pre-seeded
* Focus is on core e-commerce functionality rather than full authentication system

---

## 🧪 Demo Flow

1. Open the application
2. Browse/search products
3. Add items to cart
4. Update quantity
5. Proceed to checkout
6. Place order
7. View order history

---


## 🎯 Evaluation Criteria Coverage

* ✅ Functionality: All required features implemented
* ✅ UI/UX: Amazon-inspired layout and interactions
* ✅ Database Design: Structured collections and relationships
* ✅ Code Quality: Clean and modular code
* ✅ Code Modularity: Separation of concerns (frontend/backend/components)

---

## 👨‍💻 Author

Siddharth Dang(2310992531)
Chitkara University,Rajpura
3rd Year Computer Science Engineering Student

---

## ⭐ Note

This project was built as part of an assignment.
All code is written with full understanding and can be explained in detail during evaluation.


## 📁 Project Structure


amazon-clone/
│
├── frontend/ (pixel-market-front-main)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── api/                 # API calls (cart, orders, auth, wishlist)
│   │   ├── components/          # Reusable UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility/helper functions
│   │   ├── pages/               # Pages (Home, Cart, Checkout, Orders)
│   │   ├── store/               # State management
│   │   ├── types/               # TypeScript interfaces/types
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # Entry point
│   │
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── config/                  # Database/config setup
│   ├── controllers/             # Business logic
│   ├── data/                    # Seed/sample data
│   ├── middleware/              # Auth & error middleware
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API routes (products, cart, orders, etc.)
│   ├── utils/                   # Helper functions (email, etc.)
│   ├── seed.js                  # Data seeding script
│   └── server.js                # Entry point
│
└── README.md
