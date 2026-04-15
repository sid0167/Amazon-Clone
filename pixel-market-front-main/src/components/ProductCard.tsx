import { Link } from 'react-router-dom';
import StarRating from './StarRating';

import { toast } from 'sonner';
import type { Product } from '@/types';
import { addToWishlist, removeFromWishlist } from "@/api/wishlist";
import { ShieldCheck } from 'lucide-react';
import { useState } from "react";
import { Heart } from "lucide-react";
import { addToCart } from "@/api/cart";

const ProductCard = ({ product }: { product: Product }) => {
  
  const [liked, setLiked] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

const handleAddToCart = async (e: React.MouseEvent) => {
  e.preventDefault();

  await addToCart(product);

  // 🔥 ADD THIS LINE (VERY IMPORTANT)
  window.dispatchEvent(new Event("cartUpdated"));

  toast.success("Added to cart ✓");
};

  return (
    <Link to={`/product/${product.id}`} className="block">
     <div className="relative bg-card rounded-lg border border-border hover:shadow-lg transition-shadow p-4 flex flex-col h-full">
        <button
          onClick={async (e) => {
            e.preventDefault(); // prevent navigation

            if (liked) {
              await removeFromWishlist(product.id);
              setLiked(false);
              toast.success("Removed from wishlist");
            } else {
              await addToWishlist(product);
              setLiked(true);
              toast.success("Added to wishlist ❤️");
            }
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
        >
          <Heart
            size={18}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
        <div className="aspect-square bg-muted rounded-md mb-3 overflow-hidden flex items-center justify-center">
          <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" loading="lazy" />
        </div>
        <h3 className="text-sm font-medium line-clamp-2 mb-1 text-foreground">{product.name}</h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={14} />
        <div className="mt-1">
          <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="ml-2 text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
          {discount > 0 && <span className="ml-2 text-xs text-destructive font-medium">({discount}% off)</span>}
        </div>
        {product.isPrime && (
          <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
            <ShieldCheck size={12} /> Prime
          </div>
        )}
        <button onClick={handleAddToCart} className="btn-amazon w-full mt-auto text-sm py-2">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
