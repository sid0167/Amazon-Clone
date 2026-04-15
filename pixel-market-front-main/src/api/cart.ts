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