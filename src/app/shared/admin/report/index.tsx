'use client';

import { Accordion, Badge, Button, FileInput, Input, Textarea } from 'rizzui';
import { useState } from 'react';
import ToastButton from '@/components/buttons/toast-button';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';
import ReportTable from '../dashboard/tables/report-table';
import AnalyzeQuotationsTable from '../dashboard/tables/quotations/analyze-quotations';
import WidgetCard3 from '@/components/cards/widget-card3';
import ProfileChunkedGrid from '../../profile-chunked-grid';
import ChunkedGrid from '../../custom-chunked-grid';
import { completeJobDetailsData } from '@/data/job-data';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import ChunkedGridActive from '../../chunked-grid-active';

const data = [
  {
    'Job No': '#A940312',
  },
  {
    Location: 'Kome,Homabay',
  },
];

const specData = [{}];

export default function ReportComponent({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id')?.toLowerCase();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="col-span-full grid items-start rounded-xl border-none border-gray-300 p-4 ">
        <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
          <Link
            href={{
              pathname: routes.admin.professionalQuotation,
              query: { jobId: queryId },
            }}
          >
            <Button as="span" className="">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add New Quotation
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          <ChunkedGridActive
            data={
              queryId === '3416'
                ? completeJobDetailsData[0]
                : completeJobDetailsData[2]
            }
            dataChunkSize={8}
            // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        </div>

        <AnalyzeQuotationsTable className="col-span-full mt-4" />

        <WidgetCard3
          title="Reason"
          rounded="lg"
          className=" mt-4"
          action={<Textarea size="sm" />}
        ></WidgetCard3>
      </div>

      {/* 
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

        <Accordion.Body></Accordion.Body>
      </Accordion> */}
      <div className="col-span-full grid">
        <ToastButton
          title="Submit"
          route={routes.admin.dashboard}
          message="Report generated successfully"
        />
      </div>
    </>
  );
}
