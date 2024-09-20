import { routes } from '@/config/routes';
import { Button, Textarea } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import CustomerDetailsCard from '@/app/shared/admin/dashboard/customer-details';

import WidgetCard3 from '@/components/cards/widget-card3';
import ToastButton from '@/components/buttons/toast-button';
import Link from 'next/link';
import ChunkedGrid from '@/app/shared/commons/custom-chunked-grid';
import {
  fetchUserTransaction,
  fetchCustomerDetails,
  getRequestDetails,
} from '@/lib/transaction.helper';

interface PageProps {
  searchParams: any;
}

export default async function RequisitionDetailsPage({
  searchParams,
}: PageProps) {
  const requestId = searchParams.id;

  // Fetch user transaction details
  const customerRequest = await fetchUserTransaction(requestId);

  console.log(customerRequest, 'customerRequest');

  // Fetch customer details using takerId from the customerRequest
  const customerDetails = customerRequest
    ? (await fetchCustomerDetails(customerRequest.takerId)) || []
    : [];

  console.log(customerDetails, 'customer Details');

  // Generate request details for the ChunkedGrid component
  const requestDetails = getRequestDetails(customerRequest);

  const county = requestDetails.County;

  const pageHeader = {
    title: `REQ# ${requestId.toUpperCase()}`,
    breadcrumb: [
      {
        href: routes.admin.dashboard,
        name: 'Home',
      },
      {
        href: routes.admin.requisitions,
        name: 'All requisitions',
      },
      {
        name: 'View Request',
      },
    ],
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CustomerDetailsCard customerDetails={customerDetails} className="mt-2" />

      <div className="mt-4">
        <ChunkedGrid
          data={requestDetails}
          requestDetails={requestDetails}
          dataChunkSize={8}
        />
      </div>

      <WidgetCard3
        title="NOTES"
        rounded="lg"
        className="mt-4"
        action={<Textarea size="sm" className="ml-12 flex-grow self-center" />}
      />

      <div className="mt-6 flex items-center justify-center space-x-6">
        <Link
          href={{
            pathname: routes.admin.assignServiceProvider,
            query: {
              requestId,
              county: requestDetails.County,
              requestType: customerRequest?.metadata.packageType || 'N/A',
            },
          }}
        >
          <ToastButton title="Assign Fundis" />
        </Link>
      </div>
    </>
  );
}
