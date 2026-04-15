import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
}

const QuantityStepper = ({ quantity, onChange, min = 1, max = 10 }: QuantityStepperProps) => {
  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="px-3 py-1 bg-muted hover:bg-muted/80 disabled:opacity-40 transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="px-4 py-1 text-sm font-medium min-w-[40px] text-center">{quantity}</span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="px-3 py-1 bg-muted hover:bg-muted/80 disabled:opacity-40 transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default QuantityStepper;
