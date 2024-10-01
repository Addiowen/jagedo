import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AdminDashboard from '@/app/shared/admin/dashboard';
import QuotedRequisitionsTable from '@/app/shared/tables/quotations';
import QuotationsTable from '@/app/shared/tables/quotations-renamed';
import QuotationReports from '@/app/shared/tables/quotations-renamed';
import RequisitionsTable from '@/app/shared/tables/requisitions';

import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';

export const metadata = {
  ...metaObject('Customers'),
};

const fetchTransactions = async (userId: string) => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?status=assigned+quotation&takerId=${userId}&order=desc&orderBy=createdDate`,
    });
    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function Admin() {

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

  // Filter and format the data
const formattedData =
transactions.results
  .filter((item: any) => item.metadata.category === 'professional' || item.metadata.category === 'contractor')
  .map((item: any, index: number) => {
    return {
      number: index + 1,
      id: item.id || '',
      date: item.createdDate || '',
      category: item.metadata.category,
      subCategory: item.metadata?.profession || item.metadata?.contractor || '',
      requestType: `${item.metadata?.packageType}` || '',
      description: item.metadata?.description || '',
      location: item.metadata?.village || '',
      county: item.metadata?.county || '',
      subCounty: item.metadata?.subCounty || '',
      status: item.status || '',
    };
  }) || [];

  return (
    <QuotedRequisitionsTable quotations={formattedData} className="relative @container  @4xl:col-span-2 @7xl:col-span-12" />
  );
}
