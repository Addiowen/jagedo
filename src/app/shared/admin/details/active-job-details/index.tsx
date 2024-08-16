'use client';

import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import CustomerDetailsCard from '@/app/shared/logistics/dashboard/cutomer-details';
// import UploadZone from '@/components/ui/file-upload/upload-zone';
// import { routes } from '@/config/routes';
// import { useRouter } from 'next/navigation';
// import { PiTrashDuotone, PiUpload } from 'react-icons/pi';
// import { Badge, Button } from 'rizzui';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { Accordion, Button, Tab } from 'rizzui';
import { activeJobDetailsData, completeJobDetailsData } from '@/data/job-data';
import FundiDetailsCard from '@/app/shared/logistics/dashboard/fundi-details';
import ChunkedGridActive from '@/app/shared/chunked-grid-active';
import ActiveJobDetailsAttachments from '../../add-attachments';
import ProgressBarActive from '../../progress-bar-admin';
import Link from 'next/link';
import { routes } from '@/config/routes';

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

export default function ActiveJobDetailsCard() {
  // const router = useRouter();
  const searchParams = useSearchParams();

  const jobId = searchParams.get('id');

  const [isOpen, setIsOpen] = useState(false);

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
            <ProgressBarActive />

            <div className="col-span-full">
              <ActiveJobDetailsAttachments />
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
                data={
                  jobId === '2000'
                    ? completeJobDetailsData[0]
                    : jobId === '2002'
                      ? completeJobDetailsData[1]
                      : jobId === '3024'
                        ? completeJobDetailsData[2]
                        : jobId === '3034'
                          ? completeJobDetailsData[3]
                          : jobId === '3225'
                            ? completeJobDetailsData[5]
                            : jobId === '3332'
                              ? completeJobDetailsData[6]
                              : completeJobDetailsData[0]
                }
                dataChunkSize={8}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
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
