'use client';

import { AdvancedCheckbox, Button, Modal, Tooltip } from 'rizzui';
import { useState } from 'react';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import CompletedJobDetails from '@/app/shared/admin/dashboard/jobs/completed/view-job-details';
import ReviewCard from '@/app/shared/custom-reviews/review-card-view';
import { useSearchParams } from 'next/navigation';
import { PiUserCircleDuotone } from 'react-icons/pi';
import ToastButton from '@/components/buttons/toast-button';
import CustomerDetails from '@/app/shared/admin/dashboard/tables/requisitions/requisition-details/customer-details';
import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import ReviewForm from '@/app/shared/custom-reviews/review-form';
import CustomerDetailsCard from '@/app/shared/logistics/dashboard/cutomer-details';
import { completeJobDetailsData, jobData } from '@/data/job-data';
import FundiDetailsCard from '@/app/shared/logistics/dashboard/fundi-details';
import ChunkedGridActive from '@/app/shared/chunked-grid-active';

// const data = [
//     {
//       'Job No': '#A940312',
//     },
//     {
//       Location: 'Kome,Homabay',
//     },
//   ];

const reviewsData = [
  {
    reviewer: { name: 'Floyd Wangari' },
    date: new Date(),
    message: 'Did a good job fixing the wiring',
    role: 'Admin',
  },
  {
    reviewer: { name: 'Joyce Wasike' },
    date: new Date(),
    message: 'Did a good job fixing the wiring',
    role: 'Customer',
  },
];

export default function FundiCompleteJobDetails() {
  const [modalState, setModalState] = useState(false);
  const [viewReviewsModalState, setViewReviewsModalState] = useState(false);
  const [requestReviewsModalState, setRequestReviewsModalState] =
    useState(false);

  const searchParams = useSearchParams();

  const jobId = searchParams.get('id');

  return (
    <div>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-10">
          <ReviewForm />
        </div>
      </Modal>

      <Modal
        isOpen={viewReviewsModalState}
        onClose={() => setViewReviewsModalState(false)}
      >
        <div className="p-10">
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={index}
              reviewer={review?.reviewer}
              message={review?.message}
              date={review?.date}
              role={review?.role}
            />
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={requestReviewsModalState}
        onClose={() => setRequestReviewsModalState(false)}
      >
        <div className="p-10">
          <div className="mb-6 text-center text-lg font-semibold text-gray-900">
            Request review from?
          </div>
          <div className="text-center">Select one or more</div>
          <div className="mt-4 flex justify-center">
            <AdvancedCheckbox
              name="user"
              value="customer"
              className="mr-4"
              defaultChecked
            >
              <PiUserCircleDuotone className="mb-4 h-8 w-8" />
              <p className="font-semibold">Customer</p>
            </AdvancedCheckbox>

            <AdvancedCheckbox name="user" value="admin">
              <PiUserCircleDuotone className="mb-4 h-8 w-8" />
              <p className="font-semibold">Admin</p>
            </AdvancedCheckbox>
          </div>
          <div className="mt-6 flex justify-center">
            {/* <ToastButton
                            title="Submit"
                            route='#'
                            message="Review Requested"
                        /> */}
            <Button onClick={() => setRequestReviewsModalState(false)}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      <CustomerDetailsCard />

      <div className="mb-4 mt-4">
        <ChunkedGridActive
          data={
            jobId === '3324'
              ? completeJobDetailsData[0]
              : completeJobDetailsData[1]
          }
          dataChunkSize={8}
          // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>

      <FundiDetailsCard />

      <div className="mt-6 flex justify-center">
        <Button className="">Download Report</Button>

        <Button onClick={() => setModalState(true)} className="ml-4">
          Add Review
        </Button>

        {jobId === '3324' ? (
          <Button
            onClick={() => setViewReviewsModalState(true)}
            className="ml-4"
          >
            View Reviews
          </Button>
        ) : jobId === '3325' ? (
          <Button
            onClick={() => setRequestReviewsModalState(true)}
            className="ml-4"
          >
            Request Review
          </Button>
        ) : (
          <Button
            onClick={() => setViewReviewsModalState(true)}
            className="ml-4"
          >
            View Reviews
          </Button>
        )}
      </div>
    </div>
  );
}
