import ActiveJobsTable from '@/app/shared/admin/dashboard/jobs/active';

import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Active Jobs'),
};

const fetchTransactions = async () => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?status=active,pending+approval&orderBy=createdDate&order=desc`,
    });
    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function ActiveJobs() {
  const transactions = await fetchTransactions();

  console.log(transactions, 'transactions');

  const formattedData =
    transactions?.results.map((item: any, index: number) => {
      return {
        number: index + 1,
        id: item.id || '',
        date: item.createdDate || '',
        category: 'Fundi',
        subCategory: item.metadata?.skill || '',
        requestType: `${item.metadata?.packageType}` || '',
        description: item.metadata?.description || '',
        location: item.metadata?.village || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status:
          item.status.charAt(0).toUpperCase() + item.status.slice(1) || '',
      };
    }) || [];

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <ActiveJobsTable
          jobs={formattedData}
          className="relative  @4xl:col-span-2 @7xl:col-span-12"
        />
      </div>
    </div>
  );
}
