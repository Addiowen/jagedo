import AdminRequisitionsTable from '@/app/shared/admin/dashboard/tables/requisitions/admin-requisitions';
import DropDownComponent from '@/components/dropdown/dropdown';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Admin Req'),
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

export default async function AdminRequisitionsPage() {
  const transactions = await fetchTransactions();

  console.log(transactions.results[0].metadata, 'transactions');

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
      <div className="mb-6 flex justify-end">
        {/* <DropDownComponent /> */}

        <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
          <Link
            href={routes.admin.createRequest}
            className="mt-4 w-full @lg:mt-0 @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create Request
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1  @4xl:grid-cols-2  3xl:gap-8">
        <AdminRequisitionsTable
          requests={formattedData}
          className="relative  @4xl:col-span-2 "
        />
      </div>
    </div>
  );
}
