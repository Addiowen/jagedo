'use client';

import { AdvancedCheckbox, Button, Modal, Tooltip } from 'rizzui';
import { useState } from 'react';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import ReviewForm from '@/app/shared/custom-reviews/review-form';
import UserDetailsCard from '@/app/shared/custom-user-details-card';
import ChunkedGrid from '@/app/shared/commons/custom-chunked-grid';
import { completeJobDetailsData } from '@/data/custom-job-details-data';
import ReviewCard from '@/app/shared/custom-reviews/review-card-view';
import { useSearchParams } from 'next/navigation';
import { PiUserCircleDuotone } from 'react-icons/pi';

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

      <UserDetailsCard />

      <div className="mb-4 mt-4">
        <ChunkedGrid
          data={
            jobId === 'JOB0021'
              ? completeJobDetailsData[0]
              : completeJobDetailsData[1]
          }
          dataChunkSize={4}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>

      {/* <div className="grid items-start rounded-xl border border-gray-300 p-2 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-5 @5xl:grid-cols-4">
                <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">
                    Name of Service Provider :
                    </span>
                    <span className="text-base text-gray-900"> </span>
                </li>
                <li className="flex items-center gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">
                    Job Description :
                    </span>
                    Drilling of 4No boreholes
                </li>
                <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">Close Date :</span>
                    3/3/2024
                </li>
                </ul>
                {data.map((item, index) => (
                <ul key={index} className="ml-auto mt-6 grid gap-2 @5xl:mt-0">
                    {Object.entries(item).map(([key, value]) => (
                    <li key={key} className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{key} :</span>
                        <span>{value}</span>
                    </li>
                    ))}
                </ul>
                ))}
            </div>

            <div className="grid items-start rounded-xl border border-gray-300 p-4 mt-6">
                <span className="mb-2 font-semibold text-gray-900">
                Site Conditions
                </span>
                <span className="mb-2  text-gray-900">
                Plot of land is on a relatively low-lying flat riparian land with
                black cotton soil.
                </span>
                <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">Specifications:</span>
                    <span className=" text-gray-900">
                    Drilling and Construction of 4No. boreholes
                    </span>
                </li>
                <ul className="flex flex-col gap-1 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
                    <li className="font-semibold text-gray-900">Scope of works:</li>
                    <li>1. Drilling</li>
                    <li>2. Flush</li>
                    <li>3. Construction and development</li>
                </ul>

                <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                    <span className=" text-gray-900">
                    Please see an attached hydrogeological report
                    </span>
                </li>
                </ul>
                <div className="mb-4 mt-4">
                <FileInput label="Add Attachments" />
                </div>
            </div> */}

      <div className="mt-6 flex justify-center">
        <Button className="">Download Report</Button>

        <Button onClick={() => setModalState(true)} className="ml-4">
          Add Review
        </Button>

        {jobId === 'JOB0021' ? (
          <Button
            onClick={() => setViewReviewsModalState(true)}
            className="ml-4"
          >
            View Reviews
          </Button>
        ) : jobId === 'JOB0020' ? (
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
