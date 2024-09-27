import ReportComponent from '@/app/shared/admin/report';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import {
  fetchUserTransaction,
  getRequestDetails,
} from '@/lib/transaction.helper';

export const metadata = {
  ...metaObject('Admin Req'),
};

export default async function AdminRequisitionsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const requestId = searchParams.id;
  // Fetch user transaction details
  const transaction = await fetchUserTransaction(requestId);

  // Fetch customer details using takerId from the customerRequest
  // const customerDetails = customerRequest
  //   ? await fetchCustomerDetails(customerRequest.takerId)
  //   : null;

  // Generate request details for the ChunkedGrid component
  const requestDetails = getRequestDetails(transaction);
  const quotationsArray = transaction.metadata.quotations;
  const bookingRequests = transaction.metadata.bookingRequests;

  const fetchQuotations = async () => {
    if (!quotationsArray) {
      console.error('Request transaction ID is missing');
      return null;
    }

    // try {
    //   const quotations = await apiRequest({
    //     method: 'GET',
    //     endpoint: `/messages?status=assigned&id[]=${quotationsArray}`,
    //   });

    console.log(requestId, 'requestId');

    try {
      const quotations = await apiRequest({
        method: 'GET',
        endpoint: `/messages?topicId=${requestId}`,
      });

      return quotations;
    } catch (error) {
      console.error('Error fetching request details:', error);
      // Handle error accordingly
      return null;
    }
  };

  const quotations = await fetchQuotations();

  console.log(quotations, 'quotations');

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <ReportComponent
          requestDetails={requestDetails}
          quotations={quotations}
          bookingRequests={bookingRequests}
          className="relative  @4xl:col-span-2 @7xl:col-span-12"
        />
      </div>
    </div>
  );
}
