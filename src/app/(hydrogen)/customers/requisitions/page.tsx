import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import RequisitionsTable from '@/app/shared/tables/requisitions';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';

// Define the metadata for the page
export const metadata = {
  ...metaObject('Customers'),
};

// Fetch data server-side
const fetchTransactions = async (userId: string) => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?takerId=${userId}&order=desc&orderBy=createdDate`,
    });
    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function Requisitions() {
  const session = await getServerSession(authOptions);

  // Return a loading state if the session or userId is not available
  if (!session?.user?.id) {
    return <div>Loading...</div>; // You can replace this with a spinner or other loading indicator
  }

  console.log(session.user.id, 'this userId');

  const transactions = await fetchTransactions(session.user.id);

  if (!transactions) {
    return <div>Unable to load transactions. Please try again later.</div>;
  }

  // Format the data if needed
  const formattedData =
    transactions.results
      .filter((item: any) => item.status === 'paid' || item.status === 'draft')
      .map((item: any, index: number) => {
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
          status: item.status || '',
        };
      }) || [];

  return (
    <RequisitionsTable
      className="relative @container  @4xl:col-span-2 @7xl:col-span-12"
      request={formattedData}
    />
  );
}
