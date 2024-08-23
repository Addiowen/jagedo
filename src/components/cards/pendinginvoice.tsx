'use client';

import React from 'react';
import WidgetCard5 from '@/components/cards/widget-card5';

interface PendingInvoiceCardProps {
  invoiceId: string;
  amount: number;
  dueDate: string; // formatted date string (e.g., "2024-06-25")
  className?: string; // Add className to the props
}

const PendingInvoiceCard: React.FC<PendingInvoiceCardProps> = ({
  invoiceId,
  amount,
  dueDate,
  className, // Destructure className from props
}) => {
  return (
    <WidgetCard5
      title="Pending Invoice"
      className={className} 
    >
      <div className="pending-invoice-card-details flex justify-between">
        <div className="flex flex-col items-center">
          <span className="font-bold">Invoice ID</span>
          <span>{invoiceId}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">Amount</span>
          <span>KSH {amount.toFixed(2)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">Due Date</span>
          <span>{dueDate}</span>
        </div>
      </div>
    </WidgetCard5>
  );
};

export default PendingInvoiceCard;
