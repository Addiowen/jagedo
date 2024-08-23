import React, { useState } from 'react';
import PlanCard from './plan-card';

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
}

const PricingProfessional: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      title: 'Package 1',
      price: '',
      description: 'Linkage Fee',
      features: [
        'Managed by JaGedo',
        'Management commission is payable by Professional',
        'Fee is based on Professional Quotation',
        'Single Sourcing',
        'Response time 3 days',
      ],
      isHighlighted: true,
    },
    {
      title: 'Package 2',
      price: '5,000',
      description: 'Linkage Fee',
      features: [
        'Managed by Self',
        'Professional Fee is based on Professional Quotation',
        'Sourcing through Competitive Bidding',
        'Response time 7 days'
      ],
      isHighlighted: false,
    },
  ];

  const handleSelectPlan = (title: string) => {
    setSelectedPlan(title);
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
            isSelected={selectedPlan === plan.title}
            onClick={() => handleSelectPlan(plan.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingProfessional;
