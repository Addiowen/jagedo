'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button, Tab, Text } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';

import ToastButton from '@/components/buttons/toast-button';
import { useSearchParams } from 'next/navigation';
import ProfessionalTable from '@/app/shared/admin/dashboard/tables/professional';

import WaterContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/water';
import RoadsContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/roads';
import AllContractorsComponent from '@/app/shared/admin/all-contractors-tables';
import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';

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
    <div className="@container">
      <PageHeader title={pageHeader.title}></PageHeader>
      {(jobId === '3416' || jobId === '3418') && <FundisTable />}

      {(jobId === '3502' || jobId === '3700') && <WaterContractorsTable />}

      {(jobId === '3419' || jobId === '3420') && <ProfessionalTable />}

      <div className="mt-6">
        <ToastButton
          title="Assign "
          message="Request Assigned!"
          route={routes.admin.dashboard}
        />
      </div>
    </div>
  );
}
