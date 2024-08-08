'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button, Tab, Text } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import { metaObject } from '@/config/site.config';
import AssignServiceProvidersTable from '@/app/shared/admin/dashboard/tables/assign-service-providers';
import CustomTextArea2 from '@/app/shared/account-settings/custom-text-area2';
import toast from 'react-hot-toast';
import { SubmitHandler } from 'react-hook-form';
import { PersonalInfoFormTypes } from '@/utils/validators/personal-info.schema';
import ToastButton from '@/components/buttons/toast-button';
import { useSearchParams } from 'next/navigation';
import ProfessionalTable from '@/app/shared/admin/dashboard/tables/professional';
import ContractorsTable from '@/app/shared/admin/dashboard/tables/contractor';
import AllContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/all';
import WaterContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/water';
import RoadsContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/roads';
import AllContractorsComponent from '@/app/shared/admin/all-contractors-tables';

// export const metadata = {
//   ...metaObject('Assign Service Providers'),
// };

// {
//   className,
// }: {
//   className?: string;
// }

export default function AddtoServiceProviders() {
  const searchParams = useSearchParams();

  const jobId = searchParams.get('jobId');

  const pageHeader = {
    title:
      jobId === '3420'
        ? 'Assign Professionals'
        : jobId === '3700' || jobId === '3502'
          ? 'Assign Contractors'
          : 'Assign',
  };
  return (
    <>
      <PageHeader title={pageHeader.title}></PageHeader>
      <AllContractorsComponent />
      <ToastButton
        title="Assign Contractors"
        message="Request Assigned!"
        route={routes.admin.dashboard}
      />
    </>
  );
}
