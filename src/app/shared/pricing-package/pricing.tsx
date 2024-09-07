import React, { useState, useEffect } from 'react';
import PlanCard from './plan-card'; // Make sure the import path is correct

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
}

interface PricingProps {
  onPlanSelect: (title: string, price: string) => void; // Prop to pass the selected plan to parent
}

const Pricing: React.FC<PricingProps> = ({ onPlanSelect }) => {
  // Update state type to store both title and price
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string } | null>(null);

  const plans: Plan[] = [
    {
      title: 'Managed by Jagedo',
      price: '3000',
      description: 'Linkage Fee',
      features: [
        'Fee is inclusive of 1 day labour charges and transport up to a certain radius [15KM from the county designated town]',
        'Response time within 24 hrs',
        'Fee is exclusive of material charge',
      ],
      isHighlighted: true,
    },
    {
      title: 'Managed by Self',
      price: '1000',
      description: 'Linkage Fee',
      features: [
        'Fee is exclusive of labour, transport, and material',
        'Response time within 3 days',
      ],
      isHighlighted: false,
    },
  ];

  useEffect(() => {
    if (selectedPlan) {
      // Notify parent about the selected plan
      onPlanSelect(selectedPlan.title, selectedPlan.price);
    }
  }, [selectedPlan, onPlanSelect]);

  // Update function to handle both title and price
  const handleSelectPlan = (title: string, price: string) => {
    setSelectedPlan({ title, price });
  };

  return (
    <div className="flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Choose your package</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            {...plan}
            isSelected={selectedPlan?.title === plan.title}
            onClick={() => handleSelectPlan(plan.title, plan.price)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
