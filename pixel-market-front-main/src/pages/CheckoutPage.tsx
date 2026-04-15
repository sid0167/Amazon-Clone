import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SecondaryNav from '@/components/SecondaryNav';
import Footer from '@/components/Footer';
import StepIndicator from '@/components/StepIndicator';
import { useCartStore } from '@/store/cartStore';
import { placeOrder } from '@/api/orders';
import type { ShippingAddress, Order } from '@/types';
import { CheckCircle } from 'lucide-react';
import type { CartItem } from '@/types';

const indianStates = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi'];

const steps = ['Address', 'Review', 'Confirm'];

const CheckoutPage = () => {
  
  const { cartItems, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [realCart, setRealCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pinCode: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

 const subtotal = (realCart.length ? realCart : cartItems).reduce(
  (s, i) => s + i.price * (i.quantity ?? 1),
  0
);

  const validateAddress = () => {
    const e: typeof errors = {};
    if (!address.fullName.trim()) e.fullName = 'Full name is required';
    if (!address.phone.trim() || !/^\d{10}$/.test(address.phone)) e.phone = 'Valid 10-digit phone required';
    if (!address.addressLine1.trim()) e.addressLine1 = 'Address is required';
    if (!address.city.trim()) e.city = 'City is required';
    if (!address.state) e.state = 'State is required';
    if (!address.pinCode.trim() || !/^\d{6}$/.test(address.pinCode)) e.pinCode = 'Valid 6-digit PIN required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 0 && !validateAddress()) return;
    if (currentStep === 1) {
      const userId = localStorage.getItem("userId");

fetch(`${import.meta.env.VITE_API_BASE_URL}/cart?userId=${userId}`)
  .then(res => res.json())
  .then((items) => {
  console.log("REAL CART:", items);

  setRealCart(items); // ✅ store it

  return placeOrder(items, address);
})
  .then((o) => {
    setOrder(o);
    clearCart();
    setCurrentStep(2);
  });
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const inputClass = (field: keyof ShippingAddress) =>
    `w-full border rounded px-3 py-2 text-sm bg-card text-foreground ${errors[field] ? 'border-destructive' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-amazon-orange`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SecondaryNav />

      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">
        <StepIndicator currentStep={currentStep} steps={steps} />

        {currentStep === 0 && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Shipping Address</h2>
            <div className="grid gap-4">
              {([
                ['fullName', 'Full Name', 'text'],
                ['phone', 'Phone Number', 'tel'],
                ['addressLine1', 'Address Line 1', 'text'],
                ['addressLine2', 'Address Line 2 (Optional)', 'text'],
                ['city', 'City', 'text'],
                ['pinCode', 'PIN Code', 'text'],
              ] as const).map(([key, label, type]) => (
                <div key={key}>
                  <label className="text-sm font-medium text-foreground mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={address[key]}
                    onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                    className={inputClass(key)}
                  />
                  {errors[key] && <p className="text-xs text-destructive mt-1">{errors[key]}</p>}
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">State</label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className={inputClass('state')}
                >
                  <option value="">Select State</option>
                  {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
              </div>
            </div>
            <button onClick={handleNextStep} className="btn-amazon w-full py-3 mt-6">Continue to Review</button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Review</h2>
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-1">Shipping to: {address.fullName}, {address.city}, {address.state} - {address.pinCode}</p>
              <p className="text-xl font-bold text-foreground">Order Total: ₹{subtotal.toLocaleString()}</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setCurrentStep(0)} className="flex-1 border border-border rounded-lg py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">Back</button>
              <button onClick={handleNextStep} className="flex-1 btn-amazon py-3">Place Order</button>
            </div>
          </div>
        )}

        {currentStep === 2 && order && (
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
            <p className="text-muted-foreground mb-1">Thank you for your order.</p>
            <p className="font-medium text-foreground mb-6">Order ID: {order.id}</p>
            <Link to="/" className="btn-amazon px-8 py-3">Continue Shopping</Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
