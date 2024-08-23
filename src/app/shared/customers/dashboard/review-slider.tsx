// components/InvoiceList.tsx
import React from 'react';

import WidgetCard from '@/components/cards/widget-card';

interface InvoiceCardProps {
  jobId: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paidAt: string | null;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  jobId,
  amount,
  status,
  paidAt,
}) => {
  return (
    <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold">Job ID: {jobId}</span>
        <span
          className={`rounded px-2 py-1 text-sm font-semibold ${
            status === 'Paid'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Amount: KSH {amount}</span>
        {status === 'Paid' && paidAt && (
          <span className="rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">
            {/* {formatDistanceToNow(new Date(paidAt))} ago */}
          </span>
        )}
      </div>
    </div>
  );
};

interface Invoice {
  jobId: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paidAt: string | null;
}

const InvoiceList: React.FC = () => {
  const invoices: Invoice[] = [
    {
      jobId: '#J12645',
      amount: 5000,
      status: 'Paid',
      paidAt: '2024-07-08T12:34:56Z',
    },
    { jobId: '#J17346', amount: 7000, status: 'Pending', paidAt: null },
    {
      jobId: '#J18847',
      amount: 8000,
      status: 'Paid',
      paidAt: '2024-07-08T14:00:00Z',
    },
    // Add more invoices here
  ];

  return (
    <div className="rounded-lg border border-gray-300 p-4 @container">
      <h1 className="mb-4 text-2xl font-semibold">Invoices</h1>
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.jobId} {...invoice} />
      ))}
    </div>
  );
};

export default InvoiceList;
