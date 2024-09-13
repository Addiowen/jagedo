// import ContractorReviewsTable from '@/app/shared/service-provider/tables/reviews-table';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import FundiReviewsTable from '@/app/shared/service-provider/tables/reviews-table/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
// import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const fetchRatingDetails = async () => {
    const session = await getServerSession(authOptions);

    try {
      const transactions = await apiRequest({
        method: 'GET',
        endpoint: `/transactions`,
      });
      return transactions;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const transactionsDetails = await fetchRatingDetails();
  console.log(transactionsDetails.results.metadata, 'transactions');

  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Reviews
      </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <FundiReviewsTable
            transactions={transactionsDetails}
            className="relative @4xl:col-span-12  @7xl:col-span-8"
          />
        </div>
      </div>
    </>
  );
}
