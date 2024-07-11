import { routes } from '@/config/routes';
import Link from 'next/link';
import { Badge, Button } from 'rizzui';

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
  return (
    <>
      <div className="grid gap-6 rounded-xl border border-gray-300 p-6 bg-white shadow-md @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4">
        <div className="col-span-full @5xl:col-span-1 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisition Details</h2>
          <ul className="grid gap-4">
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Requisition type:</span>
              <span className="text-base text-gray-700">Emergency</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Requisition date:</span>
              <span className="text-base text-gray-700">13/04/2024</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Requisition Number:</span>
              <span className="text-base text-gray-700">#REQ63532</span>
            </li>
          </ul>
        </div>
        {data.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <ul className="grid gap-4">
              {Object.entries(item).map(([key, value]) => (
                <li key={key} className="flex justify-between items-center">
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
          <Button className="bg-gray-500 hover:bg-gray-600 text-white">Go Back</Button>
        </Link>
        <Link href={routes.customers.generateInvoice}>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Add New</Button>
        </Link>
      </div>
    </>
  );
}
