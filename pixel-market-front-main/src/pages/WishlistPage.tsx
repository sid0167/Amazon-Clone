import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import Footer from "@/components/Footer";
import { fetchWishlist, removeFromWishlist } from "@/api/wishlist";
import type { Product } from "@/types";
import { toast } from "sonner";

const WishlistPage = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchWishlist().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleRemove = async (id: string) => {
    const updated = await removeFromWishlist(id);
    setItems(updated);
    toast.success("Removed from wishlist");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SecondaryNav />

      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist ❤️</h1>

        {loading ? (
          <div className="text-center text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-medium">Your wishlist is empty</p>
            <Link to="/" className="btn-amazon">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <h2 className="text-sm font-medium line-clamp-2 mb-2">
                    {item.name}
                  </h2>
                </Link>

                <p className="text-lg font-bold mb-3">
                  ₹{item.price.toLocaleString()}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full text-red-500 border border-red-500 py-2 rounded hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;