// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";

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

  const isCustomerRatingId = customerRequest.metadata.customerRatingId;

  return (
    <>
      <SpCompleteJobDetails
        isAlreadyRated={isCustomerRatingId}
        requestDetails={requestDetails}
      />
    </>
  );
}
