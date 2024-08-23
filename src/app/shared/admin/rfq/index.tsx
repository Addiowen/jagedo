'use client';

import WidgetCard from '@/components/cards/widget-card';
import { Accordion, Badge, FileInput } from 'rizzui';
import BillofQuotationsTable from '../dashboard/tables/bill-of-quantity';
import DisbursementTable from '../dashboard/tables/disbursements';
import { Collapse } from 'rizzui';
import { PiArrowDown, PiArrowDownDuotone } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { useState } from 'react';
import ToastButton from '@/components/buttons/toast-button';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';

const data = [
  {
    'Job No': '#A940312',
  },
  {
    Location: 'Kome,Homabay',
  },
];

const specData = [{}];

export default function RFQCard({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get('type')?.toLowerCase();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="grid items-start rounded-xl border border-gray-300 p-2 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-5 @5xl:grid-cols-4">
        <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">
              Name of Service Provider :
            </span>
            <span className="text-base text-gray-900"> </span>
          </li>
          <li className="flex items-center gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">
              Job Description :
            </span>
            Drilling of 4No boreholes
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Deadline :</span>
            3/3/2024
          </li>
        </ul>
        {data.map((item, index) => (
          <ul key={index} className="ml-auto mt-6 grid gap-2 @5xl:mt-0">
            {Object.entries(item).map(([key, value]) => (
              <li key={key} className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{key} :</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="grid items-start rounded-xl border border-gray-300 p-4 ">
        <span className="mb-2 font-semibold text-gray-900">
          Site Conditions
        </span>
        <span className="mb-2  text-gray-900">
          Plot of land is on a relatively low-lying flat riparian land with
          black cotton soil.
        </span>
        <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Specifications:</span>
            <span className=" text-gray-900">
              Drilling and Construction of 4No. boreholes
            </span>
          </li>
          <ul className="flex flex-col gap-1 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
            <li className="font-semibold text-gray-900">Scope of works:</li>
            <li>1. Drilling</li>
            <li>2. Flush</li>
            <li>3. Construction and development</li>
          </ul>

          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className=" text-gray-900">
              Please see an attached hydrogeological report
            </span>
          </li>
        </ul>
        <div className="mb-4 mt-4">
          <FileInput label="Add Attachments" />
        </div>
      </div>

      <div className="grid items-start rounded-xl border border-gray-300 p-4 ">
        <h3 className="mb-2">Note:</h3>
        <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="text-gray-900">
              1. JaGedo charges 30% commission on all Professional Fees
              (Inclusive of professional fees quoted);
            </span>
          </li>
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="text-gray-900">
              2. Disbursement of professional fees is as per JaGedo,
              Professional agreement;
              <ul className="flex flex-col gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
                <li className="ml-4 pt-2">
                  a. 50% after Draft Review (after two reviews): 2 revisions;g
                </li>
                <li className="ml-4">
                  b. 50% after Final Design; (after 3rd review)
                </li>
              </ul>
            </span>
          </li>
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="text-gray-900">
              3. Rates should be inclusive of relevant local taxes;
            </span>
          </li>
        </ul>
      </div>

      <div className=" grid items-start rounded-xl border border-gray-300 p-4">
        <div className="mb-4">
          <FileInput label="Bill of Quantity" />
        </div>
        <BillofQuotationsTable />
      </div>

      <Accordion>
        <Accordion.Header>
          <div
            onClick={handleToggle}
            className="flex w-full items-center justify-between py-5 text-xl font-semibold"
          >
            {'Note'}
            <PiArrowDown
              className={`flex h-5 w-5 transform  transition-transform duration-300 ${
                isOpen ? 'rotate-0' : '-rotate-90'
              }`}
            />
          </div>
        </Accordion.Header>

        <Accordion.Body>
          <DisbursementTable />
          {type === 'self' && (
            <h3>
              *Please be advised that for this job, the customer will manage the
              works
            </h3>
          )}
        </Accordion.Body>
      </Accordion>

      <ToastButton title="Add to Report" route={routes.admin.generateReport} />
    </>
  );
}
