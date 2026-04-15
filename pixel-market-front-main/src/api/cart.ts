const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 🔁 UPDATE ITEM
export async function updateCartItem(itemId, quantity) {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  try {
    const res = await fetch(`${API_BASE}/cart/${itemId}?userId=${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) throw new Error("Failed to update cart");

    // 🔥 notify app
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Update cart error:", err);
  }
}

// ❌ DELETE ITEM
export async function deleteCartItem(itemId) {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  try {
    const res = await fetch(`${API_BASE}/cart/${itemId}?userId=${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete item");

    // 🔥 notify app
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Delete cart error:", err);
  }
}

// 📦 GET CART
export async function getCart() {
  const userId = localStorage.getItem("userId");
  if (!userId) return [];

  try {
    const res = await fetch(`${API_BASE}/cart?userId=${userId}`);

    if (!res.ok) throw new Error("Failed to fetch cart");

    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Get cart error:", err);
    return [];
  }
}

// ➕ ADD TO CART
export async function addToCart(product) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/cart?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        quantity: 1,
      }),
    });

    if (!res.ok) throw new Error("Failed to add item");

    // 🔥 notify entire app (IMPORTANT)
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Add to cart error:", err);
  }
}