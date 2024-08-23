'use client';

import React from 'react';
import { FaWallet } from 'react-icons/fa'; // Importing an icon from react-icons library// Adjust the import path as needed
import WidgetCard4 from '@/components/cards/widget-card4';

interface WalletCardProps {
  balance: string; // Balance to be displayed on the card
  className?: string; // Optional additional class names
  headerClassName?: string; // Optional header class names
  titleClassName?: string; // Optional title class names
  actionClassName?: string; // Optional action class names
  descriptionClassName?: string; // Optional description class names
}

const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  className,
  headerClassName,
  titleClassName,
  actionClassName,
  descriptionClassName,
}) => {
  return (
    <WidgetCard4
      title={
        <div className="flex items-center">
          <FaWallet className="mr-2 text-blue-500" /> My Wallet
        </div>
      }
      className={className}
      headerClassName={headerClassName}
      titleClassName={titleClassName}
      actionClassName={actionClassName}
      descriptionClassName={descriptionClassName}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-lg font-semibold">Balance</div>
        <div className="wallet-card-content text-3xl font-bold text-gray-700 mt-2">
          {balance}
        </div>
      </div>
    </WidgetCard4>
  );
};

export default WalletCard;
