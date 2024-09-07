import { AdvancedCheckbox, Button, Modal, Tab, Tooltip } from 'rizzui';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import ReviewCard from '@/app/shared/custom-reviews/review-card-view';
import { PiUserCircleDuotone } from 'react-icons/pi';
import ChunkedGrid from '@/app/shared/commons/custom-chunked-grid';
import ReviewForm from '@/app/shared/custom-reviews/review-form';
import CustomerDetailsCard from '@/app/shared/admin/jobs/cutomer-details';
import { completeJobDetailsData } from '@/data/job-data';
import FundiDetailsCard from '@/app/shared/admin/jobs/fundi-details';
import ProgressBarActive from '@/app/shared/admin/progress-bar-admin';
import Link from 'next/link';
import { routes } from '@/config/routes';
import CompleteJobDetailsAttachments from '@/app/shared/commons/completed-attachments';
import SpCompleteJobDetails from '.';
import {
  fetchCustomerDetails,
  fetchUserTransaction,
  getRequestDetails,
} from '@/lib/transaction.helper';

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

export default async function FundiCompleteJobDetails({
  searchParams,
}: {
  searchParams: any;
}) {
  const requestId = searchParams.id;
  // Fetch user transaction details
  const customerRequest = await fetchUserTransaction(requestId);

  // Fetch customer details using takerId from the customerRequest
  const customerDetails = customerRequest
    ? await fetchCustomerDetails(customerRequest.takerId)
    : null;

  // Generate request details for the ChunkedGrid component
  const requestDetails = getRequestDetails(customerRequest);
  return (
    <>
      <SpCompleteJobDetails requestDetails={requestDetails} />
    </>
  );
}
