'use client';

import { routes } from '@/config/routes';
import { Button, Textarea } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import CustomerDetailsCard from '@/app/shared/admin/dashboard/customer-details';

import WidgetCard3 from '@/components/cards/widget-card3';
import ToastButton from '@/components/buttons/toast-button';
import Link from 'next/link';
import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import { requestDetails } from '@/data/job-data';
import { useSearchParams } from 'next/navigation';

export default function RequisitionDetailsPage() {
  const searchParams = useSearchParams();

  const jobId = searchParams.get('id');

  const currentRequest =
    jobId === '3416'
      ? requestDetails[0]
      : jobId === '3418'
        ? requestDetails[1]
        : jobId === '3419'
          ? requestDetails[3]
          : jobId === '3420'
            ? requestDetails[4]
            : jobId === '3502'
              ? requestDetails[5]
              : jobId === '3700'
                ? requestDetails[6]
                : requestDetails[0];

  const contractor = currentRequest?.Contractor || '';

  const pageHeader = {
    title: jobId ? `REQ#${jobId}` : 'REQ',
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

      <CustomerDetailsCard className="mt-2" />
      {/* <JobDetailsCard className="mt-6" /> */}
      <div className="mt-4">
        <ChunkedGrid
          data={currentRequest}
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
        {jobId === '3420' || jobId === '3419' ? (
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
          <Link
            href={{
              pathname: routes.admin.assignServiceProvider,
              query: { jobId },
            }}
          >
            <ToastButton title="Assign Fundis" />
          </Link>
        )}
      </div>
    </>
  );
}
