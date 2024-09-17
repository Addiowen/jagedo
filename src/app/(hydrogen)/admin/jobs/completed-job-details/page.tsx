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
