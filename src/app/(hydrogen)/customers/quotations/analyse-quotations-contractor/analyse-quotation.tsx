'use client';

import { Accordion, Badge, Button, FileInput, Input, Text, Textarea } from 'rizzui';
import { useState } from 'react';
import ToastButton from '@/components/buttons/toast-button';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';
import ReportTable from '@/app/shared/report-table';
import AnalyzeQuotationsTable from '@/app/shared/analyze-quotations';
import WidgetCard3 from '@/components/cards/widget-card3';
import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';
import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import { completeJobDetailsData } from '@/data/job-data';
import Link from 'next/link';
import { PiArrowDown, PiPlusBold } from 'react-icons/pi';

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
  const type = searchParams.get('type')?.toLowerCase();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="col-span-full grid items-start rounded-xl border-none border-gray-300 p-0 ">
      <Accordion className="rounded-lg border border-gray-300 bg-gray-0 p-2 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl lg:p-4 xl:rounded-2xl">
        <Accordion.Header>
          <div
            onClick={handleToggle}
            className="flex w-full items-center justify-between py-2 text-xl font-semibold"
          >
            {'Project details'}
            <PiArrowDown
              className={`flex h-5 w-5 transform  transition-transform duration-300 ${
                isOpen ? 'rotate-0' : '-rotate-90'
              }`}
            />
          </div>
        </Accordion.Header>

        <Accordion.Body>
        <div className="mt-4">
          <ChunkedGrid
            data={
              type === '3416'
                ? completeJobDetailsData[1]
                : completeJobDetailsData[2]
            }
            dataChunkSize={8}
            // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        </div>
        </Accordion.Body>
      </Accordion>
      <AnalyzeQuotationsTable className="col-span-full mt-4" />
        <WidgetCard3
          title="Reason"
          rounded="lg"
          className="mb-4 mt-4"
          action={<Text>I highly recommend the above quote for the specified job</Text>}
        ></WidgetCard3>
      </div>
    </>
  );
}
