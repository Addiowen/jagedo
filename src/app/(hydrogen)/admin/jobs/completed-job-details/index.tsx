'use client';

import { AdvancedCheckbox, Button, Modal, Tab, Tooltip } from 'rizzui';
import { useState } from 'react';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import ReviewCard from '@/app/shared/custom-reviews/review-card-view';
import { useRouter, useSearchParams } from 'next/navigation';
import { PiUserCircleDuotone } from 'react-icons/pi';
import ReviewForm from '@/app/shared/custom-reviews/review-form';
import CustomerDetailsCard from '@/app/shared/admin/jobs/cutomer-details';
import { completeJobDetailsData } from '@/data/job-data';
import FundiDetailsCard from '@/app/shared/admin/jobs/fundi-details';
import ProgressBarActive from '@/app/shared/admin/progress-bar-admin';
import Link from 'next/link';
import { routes } from '@/config/routes';
import CompleteJobDetailsAttachments from '@/app/shared/commons/completed-attachments';
import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import ViewAttachments from '@/app/shared/service-provider/details/request-details/view-attachments';

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
    role: 'Fundi',
  },
  {
    reviewer: { name: 'Joyce Wasike' },
    date: new Date(),
    message: 'Did a good job fixing the wiring',
    role: 'Customer',
  },
];

export default function SpCompleteJobDetails({
  requestDetails,
}: {
  requestDetails: any;
}) {
  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const uploadsData = requestDetails.Uploads;

  const structuredAttachments = uploadsData.map((url: string) => ({
    name: getFileNameFromUrl(url),
    url: url,
  }));
  const [modalState, setModalState] = useState(false);
  const [status, setStatus] = useState(requestDetails.Status);

  const [viewReviewsModalState, setViewReviewsModalState] = useState(false);
  const [requestReviewsModalState, setRequestReviewsModalState] =
    useState(false);

  const searchParams = useSearchParams();

  const jobId = searchParams.get('id');
  const querystatus = searchParams.get('status');
  const router = useRouter();

  const handleBack = () => router.back();

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
              <p className="font-semibold">Fundi</p>
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

      <h3>JOB# {jobId}</h3>

      <Tab>
        <Tab.List>
          <Tab.ListItem>Progress Tracker</Tab.ListItem>
          <Tab.ListItem>Project Details</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProgressBarActive statusValue={status} />
            <div className="col-span-full">
              <ViewAttachments attachments={structuredAttachments} />
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <CustomerDetailsCard />

            <div className="mb-4 mt-4">
              <ChunkedGrid
                data={requestDetails}
                dataChunkSize={8}
                attachementsDetails={requestDetails} // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              />
            </div>

            <FundiDetailsCard />

            <div className="mt-6 flex justify-center">
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
                <></>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>

      <div className="flex justify-center">
        <Button className="px-8" onClick={handleBack} type="submit">
          Back
        </Button>

        {querystatus === 'Unreviewed' && (
          <Link href={routes.admin.addReview}>
            <Button className="ml-4" type="submit">
              Add Review
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
