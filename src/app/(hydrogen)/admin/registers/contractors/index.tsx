'use client';

import AllFundisTable from '@/app/shared/admin/dashboard/tables/all-fundis-table';
import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Tab } from 'rizzui';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import AllProfessionalsTable from '@/app/shared/admin/dashboard/tables/all-pros-table';
import UnverifiedProfessionalsTable from '@/app/shared/admin/dashboard/tables/unverified-pros';
import UnverifiedContractorsTable from '@/app/shared/admin/dashboard/tables/unverified -contractors';

interface PageProps {
  pros: any;
}

export default function AllContractorsTables({ pros }: PageProps) {
  const profiledUsers = pros.results.filter(
    (item: {
      metadata: {
        profileCreated: boolean;
        role: string;
        assetId?: string;
      };
    }) => item.metadata.profileCreated === true
  );

  const contractors = profiledUsers.filter(
    (item: { metadata: { role: string; assetId?: string } }) =>
      item.metadata.role === 'contractor'
  );
  const unverifiedContractors = profiledUsers.filter(
    (item: { metadata: { role: string; assetId?: string } }) =>
      item.metadata.role === 'contractor' && !item.metadata.assetId
  );
  const allContractors =
    contractors?.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        firstName: item.firstname || '',
        lastName: item.lastname || '',
        phone: item.metadata?.phone || '', // Add fallback
        category: item.metadata.category || '', // Static value
        contractor: item.metadata?.contractor || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: item.metadata?.status || 'paid',
      };
    }) || [];

  const unverified =
    unverifiedContractors?.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        firstName: item.firstname || '',
        lastName: item.lastname || '',
        phone: item.metadata?.phone || '', // Add fallback
        category: item.metadata.category || '',
        contractor: item.metadata?.contractor || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: item.metadata?.status || 'paid',
      };
    }) || [];

  return (
    <div className="@container">
      <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
        <Link
          // href={routes.admin.createFundiProfile}
          href={''}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          {/* <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Fundi
          </Button> */}
        </Link>
      </div>
      <Tab>
        <Tab.List>
          <Tab.ListItem>All Contractors</Tab.ListItem>
          <Tab.ListItem>Unverified Contractors</Tab.ListItem>
          <Tab.ListItem>Verified Contractors</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
              <UnverifiedContractorsTable
                className="relative  @4xl:col-span-2 @7xl:col-span-12"
                fundis={allContractors}
                title="Contractors"
              />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
              <UnverifiedContractorsTable
                className="relative  @4xl:col-span-2 @7xl:col-span-12"
                fundis={unverified}
                title="Contractors"
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
}
