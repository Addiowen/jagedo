// page.tsx
import RequisitionsTable from '@/app/shared/tables/requisitions';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

// Define the metadata for the page
export const metadata = {
  ...metaObject('Admin'),
};

// Fetch data server-side
const fetchTransactions = async () => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?takerId=usr_IeFdJpe18x01srBFz8x0&order=asc&orderBy=createdDate`,
    });
    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function Requsitions() {
  const transactions = await fetchTransactions();

  // Format the data if needed
  const formattedData =
    transactions?.results.map((item: any, index: number) => {
      console.log('Index:', index); // Log the index
      return {
        number: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        category: 'Fundi',
        subCategory: item.metadata?.skill || '',
        requestType:
          `${item.metadata?.packageType} : managed by ${item.metadata?.managed}` ||
          '',
        description: item.metadata?.description || '',
        location: item.metadata?.village || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: 'paid' || '',
      };
    }) || [];

  return (
    <RequisitionsTable
      className="relative @container  @4xl:col-span-2 @7xl:col-span-12"
      request={formattedData}
    />
  );
}
