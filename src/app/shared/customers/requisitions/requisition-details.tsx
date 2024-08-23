'use client';

import { routes } from '@/config/routes';
import Link from 'next/link';
import { Badge, Button } from 'rizzui';
import { useSearchParams } from 'next/navigation';

const data = [
  {
    Location: 'Ruiru, Nairobi',
    Status: 'Submitted',
    'Job description': 'Repair of faulty wiring system',
  },
  {
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
  },
  {
    'Deadline for availability': '20/04/2024',
    'Start Date': '22/04/2024',
    'End Date': '30/04/2024',
  },
];

export default function ViewRequisition() {
  const params = useSearchParams();
  const requestType = params.get('type');
  return (
    <>
      <div className="grid gap-6 rounded-xl border border-gray-300 bg-white p-6 shadow-md @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4">
        <div className="col-span-full mb-6 @5xl:col-span-1">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Requisition Details
          </h2>
          <ul className="grid gap-4">
            <li className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                Requisition type:
              </span>
              <span className="text-base text-gray-700">{requestType}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                Requisition date:
              </span>
              <span className="text-base text-gray-700">13/04/2024</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                Requisition Number:
              </span>
              <span className="text-base text-gray-700">#REQ63532</span>
            </li>
          </ul>
        </div>
        {data.map((item, index) => (
          <div key={index} className="rounded-lg bg-gray-50 p-4 shadow-sm">
            <ul className="grid gap-4">
              {Object.entries(item).map(([key, value]) => (
                <li key={key} className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{key}:</span>
                  <span className="text-base text-gray-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <Link href={routes.customers.requisitions}>
          <Button className="bg-gray-500 text-white hover:bg-gray-600">
            Go Back
          </Button>
        </Link>
        <Link href={routes.customers.generateInvoice}>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Add New
          </Button>
        </Link>
      </div>
    </>
  );
}
