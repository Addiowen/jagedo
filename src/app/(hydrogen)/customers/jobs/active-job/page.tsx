import AdminDashboard from '@/app/shared/admin/dashboard';
import FundiActiveJobsTable from '@/app/shared/tables/active-jobs';
import { getServerSession } from 'next-auth';

import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import toast from 'react-hot-toast';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const metadata = {
  ...metaObject('Customers'),
};

// Fetch data server-side
const fetchTransactions = async (userId: string) => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?status=active,pending+approval&takerId=${userId}&order=desc&orderBy=createdDate&`,
    });
    console.log(transactionDetails, 'transactionDetails');

    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    toast.error('Failed to fetch transaction details');
    return null;
  }
};

export default async function CompleteJobsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Loading...</div>; // You can replace this with a spinner or other loading indicator
  }

  const transactions = await fetchTransactions(session.user.id);

  if (!transactions) {
    return <div>Unable to load transactions. Please try again later.</div>;
  }

  // Format the data if needed
  const formattedData =
    transactions.results.map((item: any, index: number) => {
      return {
        number: index + 1,
        id: item.id || '',
        date: item.createdDate || '',
        category: item.metadata?.category || '',
        subCategory: item.metadata?.skill || item.metadata?.profession || item.metadata?.contractor || '',
        requestType: `${item.metadata?.packageType}` || '',
        description: item.metadata?.description || '',
        location: item.metadata?.village || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: item.status || '',
      };
    }) || [];

  return (
    <FundiActiveJobsTable
      request={formattedData}
      className="relative @container  @4xl:col-span-2 @7xl:col-span-12"
    />
  );
}
