const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ✅ Matches backend
export type WishlistItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
};

// ✅ Minimal product type (only what you need)
type ProductInput = {
  id: string;
  name: string;
  images: string[];
  price: number;
};

// ✅ GET Wishlist
export async function fetchWishlist(): Promise<WishlistItem[]> {
  const userId = localStorage.getItem("userId");

  try {
    const res = await fetch(`${API_BASE}/wishlist?userId=${userId}`);

    if (!res.ok) throw new Error("Failed to fetch wishlist");

    const data = await res.json();

    return Array.isArray(data) ? data : []; // ✅ safe
  } catch (err) {
    console.error("Fetch wishlist error:", err);
    return [];
  }
}

// ✅ ADD to Wishlist
export async function addToWishlist(product: ProductInput): Promise<void> {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/wishlist?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
      }),
    });

    if (!res.ok) throw new Error("Failed to add item");

    // 🔥 notify app
    window.dispatchEvent(new Event("wishlistUpdated"));
  } catch (err) {
    console.error("Add to wishlist error:", err);
  }
}

// ✅ REMOVE from Wishlist
export async function removeFromWishlist(productId: string): Promise<void> {
  const userId = localStorage.getItem("userId");

  if (!userId) return;

  try {
    const res = await fetch(`${API_BASE}/wishlist/${productId}?userId=${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to remove item");

    // 🔥 notify app
    window.dispatchEvent(new Event("wishlistUpdated"));
  } catch (err) {
    console.error("Remove wishlist error:", err);
  }
}