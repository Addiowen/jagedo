'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button, Text } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import ReviewsTable from '@/app/shared/ecommerce/review/table';
import { metaObject } from '@/config/site.config';
import AssignServiceProvidersTable from '@/app/shared/admin/dashboard/tables/assign-service-providers';
import CustomTextArea2 from '@/app/shared/account-settings/custom-text-area2';
import toast from 'react-hot-toast';
import { SubmitHandler } from 'react-hook-form';
import { PersonalInfoFormTypes } from '@/utils/validators/personal-info.schema';
import ToastButton from '@/components/buttons/toast-button';
import ProfessionalTable from '@/app/shared/admin/dashboard/tables/professional';
import { useState } from 'react';
import QuoteTable from '@/app/shared/admin/dashboard/tables/quote-table';
import ProfessionalFeesTable from '@/app/shared/admin/dashboard/tables/professional-fees';
import { useSearchParams } from 'next/navigation';
import CreateContractorQuotationComponent from '@/app/shared/admin/quotations/contractor';
import ContractorsTable from '@/app/shared/admin/dashboard/tables/contractor';
import AllContractorsComponent from '@/app/shared/admin/all-contractors-tables';

// export const metadata = {
//   ...metaObject('Create Professional Quotation '),
// };

// const pageHeader = {
//   title:  'Create Professional Quotation ',
//   breadcrumb: [
//     {
//       href: '',
//       name: 'Select a Professional to Create a Quotation',
//     },
//   ],
// };

// {
//   className,
// }: {
//   className?: string;
// }

export default function ProfessionalQuotation() {
  const [isTableVisible, setIsTableVisible] = useState(true);

  const searchParams = useSearchParams();

  const jobId = searchParams.get('jobId');

  const pageHeader = {
    title:
      jobId === '3420'
        ? 'Create Professional Quotation '
        : jobId === '3700' ||
            jobId === '3502' ||
            jobId === '3401' ||
            jobId === '3400'
          ? 'Create Contractor Quotation '
          : 'Assign',

    breadcrumb: [
      {
        href: '',
        name:
          jobId === '3420'
            ? 'Select a Professional to Create a Quotation'
            : jobId === '3700' ||
                jobId === '3502' ||
                jobId === '3401' ||
                jobId === '3400'
              ? 'Select a Contractor to Create a Quotation'
              : 'Select  a Service Provider to Create a Quotation',
      },
    ],
  };

  const handleToggle = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          {isTableVisible && (
            <>
              {(jobId === '3419' ||
                jobId === '3420' ||
                jobId === '3324' ||
                jobId === '3336') && (
                <div className="relative col-span-2 ">
                  {/* Render Prof Table */}
                  <ProfessionalTable />
                </div>
              )}
              {(jobId === '3502' ||
                jobId === '3400' ||
                jobId === '3401' ||
                jobId === '3700') && (
                <div className="relative @4xl:col-span-2 ">
                  {/* Render Contract Table */}
                  <AllContractorsComponent />
                </div>
              )}
            </>
          )}

          {/* <ToastButton AltButton={true} title="Back" /> */}
          {isTableVisible && (
            <Button onClick={handleToggle}>
              {/* {isTableVisible ? 'Select' : 'Cancel'} */}
              Select
            </Button>
          )}

          {!isTableVisible && (
            <>
              {jobId === '3700' ? (
                <div className="relative  @4xl:col-span-2 ">
                  <ProfessionalQuotation />
                </div>
              ) : (
                <div className="relative  @4xl:col-span-2 ">
                  <CreateContractorQuotationComponent />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
