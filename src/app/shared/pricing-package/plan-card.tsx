import React from 'react';

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, description, features, isHighlighted, isSelected, onClick }) => {
  return (
    <div
      className={`flex flex-col justify-between p-6 rounded-lg border shadow-lg cursor-pointer transition-all duration-300 ${
        isSelected ? 'bg-blue-500 text-white transform scale-105 shadow-2xl' : isHighlighted ? 'bg-gray-100 text-white' : 'bg-white text-gray-900'
      }`}
      onClick={onClick}
    >
      <div>
        <h3 className={`text-xl font-bold mt-4 ${isSelected ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-5xl font-semibold mt-4 ${isSelected ? 'text-white' : 'text-gray-600'}`}>
          {price === '0' ? `Ksh ${price}` : `Ksh ${price} `}
        </p>
        <p className={`mb-6 ${isSelected ? 'text-white' : 'text-gray-700'}`}>{description}</p>
        <ul className={`space-y-3 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;
