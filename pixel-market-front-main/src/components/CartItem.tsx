import QuantityStepper from './QuantityStepper';
import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground truncate">{item.name}</h3>
        <p className="text-lg font-bold text-foreground mt-1">₹{item.price.toLocaleString()}</p>
        <div className="flex items-center gap-4 mt-2">
          <QuantityStepper quantity={item.quantity} onChange={(qty) => {
  console.log("QTY CHANGE:", item.productId, qty);
  onUpdateQuantity(item.productId, qty);
}} />
          <button onClick={() => onRemove(item.productId)} className="text-destructive text-sm flex items-center gap-1 hover:underline">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CartItem;
