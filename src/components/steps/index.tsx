// components/StepProgressBar.tsx
import React from 'react';

interface StepProgressBarProps {
  steps: string[];
  currentStep: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-1 items-center">
          <div
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 ${index <= currentStep ? 'border-blue-500' : 'border-gray-300'}`}
          >
            <span
              className={`absolute text-sm ${index <= currentStep ? 'text-blue-500' : 'text-gray-300'}`}
            >
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute left-full h-1 w-full ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></div>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className="ml-2 mr-2 h-1 w-full flex-grow bg-gray-300">
              <div
                className={`h-full ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
