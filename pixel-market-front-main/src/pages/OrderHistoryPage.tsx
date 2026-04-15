import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SecondaryNav from '@/components/SecondaryNav';
import Footer from '@/components/Footer';
import { fetchOrders } from '@/api/orders';
import type { Order } from '@/types';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';

const statusColors: Record<string, string> = {
  Processing: 'bg-amazon-orange/20 text-amazon-orange',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = localStorage.getItem("userId");

if (!userId) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-lg font-semibold">Please login to view orders</h2>
    </div>
  );
}

  useEffect(() => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    setLoading(false); // stop loading
    return; // 🔥 STOP API CALL
  }

  fetchOrders().then((o) => {
    setOrders(o);
    setLoading(false);
  });
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SecondaryNav />

      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold text-foreground">No orders yet</h2>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div>
                      <p className="font-bold text-foreground text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{order.items.length} item(s)</p>
                    </div>
                    {expandedId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {expandedId === order.id && (
                  <div className="border-t border-border p-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
