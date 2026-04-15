import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            index < currentStep
              ? 'bg-green-600 text-card'
              : index === currentStep
              ? 'bg-amazon-orange text-card'
              : 'bg-muted text-muted-foreground'
          }`}>
            {index < currentStep ? <Check size={16} /> : index + 1}
          </div>
          <span className={`text-sm hidden sm:inline ${
            index <= currentStep ? 'font-bold text-foreground' : 'text-muted-foreground'
          }`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5 ${index < currentStep ? 'bg-green-600' : 'bg-muted'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
