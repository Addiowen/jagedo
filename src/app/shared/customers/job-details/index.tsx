'use client';

import ActiveJobDetailsCard from '../customers-job-details';
import SpActiveJobsTable from '@/app/shared/service-provider/tables/sp-active-jobs-table/professional';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { metaObject } from '@/config/site.config';
import { Button, Modal, Tab, Progressbar } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { routes } from '@/config/routes';
import CustomProgressBar from '@/app/shared/custom-progress-bar';
import { useState } from 'react';
import ActiveJobDetailsAttachments from '@/app/shared/add-attachments';
import ActiveJobDetailsViewAttachments from '@/app/shared/view-attachments';
import ViewAttachmentsBlock from '@/app/shared/create-quotation/view-attachments-block';
import { PiCheckCircle } from 'react-icons/pi';
import { useParams, useSearchParams } from 'next/navigation';
import Timeline from '@/app/shared/service-provider/progress-bar-fundi/timeline';
import ViewAttachments from '../../service-provider/details/request-details/view-attachments';

const timelineData = [
  {
    title: 'Start',
    text: '',
    hightlightedText: '',
    date: 'April 29, 2023',
    time: '05:31 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Milestone 1',
    text: 'Wall Escavations',
    hightlightedText: '',
    date: 'May 02, 2023',
    time: '09:00 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Milestone 2',
    text: 'Reinforcements',
    hightlightedText: '',
    date: 'May 02, 2023',
    time: '11:00 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Stop',
    text: '',
    hightlightedText: '',
    date: 'May 29, 2023',
    time: '05:31 am',
    icon: '',
    status: '',
  },
];

const fundiTimelineData = [
  {
    title: 'Start',
    text: '',
    hightlightedText: '',
    date: 'April 29, 2023',
    time: '05:31 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },

  {
    title: 'Stop',
    text: '',
    hightlightedText: '',
    date: 'May 29, 2023',
    time: '05:31 am',
    icon: '',
    status: '',
  },
];

type PageProps = {
  className: string;
  requests: any;
  // other props as needed
};

export default function JobDetailsComponent({
  className,
  requests,
}: PageProps) {
  const [approvalModalState, setApprovalModalState] = useState(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const uploadsData = requests.Uploads;

  const structuredAttachments = uploadsData.map((url: string) => ({
    name: getFileNameFromUrl(url),
    url: url,
  }));

  return (
    <>
      <Tab>
        <Tab.List>
          <Tab.ListItem>Progress Tracker</Tab.ListItem>
          <Tab.ListItem>Project Details</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="flex justify-end">
              <Button
                className="mr-4"
                onClick={() => setApprovalModalState(true)}
              >
                Confirm Job Completed
              </Button>
            </div>
            {/* <div className="">
              <ProgressBarActive />
            </div> */}
            <div className="w-full max-w-screen-lg">
              <Timeline data={fundiTimelineData} order="desc" />
            </div>

            {/* <ActiveJobDetailsViewAttachments /> */}
            <ViewAttachments attachments={structuredAttachments} />
            <Modal
              isOpen={approvalModalState}
              onClose={() => setApprovalModalState(false)}
            >
              <div className="p-10">
                <p className="text-center text-lg font-semibold">
                  Do you confirm completion of this job?
                </p>

                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => setApprovalModalState(false)}
                    className="w-32"
                  >
                    Yes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setApprovalModalState(false)}
                    className="ml-4 w-32"
                  >
                    No
                  </Button>
                </div>
              </div>
            </Modal>
          </Tab.Panel>

          <Tab.Panel>
            <div
              className={cn(
                'xl:gap-15 grid w-full grid-cols-1 lg:grid-cols-1',
                className
              )}
            >
              <div className="col-span-2">
                <ActiveJobDetailsCard transactionDetails={requests} />

                <div className="flex  justify-center">
                  <Link href={routes.customers.active}>
                    <Button className="mt-6">Back</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </>
  );
}
