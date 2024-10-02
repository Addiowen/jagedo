'use client';

import ActiveJobDetailsCard from '@/app/shared/admin/details/active-job-details';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { Button, Loader, Modal, Progressbar } from 'rizzui';
import cn from '@/utils/class-names';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios, { BASE_URL } from '@/lib/axios';
import { PiCheckCircle, PiCheckCircleFill } from 'react-icons/pi';

// export const metadata = {
//   ...metaObject(),
// };

type PageProps = {
  className: string;
  requestDetails: any;
  fundiDetails: any;
  totalAmount: number;
  customerRequest: any;

  // other props as needed
};

export default function ActiveJobDetails({
  className,
  customerRequest,
  requestDetails,
  fundiDetails,
  totalAmount,
}: PageProps) {
  const [modalState, setModalState] = useState(false);
  const [approvalModalState, setApprovalModalState] = useState(false);
  const [status, setStatus] = useState(requestDetails.Status);
  const [loading, setLoading] = useState(false);
  const [completedIndex, setCompletedIndex] = useState(0);

  const getparams = useSearchParams();
  const jobId = getparams.get('id');

  const category = requestDetails.Category;
  console.log(requestDetails.Status);
  console.log(customerRequest);

  const getTimelineData = (amount: number) => {
    // Determine the number of milestones based on the amount
    let milestones = 0;
    if (amount < 1000000) {
      milestones = 2;
    } else if (amount >= 1000000 && amount <= 6000000) {
      milestones = 3;
    } else if (amount > 6000000) {
      milestones = 4;
    }

    // Start with the initial data
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
    ];

    // Dynamically add the milestones
    for (let i = 1; i <= milestones; i++) {
      timelineData.push({
        title: `Milestone ${i}`,
        text: '',
        hightlightedText: '',
        date: `May 0${i + 1}, 2023`, // Adjust dates as per your logic
        time: `${9 + i}:00 am`,
        icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
        status: 'ongoing',
      });
    }

    // Add the stop point
    timelineData.push({
      title: 'Stop',
      text: '',
      hightlightedText: '',
      date: 'May 29, 2023',
      time: '05:31 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
    });

    return timelineData;
  };

  const initialTimelineData = getTimelineData(totalAmount);

  const [timelineData, setTimelineData] = useState(initialTimelineData || []);

  const handleCompleteMilestone = async () => {
    setLoading(true); // Show loader

    if (category === 'professional') {
      try {
        // Send the entire updated timeline data to the backend
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
          setModalState(false);
          setApprovalModalState(false);
        } else {
          toast.error(<p>Something went wrong. Please try again.</p>);
        }
      } catch (error) {
        console.error('Error updating milestone:', error);
        setLoading(false);
      }
    } else if (category === 'fundi') {
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
        {status !== 'approved' && (
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
          totalAmount={totalAmount}
          key={status} // Forces re-render when status changes
          statusValue={status}
          requestDetails={requestDetails}
        />
      </div>
    </>
  );
}
