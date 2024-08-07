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

// export const metadata = {
//   ...metaObject('Assign Service Providers'),
// };

// {
//   className,
// }: {
//   className?: string;
// }

export default function AllContractorsComponent() {
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
      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          {jobId === '3420' ? (
            <ProfessionalTable className="relative  @4xl:col-span-2 " />
          ) : jobId === '3700' ? (
            <>
              <Tab className="col-span-2">
                <Tab.List>
                  <Tab.ListItem>All Contractors</Tab.ListItem>
                  <Tab.ListItem>Water</Tab.ListItem>
                  <Tab.ListItem>Roads</Tab.ListItem>
                  <Tab.ListItem>Energy</Tab.ListItem>
                  <Tab.ListItem>Housing</Tab.ListItem>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <AllContractorsTable />
                  </Tab.Panel>
                  <Tab.Panel>
                    <WaterContractorsTable />
                  </Tab.Panel>
                  <Tab.Panel>
                    <RoadsContractorsTable />
                  </Tab.Panel>
                  <Tab.Panel>
                    <ContractorsTable />
                  </Tab.Panel>
                  <Tab.Panel>
                    <ContractorsTable />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab>
            </>
          ) : (
            <AssignServiceProvidersTable className="relative  @4xl:col-span-2" />
          )}

          {/* <ToastButton AltButton={true} title="Back" />
          {jobId === '3420' || jobId === '3419' ? (
            <ToastButton
              title="Request Assigned"
              route={routes.admin.dashboard}
              message="Request Assigned!"
            />
          ) : (
            <ToastButton
              title="Assign"
              route={routes.admin.dashboard}
              message="Request Assigned!"
            />
          )} */}
        </div>
      </div>
      .
    </>
  );
}
