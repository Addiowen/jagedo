import AllFundisTable from '@/app/shared/admin/dashboard/tables/all-fundis-table';
import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Assign Service Providers'),
};

const fetchTransactions = async () => {
  try {
    const fundis = await apiRequest({
      method: 'GET',
      endpoint: `/users`,
    });
    return fundis;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

interface PageProps {
  searchParams: any;
}

export default async function FundisPage({ searchParams }: PageProps) {
  const requestId = searchParams.id;
  const fundis = await fetchTransactions();

  const filteredFundis = fundis.results.filter(
    (item: { metadata: { role: string } }) => item.metadata.role === 'fundi'
  );

  const fundilist =
    filteredFundis?.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        firstName: item.metadata?.firstName || '',
        lastName: item.metadata?.lastName || '',
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
          href={routes.admin.createFundiProfile}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Fundi
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <AllFundisTable
          className="relative  @4xl:col-span-2 @7xl:col-span-12"
          fundis={fundilist}
        />
      </div>
    </div>
  );
}
