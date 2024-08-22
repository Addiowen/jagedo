import React, { useState } from 'react';
import PlanCard from './plan-card';

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
}

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      title: 'Package 1',
      price: '3,000',
      description: 'Linkage Fee',
      features: [
        'Managed by JaGedo',
        'Fee is inclusive of 1 day labour charges and transport up to a certain radius [15KM from the county designated town]',
        'Response time within 24 hrs',
        'Fee is exclusive of material charge',
      ],
      isHighlighted: true,
    },
    {
      title: 'Package 2',
      price: '1,000',
      description: 'Linkage Fee',
      features: [
        'Managed by Self',
        'Fee is exclusive of labour, transport, and material',
        'Response time within 3 days',
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

export default Pricing;
