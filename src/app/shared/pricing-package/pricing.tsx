import React, { useState, useEffect } from 'react';
import PlanCard from './plan-card'; // Make sure the import path is correct

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
      title: 'Managed by Jagedo',
      price: '3,000',
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
      price: '1,000',
      description: 'Linkage Fee',
      features: [
        'Fee is exclusive of labour, transport, and material',
        'Response time within 3 days',
      ],
      isHighlighted: false,
    },
  ];

  useEffect(() => {
    // Initialize the selectedPlan with the first plan's title
    if (plans.length > 0) {
      setSelectedPlan(plans[0].title);
    }
  }, []); // Empty dependency array means this runs once when the component mounts

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
