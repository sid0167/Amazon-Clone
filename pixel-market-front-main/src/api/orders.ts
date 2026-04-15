import type { CartItem, ShippingAddress, Order } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

// PLACE ORDER
export async function placeOrder(
  items: CartItem[],
  shippingAddress: ShippingAddress
): Promise<Order> {
  const userId = localStorage.getItem("userId"); // ✅

  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, shippingAddress, userId }) // ✅ FIX
    });

    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    return {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      items,
      shippingAddress,
      total: items.reduce((s, i) => s + i.price * i.quantity, 0),
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };
  }
}

// FETCH ORDERS
export async function fetchOrders(): Promise<Order[]> {
  const userId = localStorage.getItem("userId"); // ✅

  try {
    const res = await fetch(`${API_BASE}/orders?userId=${userId}`); // ✅ FIX
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    return [];
  }
}