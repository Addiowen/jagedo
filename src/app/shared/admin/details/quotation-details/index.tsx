'use client';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { Badge, Button } from 'rizzui';

const data = [
  {
    Location: 'Kome,Homabay',
    Status: 'Submitted',
    'Job description': 'Repair of faulty wiring system',
  },
  {
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
  },
  {
    'Deadline for  availability': '20/04/2024',
    'Start Date': '22/04/2024',
    'End Date': '30/04/2024',
  },
];

export default function QuotationDetailsCard() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <>
      <h3 className="mb-4">Quotation Details</h3>
      <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4">
        <div className='grid grid-cols-2 @xl:grid-cols-2' >
          <div>
            <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                <span className="font-semibold text-gray-900">
                  Labour quote :
                </span>
                  30,000
              </li>
              <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                <span className="font-semibold text-gray-900">
                  Material quote :
                </span>
                  80,000
              </li>
              <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                <span className="font-semibold text-gray-900">
                  Equipment & Machinery :
                </span>
                  25,000
              </li>

              <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                <span className="font-semibold text-gray-900">
                  Requisition type :
                </span>
                <span className="text-base font-semibold text-gray-900">
                  Emergency
                </span>
              </li>
              <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                <span className="font-semibold text-gray-900">
                  Requisition date :
                </span>
                13/04/2024
              </li>
              <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                <span className="font-semibold text-gray-900">
                  Requisition Number :
                </span>
                #REQ63532
              </li>



            </ul>
          </div>
          <div className='-mt-5'>
            {data.map((item, index) => (
              <ul key={index} className="mt-3 grid gap-2 @5xl:mt-0">
                {Object.entries(item).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="font-semibold text-gray-900">{key} :</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
      </div>
      </div>

      <Button onClick={handleClick} className="m-auto mt-4">
        Back
      </Button>
    </>
  );
}
