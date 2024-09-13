'use client';

import ActiveJobDetailsCard from '../customers-job-details';
import SpActiveJobsTable from '@/app/shared/service-provider/tables/sp-active-jobs-table/professional';
import { metaObject } from '@/config/site.config';
import { Button, Modal, Tab, Progressbar, Loader } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { routes } from '@/config/routes';
import CustomProgressBar from '@/app/shared/custom-progress-bar';
import { useState } from 'react';
import ViewAttachments from '@/app/shared/service-provider/details/request-details/view-attachments';
import { PiCheckCircle } from 'react-icons/pi';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios, { BASE_URL } from '@/lib/axios';
import Timeline from '../../commons/timeline';

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
    text: 'Wall Excavations',
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

type PageProps = {
  className: string;
  requests: any;
};

export default function JobDetailsComponent({
  className,
  requests,
}: PageProps) {
  const statusValue = requests.Status;
  const fundiTimelineData = [
    {
      title: 'Start',
      text: '',
      hightlightedText: '',
      date: 'April 15, 2024',
      time: '05:31 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
    },
    {
      title: 'Stop',
      text: '',
      hightlightedText:
        statusValue === 'approved'
          ? 'Approved'
          : statusValue === 'active'
            ? 'Ongoing'
            : 'Waiting Approval',
      date: 'April 16, 2024',
      time: '05:31 am',
      icon: (
        <PiCheckCircle
          className={`h-6 w-6 ${
            statusValue === 'approved'
              ? 'text-green'
              : statusValue === 'active'
                ? 'text-blue'
                : 'text-orange'
          }`}
        />
      ),
      status: statusValue,
    },
  ];

  const [approvalModalState, setApprovalModalState] = useState(false);
  const [status, setStatus] = useState(requests.Status);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  const handleCompleteMilestone = async () => {
    setLoading(true); // Show loader
    try {
      const updateTransactionResponse = await axios.patch(
        `${BASE_URL}/transactions/${jobId}`,
        {
          status: 'approved',
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      if (updateTransactionResponse.status === 200) {
        toast.success(<p>Request Approved... The Job is now completed.</p>);
        setStatus('approved');
        setApprovalModalState(false);
      } else {
        toast.error(<p>Something went wrong. Please try again.</p>);
      }
    } catch (error) {
      toast.error(<p>Failed to update the Job. Please try again later.</p>);
    } finally {
      setLoading(false); // Hide loader after request completes
    }
  };

  const getFileNameFromUrl = (url: string) =>
    url.substring(url.lastIndexOf('/') + 1);

  const uploadsData = requests?.Uploads || [];
  const structuredAttachments = uploadsData.map((url: string) => ({
    name: getFileNameFromUrl(url),
    url,
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
            <div className="w-full max-w-screen-lg">
              <Timeline data={fundiTimelineData} order="desc" />
            </div>
            <Modal
              isOpen={approvalModalState}
              onClose={() => setApprovalModalState(false)}
            >
              <div className="p-10">
                <p className="text-center text-lg font-semibold">
                  Do you confirm completion of this job?
                </p>
                <div className="mt-6 flex justify-center">
                  {loading ? (
                    <Loader size="sm" />
                  ) : (
                    <Button onClick={handleCompleteMilestone} className="w-32">
                      Yes
                    </Button>
                  )}
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
            <ViewAttachments attachments={structuredAttachments} />
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
                <div className="flex justify-center">
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
