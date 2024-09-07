import CompletedJobsTable from '@/app/shared/admin/dashboard/jobs/completed';

import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Complete Jobs'),
};

const fetchTransactions = async () => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?orderBy=createdDate&order=desc&status=paid`,
    });
    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function CompletedJobs() {
  const transactions = await fetchTransactions();

  // Format the data if needed
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
        <CompletedJobsTable
          jobs={formattedData}
          className="relative  @4xl:col-span-2 @7xl:col-span-12"
        />
      </div>
    </div>
  );
}
