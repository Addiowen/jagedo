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

// export const metadata = {
//   ...metaObject('Create Professional Quotation '),
// };

const pageHeader = {
  title: 'Create Professional Quotation ',
  breadcrumb: [
    {
      href: '',
      name: 'Select a Professional to Create a Quotation',
    },
  ],
};

// {
//   className,
// }: {
//   className?: string;
// }

export default function ProfessionalQuotation() {
  const [isTableVisible, setIsTableVisible] = useState(true);

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
            <ProfessionalTable className="relative  @4xl:col-span-2 " />
          )}
          <ToastButton AltButton={true} title="Back" />
          <Button onClick={handleToggle}>
            {isTableVisible ? 'Select' : 'Cancel'}
          </Button>

          {!isTableVisible && (
            <>
              <div className="relative  @4xl:col-span-2 ">
                <QuoteTable />

                <ProfessionalFeesTable className="relative  mt-4 @4xl:col-span-2" />
              </div>
              <div className="col-span-full flex justify-center">
                <Link href={routes.admin.dashboard}>
                  <ToastButton
                    title="Submit"
                    message="Quotation assigned successfully"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
