'use client';

import { AdvancedCheckbox, Button, Modal, Tooltip, Tab } from 'rizzui';
// import { useState } from 'react';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
// import ReviewForm from "@/app/shared/custom-reviews/review-form";
// import UserDetailsCard from "@/app/shared/custom-user-details-card";
import ChunkedGrid from '@/app/shared/custom-chunked-grid';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/config/routes';
import ViewAttachments from '../../request-details/view-attachments';
import { useEffect, useState } from 'react';
import ReviewForm from '@/app/shared/custom-reviews/review-form';
import { PiUserCircleDuotone } from 'react-icons/pi';
import ProgressBarActive from '@/app/shared/admin/progress-bar-admin';

export default function FundiCompleteJobDetails({
  requestDetails,
}: {
  requestDetails?: any;
}) {
  const [modalState, setModalState] = useState(false);
  const [status, setStatus] = useState(requestDetails.status);

  const [viewReviewsModalState, setViewReviewsModalState] = useState(false);
  const [requestReviewsModalState, setRequestReviewsModalState] =
    useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const handleBack = () => router.back();

  const jobId = searchParams.get('id');
  const customerId = requestDetails.takerId;
  const fundiId = requestDetails.assetId;

  const request = {
    Category: 'Fundi',
    'Sub-Category': requestDetails.metadata.skill,
    'Request Type': requestDetails.metadata.packageType,
    'Managed By': requestDetails.metadata.managed,
    County: requestDetails.metadata.county,
    'Sub-County': requestDetails.metadata.subCounty,
    'Estate/Village': requestDetails.metadata.village,
    'Request Date': requestDetails.startDate,
    Status: requestDetails.status,
    'Start Date': requestDetails.startDate,
    'End Date': requestDetails.endDate,
    'Invoice Number': '',
    'Payment Status': requestDetails.status,
    Amount: requestDetails.metadata.linkageFee,
    Uploads: requestDetails.metadata.uploads,
  };

  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const uploadsData = request.Uploads;

  const structuredAttachments = uploadsData.map((url: string) => ({
    name: getFileNameFromUrl(url),
    url: url,
  }));

  return (
    <div>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-10">
          <ReviewForm />
        </div>
      </Modal>
      {/* 
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
      </Modal> */}

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

      {/* <UserDetailsCard /> */}

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
            <div className="mb-4">
              <ChunkedGrid
                data={request}
                attachementsDetails={request}
                dataChunkSize={8}
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>

      <div className="mt-6 flex justify-center">
        <Button className="px-8" onClick={handleBack}>
          Back
        </Button>

        <Link
          href={{
            pathname: routes.serviceProvider.fundi.addReview,
            query: { jobId, fundiId, customerId },
          }}
        >
          <Button
            onClick={() => {
              sessionStorage.setItem('transaction', JSON.stringify(request));
            }}
            className="ml-4"
          >
            Add Review
          </Button>
        </Link>
      </div>
    </div>
  );
}
