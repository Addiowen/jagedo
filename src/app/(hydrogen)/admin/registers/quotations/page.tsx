import QuotedRequisitionsTable from '@/app/shared/admin/dashboard/tables/quoted-requisitions';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Admin Quotations'),
};

const fetchTransactions = async () => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?orderBy=createdDate&order=desc
`,
    });
    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function AdminRequisitionsPage() {
  const transactions = await fetchTransactions();

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <QuotedRequisitionsTable
          transactions={transactions}
          className="relative  @4xl:col-span-2 @7xl:col-span-12"
        />
      </div>
    </div>
  );
}
