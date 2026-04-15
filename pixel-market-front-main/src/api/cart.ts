const API_BASE = import.meta.env.VITE_API_BASE_URL;

// UPDATE ITEM
export async function updateCartItem(itemId, quantity) {
  const userId = localStorage.getItem("userId");

  if (!userId) return; // 🔥 stop if not logged in

  await fetch(`${API_BASE}/cart/${itemId}?userId=${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }) // ✅ only quantity
  });
}

// DELETE ITEM
export async function deleteCartItem(itemId) {
  const userId = localStorage.getItem("userId");

  if (!userId) return; // 🔥 important

  await fetch(`${API_BASE}/cart/${itemId}?userId=${userId}`, {
    method: 'DELETE'
  });
}

export async function getCart() {
  const userId = localStorage.getItem("userId");

  if (!userId) return [];

  const res = await fetch(`${API_BASE}/cart?userId=${userId}`);
  const data = await res.json();

  return data;
}

export async function addToCart(product) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    return;
  }

  await fetch(`${API_BASE}/cart?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
    }),
  });
}