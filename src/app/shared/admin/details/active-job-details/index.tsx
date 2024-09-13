'use client';

import CustomerDetailsCard from '../../jobs/cutomer-details';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Accordion, Button, Tab } from 'rizzui';
import { activeJobDetailsData, completeJobDetailsData } from '@/data/job-data';
import FundiDetailsCard from '../../jobs/fundi-details';
import ProgressBarActive from '../../progress-bar-admin';
import Link from 'next/link';
import { routes } from '@/config/routes';
import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import ViewAttachments from '@/app/shared/service-provider/details/request-details/view-attachments';

// const data = [
//   {
//     'Requisition Type': 'Standard',
//     'Requisition Date': '13/04/2024',
//     'Requisition Number': '#REQ63532',
//     Location: 'Kome,Homabay',
//     Status: 'Submitted',
//     'Job description': 'Repair of faulty wiring system',
//   },
//   {
//     'Invoice Number': '#3454',
//     'Payment Status': 'Paid',
//     'Deadline for  availability': '20/04/2024',
//     'Start Date': '22/04/2024',
//     'End Date': '30/04/2024',
//   },
// ];

export default function ActiveJobDetailsCard({
  requestDetails,
  statusValue,
}: {
  requestDetails: any;
  statusValue: string;
}) {
  // const router = useRouter();
  const searchParams = useSearchParams();

  const jobId = searchParams.get('id');

  const [isOpen, setIsOpen] = useState(false);

  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const uploadsData = requestDetails.Uploads;

  const structuredAttachments = uploadsData.map((url: string) => ({
    name: getFileNameFromUrl(url),
    url: url,
  }));

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  // const handleClick = () => {
  //   router.push(routes.serviceProvider.fundi.activeJobs);
  // };

  return (
    <>
      <Tab>
        <Tab.List>
          <Tab.ListItem>Progress Tracker</Tab.ListItem>
          <Tab.ListItem>Project Details</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProgressBarActive statusValue={statusValue} />

            <div className="col-span-full">
              <ViewAttachments attachments={structuredAttachments} />
            </div>
            <div className="flex  justify-center">
              <Link href={routes.admin.active}>
                <Button className="mt-6">Back</Button>
              </Link>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mb-4">
              <CustomerDetailsCard />
            </div>

            <div className="mb-4">
              <ChunkedGrid
                data={requestDetails}
                dataChunkSize={8}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
                attachementsDetails={requestDetails}
              />
            </div>

            {/* Fundi Job Details */}

            <div className="mb-4">
              <FundiDetailsCard />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </>
  );
}
