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

    const assetId = session?.user.metadata.assetId;

    console.log(assetId, 'asset ifsds');

    try {
      const ratings = await apiRequest({
        method: 'GET',
        endpoint: `/ratings?assetId=${assetId}`,
      });
      return ratings;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const ratings = await fetchRatingDetails();
  console.log(ratings.results.metadata, 'the ratings');

  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Reviews
      </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <FundiReviewsTable
            ratings={ratings}
            className="relative @4xl:col-span-12  @7xl:col-span-8"
          />
        </div>
      </div>
    </>
  );
}
