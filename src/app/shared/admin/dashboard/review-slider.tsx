// components/InvoiceList.tsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import WidgetCard from '@/components/cards/widget-card';

interface InvoiceCardProps {
  jobId: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paidAt: string | null;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ jobId, amount, status, paidAt }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">Job ID: {jobId}</span>
        <span
          className={`text-sm font-semibold px-2 py-1 rounded ${
            status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Amount: KSH {amount}</span>
        {status === 'Paid' && paidAt && (
          <span className="text-sm font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
            {formatDistanceToNow(new Date(paidAt))} ago
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
    { jobId: '12345', amount: 5000, status: 'Paid', paidAt: '2024-07-08T12:34:56Z' },
    { jobId: '12346', amount: 7000, status: 'Pending', paidAt: null },
    { jobId: '12347', amount: 8000, status: 'Paid', paidAt: '2024-07-08T14:00:00Z' },
    // Add more invoices here
  ];

  return (
    <WidgetCard>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Invoices</h1>
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.jobId} {...invoice} />
      ))}
    </div>
    </WidgetCard>
  );
};

export default InvoiceList;
