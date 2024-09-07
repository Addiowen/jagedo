import AllFundisTable from '@/app/shared/admin/dashboard/tables/all-fundis-table';
import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Tab } from 'rizzui';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import FundiTables from '@/app/shared/admin/fundi-tables';

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

  return (
    <div className="@container">
      <FundiTables fundis={fundis} />
    </div>
  );
}
