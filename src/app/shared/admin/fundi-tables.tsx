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
import UnverifiedFundisTable from './dashboard/tables/unverifies-fundis';

interface PageProps {
  fundis: any;
}

export default function FundiTables({ fundis }: PageProps) {
  const fundisonly = fundis.results.filter(
    (item: { metadata: { role: string; assetId?: string } }) =>
      item.metadata.role === 'fundi'
  );
  const filteredFundis = fundis.results.filter(
    (item: { metadata: { role: string; assetId?: string } }) =>
      item.metadata.role === 'fundi' && !item.metadata.assetId
  );
  const allFundis =
    fundisonly?.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        firstName: item.firstname || '',
        lastName: item.lastname || '',
        phone: item.metadata?.phone || '', // Add fallback
        category: 'Fundi', // Static value
        skill: item.metadata?.skill || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: item.metadata?.status || 'paid',
      };
    }) || [];

  const fundilist =
    filteredFundis?.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        firstName: item.firstname || '',
        lastName: item.lastname || '',
        phone: item.metadata?.phone || '', // Add fallback
        category: 'Fundi', // Static value
        skill: item.metadata?.skill || '',
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
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Fundi
          </Button>
        </Link>
      </div>
      <Tab>
        <Tab.List>
          <Tab.ListItem>All Fundis</Tab.ListItem>
          <Tab.ListItem>Unverified Fundis</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
              <AllFundisTable
                className="relative  @4xl:col-span-2 @7xl:col-span-12"
                fundis={allFundis}
              />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
              <UnverifiedFundisTable
                className="relative  @4xl:col-span-2 @7xl:col-span-12"
                fundis={fundilist}
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
}
