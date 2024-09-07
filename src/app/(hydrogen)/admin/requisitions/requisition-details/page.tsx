import { routes } from '@/config/routes';
import { Button, Textarea } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import CustomerDetailsCard from '@/app/shared/admin/dashboard/customer-details';

import WidgetCard3 from '@/components/cards/widget-card3';
import ToastButton from '@/components/buttons/toast-button';
import Link from 'next/link';
import ChunkedGrid from '@/app/shared/commons/custom-chunked-grid';
import apiRequest from '@/lib/apiService';
import WidgetCard from '@/components/cards/widget-card';

interface PageProps {
  searchParams: any;
}

export default async function RequisitionDetailsPage({
  searchParams,
}: PageProps) {
  const requestId = searchParams.id;

  const fetchUserTransaction = async () => {
    try {
      const userTransaction = await apiRequest({
        method: 'GET',
        endpoint: `/transactions/${searchParams.id}`,
      });
      return userTransaction;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const customerRequest = await fetchUserTransaction();

  const fetchCustomerDetails = async () => {
    try {
      const customerDetails = await apiRequest({
        method: 'GET',
        endpoint: `/users/${customerRequest.takerId}`,
      });
      return customerDetails;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const customerDetails = await fetchCustomerDetails();

  console.log(customerDetails, 'customerDetails');

  const requestDetails = {
    Category: 'Fundi',
    'Sub-Category': customerRequest?.metadata.skill,
    'Request Type': customerRequest?.metadata.packageType || 'N/A',
    'Managed By': customerRequest?.metadata.managed || 'N/A',
    County: customerRequest?.metadata.county || 'N/A',
    'Sub-County': customerRequest?.metadata.subCounty || 'N/A',
    'Estate/Village': customerRequest?.metadata.village || 'N/A',
    'Request Date': customerRequest?.metadata.date
      ? new Date(customerRequest.metadata.date).toLocaleDateString()
      : 'N/A',
    Status: customerRequest?.status || 'N/A',
    'Start Date': customerRequest?.startDate
      ? new Date(customerRequest.startDate).toLocaleDateString()
      : 'N/A',
    'End Date': customerRequest?.endDate
      ? new Date(customerRequest.endDate).toLocaleDateString()
      : 'N/A',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Amount: customerRequest?.metadata.linkageFee
      ? customerRequest.metadata.linkageFee.toFixed(2)
      : 'N/A',
    Uploads: customerRequest?.metadata.uploads || 'N/A',
  };

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

  console.log(customerDetails);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CustomerDetailsCard customerDetails={customerDetails} className="mt-2" />

      {/* <JobDetailsCard className="mt-6" /> */}
      <div className="mt-4">
        <ChunkedGrid
          data={requestDetails}
          requestDetails={requestDetails}
          dataChunkSize={8}
          // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>

      <WidgetCard3
        title="NOTES"
        rounded="lg"
        className="mt-4"
        action={<Textarea size="sm" className="ml-12 flex-grow" />}
      ></WidgetCard3>

      <div className="mt-6 flex items-center justify-center space-x-6">
        <Link
          href={{
            pathname: routes.admin.assignServiceProvider,
            query: {
              requestId,
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
