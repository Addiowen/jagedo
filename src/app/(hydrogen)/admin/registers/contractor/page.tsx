'use client';

import ContractorsTable from '@/app/shared/admin/dashboard/tables/contractor';
import AllContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/all';
import RoadsContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/roads';
import WaterContractorsTable from '@/app/shared/admin/dashboard/tables/contractor/water';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button, Tab } from 'rizzui';

// export const metadata = {
//   ...metaObject('Contractor Register'),
// };

export default function ContractorPage() {
  return (
    <div className="@container">
      <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
        <Link
          href={routes.admin.createContractorProfile}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Contractor
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        {/* <ContractorsTable className="relative  @4xl:col-span-2 @7xl:col-span-12" /> */}
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
      </div>
    </div>
  );
}
