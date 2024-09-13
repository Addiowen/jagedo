'use client';

import ActiveJobDetailsCard from '@/app/shared/service-provider/details/sp-job-details';
import { Button, Loader, Modal, Tab } from 'rizzui';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { useState } from 'react';
// import ActiveJobDetailsAttachments from '@/app/shared/service-provider/details/sp-job-details/attachments';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import FundiActiveJobDetailsAttachments from '@/app/shared/service-provider/details/sp-job-details/fundi-attachments';
import ViewAttachments from '../details/request-details/view-attachments';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';

// export const metadata = {
//     ...metaObject(),
//   };

type PageProps = {
  className: string;
  jobs: any;
};

export default function SpActiveJobComponent({ className, jobs }: PageProps) {
  const [modalState, setModalState] = useState(false);
  const [status, setStatus] = useState(jobs.status);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  const [loading, setLoading] = useState(false);

  const handleBackBtn = () => router.back();
  const handleCompleteMilestone = async () => {
    setLoading(true); // Show loader
    try {
      const updateTransactionResponse = await axios.patch(
        `${BASE_URL}/transactions/${jobId}`,
        {
          status: 'pending approval',
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      if (updateTransactionResponse.status === 200) {
        toast.success(<p>Request Sent... Awaiting approval.</p>);
        setStatus('pending approval');
        setModalState(false);
      } else {
        toast.error(<p>Something went wrong. Please try again.</p>);
      }
    } catch (error) {
      toast.error(<p>Approval Request Failed. Please try again later.</p>);
    } finally {
      setLoading(false); // Hide loader after request completes
    }
  };

  console.log(jobs);

  const request = {
    Category: 'Fundi',
    'Sub-Category': jobs.metadata.skill,
    'Request Type': jobs.metadata.packageType,
    County: jobs.metadata.county,
    'Sub-County': jobs.metadata.subCounty,
    'Estate/Village': jobs.metadata.village,
    'Request Date': jobs.startDate,
    Status: jobs.status,
    'Start Date': jobs.startDate,
    'End Date': jobs.endDate,
    'Invoice Number': jobs.id.toUpperCase(),
    'Payment Status': jobs.status,
    Amount: jobs.metadata.linkageFee,
    Uploads: jobs.metadata.uploads,
  };

  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  console.log(status);

  const uploadsData = request.Uploads;

  const structuredAttachments = uploadsData.map((url: string) => ({
    name: getFileNameFromUrl(url),
    url: url,
  }));

  return (
    <>
      <div className="flex justify-between">
        <h3 className="mb-4">JOB # {jobId?.toUpperCase()}</h3>
        <div className="">
          {status !== 'approved' && status !== 'pending approval' && (
            <Button onClick={handleCompleteMilestone}>Complete Job</Button>
          )}
        </div>
      </div>

      <div
        className={cn('xl:gap-15 grid grid-cols-1 lg:grid-cols-1', className)}
      >
        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
          <div className="p-10">
            <p className="text-center text-lg font-semibold">
              Do you confirm completion of this milestone?
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
                onClick={() => setModalState(false)}
                className="ml-4 w-32"
              >
                No
              </Button>
            </div>
          </div>
        </Modal>

        <Tab>
          <Tab.List>
            <Tab.ListItem>Progress Tracker</Tab.ListItem>
            <Tab.ListItem>Project Details</Tab.ListItem>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <ProgressBarActive statusValue={status} />
              <ViewAttachments attachments={structuredAttachments} />
            </Tab.Panel>
            <Tab.Panel>
              <ActiveJobDetailsCard requestDetails={request} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab>

        <div className="flex  justify-center">
          <Button className="mt-6" onClick={handleBackBtn}>
            Back
          </Button>
        </div>
      </div>
    </>
  );
}
