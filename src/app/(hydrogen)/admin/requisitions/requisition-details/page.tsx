

import { routes } from '@/config/routes';
import { Button, Textarea } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import CustomerDetailsCard from '@/app/shared/admin/dashboard/customer-details';

import WidgetCard3 from '@/components/cards/widget-card3';
import ToastButton from '@/components/buttons/toast-button';
import Link from 'next/link';
import ChunkedGrid from '@/app/shared/commons/custom-chunked-grid';
import apiRequest from '@/lib/apiService';



interface PageProps {
  searchParams: any;
}


export default async function RequisitionDetailsPage({
  searchParams,
}: PageProps)  {
  

const requestId = searchParams.id

 
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
  
  const customerRequest = await fetchUserTransaction()

  const fetchCustomerDetails = async () => {
    try {
      const userTransaction = await apiRequest({
        method: 'GET',
        endpoint: `/users/${customerRequest.takerId}`,
      });
      return userTransaction;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };
 
  const customerDetails = await fetchCustomerDetails()

  const requestDetails = {
    Category: 'Fundi',
    'Sub-Category': customerRequest?.metadata.skill,
    'Request Type': customerRequest?.metadata.packageType || 'N/A',
    'Managed By': customerRequest?.metadata.managed || 'N/A',
    County: customerRequest?.metadata.county || 'N/A',
    'Sub-County': customerRequest?.metadata.subCounty || 'N/A',
    'Estate/Village': customerRequest?.metadata.village || 'N/A',
    'Request Date': customerRequest?.metadata.date ? new Date(customerRequest.metadata.date).toLocaleDateString() : 'N/A',
    Status: customerRequest?.status || 'N/A',
    'Start Date': customerRequest?.startDate ? new Date(customerRequest.startDate).toLocaleDateString() : 'N/A',
    'End Date': customerRequest?.endDate ? new Date(customerRequest.endDate).toLocaleDateString() : 'N/A',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid', 
    Amount: customerRequest?.metadata.linkageFee ? customerRequest.metadata.linkageFee.toFixed(2) : 'N/A',
  };


  const pageHeader = {
    title: `REQ# ${requestId.slice(0,6)}...`,
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

      {/* <JobDetailsCard className="mt-6" /> */}
      <div className="mt-4">
        <ChunkedGrid
          data={requestDetails}
          dataChunkSize={8}
          // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>

      <WidgetCard3
        title="NOTES"
        rounded="lg"
        className="mt-4"
        action={<Textarea size="sm" className="ml-12 flex flex-grow" />}
      ></WidgetCard3>

      <div className="mt-6 flex items-center justify-center space-x-6">
        {/* {jobId === '3420' || jobId === '3419' ? (
          <>
            <Link
              href={{
                pathname: routes.admin.professionalQuotation,
                query: { jobId },
              }}
            >
              <ToastButton title="Create Quotation" />
            </Link>
            <Link
              href={{
                pathname: routes.admin.assignServiceProvider,
                query: { jobId },
              }}
            >
              <ToastButton title="Assign Professionals" />
            </Link>
          </>
        ) : jobId === '3502' || jobId === '3700' ? (
          <>
            <Link
              href={{
                pathname: routes.admin.professionalQuotation,
                query: { jobId, contractor },
              }}
            >
              <ToastButton title="Create Quotation" />
            </Link>
            <Link
              href={{
                pathname: routes.admin.assignServiceProvider,
                query: { jobId, contractor },
              }}
            >
              <ToastButton title="Assign Contractors" />
            </Link>
          </>
        ) : ( 
        )} */}


<Link
            href={{
              pathname: routes.admin.assignServiceProvider,
              query: { requestId },
            }}
          >
            <ToastButton title="Assign Fundis" />
          </Link>
      </div>
    </>
  );
}
