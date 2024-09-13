import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AdminDashboard from '@/app/shared/admin/dashboard';
import CompletedJobsTable from '@/app/shared/completed';
import CompleteJobsTable from '@/app/shared/tables/complete-jobs';
import RequisitionsTable from '@/app/shared/tables/requisitions';

import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject('Customers'),
};

// Fetch data server-side
const fetchTransactions = async (userId: string) => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?takerId=${userId}&order=desc&orderBy=createdDate&status=accepted`,
    });
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
    transactions.results
      .filter(
        (item: any) => item.status === 'approved' || item.status === 'reviewed'
      )
      .map((item: any, index: number) => {
        return {
          number: index + 1,
          id: item.id || '',
          assetId: item.assetId,
          date: item.createdDate || '',
          category: 'Fundi',
          subCategory: item.metadata?.skill || '',
          requestType: `${item.metadata?.packageType}` || '',
          description: item.metadata?.description || '',
          location: item.metadata?.village || '',
          county: item.metadata?.county || '',
          subCounty: item.metadata?.subCounty || '',
          status: item.status || '',
        };
      }) || [];

  return (
    <CompletedJobsTable
      request={formattedData}
      className="relative @container  @4xl:col-span-2 @7xl:col-span-12"
    />
  );
}
