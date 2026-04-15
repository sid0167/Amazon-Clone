const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// UPDATE ITEM
export async function updateCartItem(itemId: string, quantity: number) {
  const userId = localStorage.getItem("userId"); // ✅

  try {
    await fetch(`${API_BASE}/cart/${itemId}?userId=${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity, userId }) // ✅ include
    });
  } catch {
    // Silently fail
  }
}

// DELETE ITEM
export async function deleteCartItem(itemId: string) {
  const userId = localStorage.getItem("userId"); // ✅

  try {
    await fetch(`${API_BASE}/cart/${itemId}?userId=${userId}`, {
      method: 'DELETE'
    });
  } catch {
    // Silently fail
  }
}