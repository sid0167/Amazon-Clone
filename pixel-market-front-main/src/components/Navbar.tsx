import { Link } from 'react-router-dom';
import { Search, ShoppingCart, MapPin, Heart } from 'lucide-react';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCart } from "@/api/cart";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar = ({ searchQuery, onSearchChange }: NavbarProps) => {
const [cartCount, setCartCount] = useState(0);
 const user =
  localStorage.getItem("userName") ||
  localStorage.getItem("userId");
  const displayName = user ? user.split("@")[0] : "Guest";
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
  const loadCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setCartCount(0); // 🔥 important after logout
      return;
    }

    const data = await getCart();
    setCartCount(data.length);
  };

  loadCart();
}, [user]); // 🔥 runs when login/logout changes
const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");

  // clear cart
  

  navigate("/"); // 🔥 go to safe page (HOME)
};

  return (
    <nav className="bg-navbar text-navbar-foreground sticky top-0 z-50">
      <div className="flex items-center px-4 py-2 gap-3">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-1 hover:outline hover:outline-1 hover:outline-navbar-foreground rounded px-2 py-1">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-amazon-orange">amazon</span>
            <span className="text-[10px]">.in</span>
          </span>
        </Link>

        {/* Deliver to */}
        <div className="hidden md:flex items-center gap-1 text-xs hover:outline hover:outline-1 hover:outline-navbar-foreground rounded px-2 py-1 cursor-pointer">
          <MapPin size={18} />
          <div>
            <p className="text-muted-foreground text-[10px]">Deliver to</p>
            <p className="font-bold text-sm">India</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-3xl">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="hidden sm:block bg-muted text-foreground text-xs rounded-l-md px-2 border-r border-border focus:outline-none"
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Computers</option>
            <option>Smart Home</option>
            <option>Clothing</option>
            <option>Books</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Amazon.in"
            className="flex-1 px-3 py-2 text-foreground text-sm focus:outline-none sm:rounded-none rounded-l-md"
          />
          <button className="bg-amazon-orange hover:bg-amazon-hover px-3 rounded-r-md transition-colors">
            <Search size={20} className="text-foreground" />
          </button>
        </div>

        {/* Account */}
       <div className="hidden md:block text-xs hover:outline hover:outline-1 hover:outline-navbar-foreground rounded px-2 py-1">
  <p className="text-[10px]">
    Hello, {displayName}
  </p>

  {user ? (
    <button
      onClick={handleLogout}
      className="font-bold text-sm text-left"
    >
      Logout
    </button>
  ) : (
    <Link to="/login" className="font-bold text-sm">
      Sign In
    </Link>
  )}
</div>

        {/* Orders */}
        <Link to="/orders" className="hidden md:block text-xs hover:outline hover:outline-1 hover:outline-navbar-foreground rounded px-2 py-1">
          <p className="text-[10px]">Returns</p>
          <p className="font-bold text-sm">& Orders</p>
        </Link>

        <Link to="/wishlist" className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-navbar-foreground rounded px-2 py-1">
  <Heart size={20} />
  <span className="hidden sm:inline font-bold text-sm">Wishlist</span>
</Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-navbar-foreground rounded px-2 py-1 relative">
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 -right-1 bg-amazon-orange text-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-sm">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
