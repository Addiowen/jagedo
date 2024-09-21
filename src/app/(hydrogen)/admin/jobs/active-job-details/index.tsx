'use client';

import ActiveJobDetailsCard from '@/app/shared/admin/details/active-job-details';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { Button, Loader, Modal, Progressbar } from 'rizzui';
import cn from '@/utils/class-names';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios, { BASE_URL } from '@/lib/axios';

// export const metadata = {
//   ...metaObject(),
// };

type PageProps = {
  className: string;
  requestDetails: any;
  fundiDetails: any;
  // other props as needed
};

export default function ActiveJobDetails({
  className,
  requestDetails,
  fundiDetails,
}: PageProps) {
  const [modalState, setModalState] = useState(false);
  const [approvalModalState, setApprovalModalState] = useState(false);
  const [status, setStatus] = useState(requestDetails.Status);
  const [loading, setLoading] = useState(false);

  const getparams = useSearchParams();
  const jobId = getparams.get('id');

  console.log(requestDetails.Status);

  const handleCompleteMilestone = async () => {
    setLoading(true); // Show loader
    try {
      const updateTransactionResponse = await axios.patch(
        `${BASE_URL}/transactions/${jobId}`,
        {
          status: 'approved',
          metadata: {
            reviewCount: 0,
          },
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
        setModalState(false);
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

  return (
    <>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-10">
          <p className="text-center text-lg font-semibold">
            Do you confirm completion of this milestone?
          </p>
          {/* {/ <Button>Yes</Button> /} */}

          <div className="mt-6 flex justify-center">
            {loading ? (
              <Loader size="sm" />
            ) : (
              <Button onClick={handleCompleteMilestone} className="w-32">
                Yes
              </Button>
            )}
            {/* {/ <Link href={routes.serviceProvider.contractor.requisitions}> /} */}
            <Button
              variant="outline"
              onClick={() => setModalState(false)}
              className="ml-4 w-32"
            >
              No
            </Button>
            {/* {/ </Link> /} */}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={approvalModalState}
        onClose={() => setApprovalModalState(false)}
      >
        <div className="p-10">
          <p className="text-center text-lg font-semibold">
            Do you approve completion of this milestone?
          </p>
          {/* {/ <Button>Yes</Button> /} */}

          <div className="mt-6 flex justify-center">
            {loading ? (
              <Loader size="sm" />
            ) : (
              <Button onClick={handleCompleteMilestone} className="w-32">
                Yes
              </Button>
            )}

            {/* {/ <Link href={routes.serviceProvider.contractor.requisitions}> /} */}
            <Button
              variant="outline"
              onClick={() => setApprovalModalState(false)}
              className="ml-4 w-32"
            >
              No
            </Button>
            {/* {/ </Link> /} */}
          </div>
        </div>
      </Modal>

      <div className="flex justify-between">
        <h3 className="mb-4">{`JOB #${jobId?.toLocaleUpperCase()}`}</h3>

        {/* Conditionally render the buttons if requestDetails.Status is not 'approved' */}
        {requestDetails.Status !== 'approved' && (
          <div>
            <Button
              className="mr-4"
              onClick={() => setApprovalModalState(true)}
            >
              Approve Completion
            </Button>

            <Button
              onClick={() => setModalState(true)}
              disabled={requestDetails.Status === 'pending approval'}
            >
              Complete Milestone
            </Button>
          </div>
        )}
      </div>

      <div
        className={cn('xl:gap-15 grid grid-cols-1 lg:grid-cols-1', className)}
      >
        <ActiveJobDetailsCard
          statusValue={status}
          requestDetails={requestDetails}
        />
      </div>
    </>
  );
}
