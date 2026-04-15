import type { Product } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

// Mock wishlist
let mockWishlist: Product[] = [];

type WishlistItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
};

// GET Wishlist
export async function fetchWishlist(): Promise<Product[]> {
  const userId = localStorage.getItem("userId"); // ✅ moved here

  try {
    const res = await fetch(`${API_BASE}/wishlist?userId=${userId}`);
    if (!res.ok) throw new Error('API error');

    const data = await res.json();

    return (data.items || []).map((item: WishlistItem) => ({
      id: item.productId,
      name: item.name,
      description: "",
      price: item.price,
      originalPrice: undefined,
      images: [item.image],
      category: "",
      stock: 0,
      rating: 0,
      reviewCount: 0,
      specifications: [],
      isPrime: false
    }));

  } catch {
    return mockWishlist;
  }
}

// ADD to Wishlist
export async function addToWishlist(product: Product): Promise<Product[]> {
  const userId = localStorage.getItem("userId"); // ✅

  try {
    const res = await fetch(`${API_BASE}/wishlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, userId }) // ✅ IMPORTANT
    });

    if (!res.ok) throw new Error('API error');

    return fetchWishlist(); // ✅ refresh properly
  } catch {
    const exists = mockWishlist.find(p => p.id === product.id);
    if (!exists) {
      mockWishlist.push(product);
    }
    return mockWishlist;
  }
}

// REMOVE from Wishlist
export async function removeFromWishlist(productId: string): Promise<Product[]> {
  const userId = localStorage.getItem("userId"); // ✅

  try {
    await fetch(`${API_BASE}/wishlist/${productId}?userId=${userId}`, {
      method: 'DELETE'
    });

    return fetchWishlist(); // ✅ refresh
  } catch {
    mockWishlist = mockWishlist.filter(p => p.id !== productId);
    return mockWishlist;
  }
}