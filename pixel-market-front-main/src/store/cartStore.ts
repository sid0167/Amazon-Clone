import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      cartCount: 0,
      addToCart: (item) => {
        const existing = get().cartItems.find(i => i.productId === item.productId);
        let newItems: CartItem[];
        if (existing) {
          newItems = get().cartItems.map(i =>
            i.productId === item.productId
              ? { ...i, quantity: Math.min(i.quantity + item.quantity, 10) }
              : i
          );
        } else {
          newItems = [...get().cartItems, { ...item, id: crypto.randomUUID() }];
        }
        set({
          cartItems: newItems,
          cartCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
        });
      },
      removeFromCart: (id) => {
        const newItems = get().cartItems.filter(i => i.id !== id);
        set({
          cartItems: newItems,
          cartCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
        });
      },
      updateQuantity: (id, qty) => {
        const newItems = get().cartItems.map(i =>
          i.id === id ? { ...i, quantity: Math.max(1, Math.min(qty, 10)) } : i
        );
        set({
          cartItems: newItems,
          cartCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
        });
      },
      clearCart: () => set({ cartItems: [], cartCount: 0 }),
    }),
    { name: 'amazon-cart' }
  )
);
