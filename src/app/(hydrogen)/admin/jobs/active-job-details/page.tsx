import ActiveJobDetailsCard from '@/app/shared/admin/details/active-job-details';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { Button, Modal, Progressbar } from 'rizzui';
import cn from '@/utils/class-names';
import ActiveJobDetails from '.';
import {
  fetchCustomerDetails,
  fetchUserTransaction,
  getRequestDetails,
} from '@/lib/transaction.helper';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Active Job Details'),
};

type PageProps = {
  className: string;
  searchParams: any;
  // other props as needed
};

export default async function JobDetailsPage({
  className,
  searchParams,
}: PageProps) {
  const requestId = searchParams.id;
  const customerRequest = await fetchUserTransaction(requestId);

  console.log(customerRequest, 'customerRequest');

  // Fetch customer details using takerId from the customerRequest
  const customerDetails = customerRequest
    ? await fetchCustomerDetails(customerRequest.takerId)
    : null;

  const fundiDetails = customerRequest
    ? await fetchCustomerDetails(customerRequest.ownerId)
    : null;

  // Generate request details for the ChunkedGrid component
  const requestDetails = getRequestDetails(customerRequest);
  return (
    <>
      <ActiveJobDetails
        fundiDetails={fundiDetails}
        requestDetails={requestDetails}
        className={''}
      />
    </>
  );
}
