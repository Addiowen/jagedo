'use client';

import React from 'react';
import { FaWallet } from 'react-icons/fa';
import WidgetCard4 from '@/components/cards/widget-card4';
import { StaticImageData } from 'next/image';

interface WalletCardProps {
  balance: string;
  image?: string | StaticImageData;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  image,
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
        {image && (
          <img
            src={typeof image === 'string' ? image : image.src}
            alt="Wallet"
            className="w-32 h-32 object-cover rounded-t-lg mb-4"
          />
        )}
        <div className="text-lg font-semibold">Balance</div>
        <div className="wallet-card-content text-3xl font-bold text-gray-700 mt-2">
          {balance}
        </div>
      </div>
    </WidgetCard4>
  );
};

export default WalletCard;