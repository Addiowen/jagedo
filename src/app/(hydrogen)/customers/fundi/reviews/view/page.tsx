import ViewReviewComponent from '@/app/shared/service-provider/details/reviews/view-review';
import Rate from '@/components/ui/rate';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

const fetchRating = async (ratingId: any) => {
  try {
    const ratings = await apiRequest({
      method: 'GET',
      endpoint: `/ratings/${ratingId}`,
    });
    return ratings;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const rating = await fetchRating(searchParams.id);

  console.log(rating, 'rating');

  return (
    <>
      <div className="flex justify-between">
        <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
          RATING# {searchParams.id.toUpperCase()}
        </Title>
        <Rate
          size="sm"
          allowHalf={true}
          defaultValue={rating.score / 20}
          disabled={true}
          className="mb-3.5 mt-3 pb-5 font-semibold @2xl:mb-5"
          // tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
        />
      </div>

      <ViewReviewComponent rating={rating} />
    </>
  );
}
