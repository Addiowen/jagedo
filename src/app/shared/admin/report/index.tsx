'use client';

import {
  Accordion,
  Badge,
  Button,
  FileInput,
  Input,
  Modal,
  Textarea,
} from 'rizzui';
import { useState } from 'react';
import ToastButton from '@/components/buttons/toast-button';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';
import AnalyzeQuotationsTable from '../dashboard/tables/quotations/analyze-quotations';
import WidgetCard3 from '@/components/cards/widget-card3';
import { requestDetails } from '@/data/job-data';
import Link from 'next/link';
import { PiArrowDown, PiDownloadDuotone, PiPlusBold } from 'react-icons/pi';
import ChunkedGrid from '../../custom-chunked-grid';

export default function ReportComponent({
  className,
  requestDetails,
  quotations,
  bookingRequests,
}: {
  className?: string;
  requestDetails: any;
  quotations: any;
  bookingRequests: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

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
                {
                  <ChunkedGrid
                    data={requestDetails}
                    dataChunkSize={8}
                    attachementsDetails={requestDetails} // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  />
                }
              </div>
            </Accordion.Body>
          </Accordion>
        </div>

        <AnalyzeQuotationsTable
          bookingRequests={bookingRequests}
          quotations={quotations}
          className="col-span-full mt-4"
        />
      </div>
    </>
  );
}
