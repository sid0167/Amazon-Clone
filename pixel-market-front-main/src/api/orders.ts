import type { CartItem, ShippingAddress, Order } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

// PLACE ORDER
export async function placeOrder(
  items: CartItem[],
  shippingAddress: ShippingAddress
): Promise<Order> {
  const userId = localStorage.getItem("userId");

  // 👇 ADD THIS BLOCK
  const formattedItems = items.map(item => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1
  }));

  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      // 👇 CHANGE THIS LINE
      body: JSON.stringify({
        userId,
        items: formattedItems,
        shippingAddress
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("ORDER ERROR:", data); // 🔥 helpful debug
      throw new Error(data.error || 'API error');
    }

    return data;
  } catch (err) {
    console.error(err);

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