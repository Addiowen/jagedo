import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

import FundiTables from '@/app/shared/admin/fundi-tables';

export const metadata = {
  ...metaObject('Assign Service Providers'),
};

const fetchUsers = async () => {
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
  const fundis = await fetchUsers();

  return (
    <div className="@container">
      <FundiTables fundis={fundis} />
    </div>
  );
}
