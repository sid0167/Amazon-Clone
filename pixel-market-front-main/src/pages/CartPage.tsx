import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SecondaryNav from '@/components/SecondaryNav';
import Footer from '@/components/Footer';
import CartItemComponent from '@/components/CartItem';
import { useCartStore } from '@/store/cartStore';
import { updateCartItem, deleteCartItem } from '@/api/cart';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleUpdateQty = (id: string, qty: number) => {
    updateQuantity(id, qty);
    updateCartItem(id, qty);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    deleteCartItem(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SecondaryNav />

      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart size={80} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Your Amazon Cart is empty</h2>
            <p className="text-muted-foreground mb-6">Your shopping cart is waiting. Give it purpose — fill it with groceries, clothing, household supplies, electronics and more.</p>
            <Link to="/" className="btn-amazon px-8 py-3">Shop now</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQty}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-20">
                {subtotal >= 499 && (
                  <p className="text-sm text-green-600 mb-3">✓ Your order qualifies for FREE Delivery</p>
                )}
                <p className="text-lg text-foreground">
                  Subtotal ({totalItems} items): <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </p>
                <Link to="/checkout" className="btn-amazon w-full py-3 mt-4 block text-center">
                  Proceed to Buy
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
