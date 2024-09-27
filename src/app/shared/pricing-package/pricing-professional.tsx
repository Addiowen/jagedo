import React, { useState, useEffect } from 'react';
import PlanCard from './plan-card'; 

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
}

interface PricingProps {
  onPlanSelect: (title: string, price: string) => void;
}

const PricingProfessional: React.FC<PricingProps> = ({ onPlanSelect }) => {
  // Update state type to store both title and price
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string } | null>(null);

  const plans: Plan[] = [
    {
      title: 'Managed by Jagedo',
      price: '0',
      description: 'Linkage Fee',
      features: [
        'Management commission is payable by Professional',
        'Fee is based on Professional Quotation',
        'Single Sourcing',
        'Response time 3 days',
      ],
      isHighlighted: true,
    },
    {
      title: 'Managed by Self',
      price: '5000',
      description: 'Linkage Fee',
      features: [
        'Professional Fee is based on Professional Quotation',
        'Sourcing through Competitive Bidding',
        'Response time 7 days'
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

export default PricingProfessional;
