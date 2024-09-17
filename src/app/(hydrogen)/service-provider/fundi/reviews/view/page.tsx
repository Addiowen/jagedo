import ViewReviewComponent from '@/app/shared/service-provider/details/reviews/view-review';
import Rate from '@/components/ui/rate';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

// Function to fetch ratings based on rating ID
const fetchRating = async (ratingId: string | null) => {
  if (!ratingId) return null; // Handle empty query parameter
  try {
    const ratings = await apiRequest({
      method: 'GET',
      endpoint: `/ratings/${ratingId}`,
    });
    return ratings;
  } catch (error) {
    console.error('Failed to fetch rating details:', error);
    return null;
  }
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  // Extract the rating IDs from the query parameters
  const { customerRatingId, spRatingId } = searchParams;

  // Fetch both customer and service provider ratings
  const customerRating = await fetchRating(customerRatingId);
  const spRating = await fetchRating(spRatingId);

  return (
    <>
      <div className="flex justify-between">
        {customerRating && (
          <div>
            <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
              CUSTOMER RATING# {customerRatingId.toUpperCase()}
            </Title>
            <Rate
              size="sm"
              allowHalf={true}
              defaultValue={customerRating.score / 20}
              disabled={true}
              className="mb-3.5 mt-3 pb-5 font-semibold @2xl:mb-5"
            />
          </div>
        )}

        {spRating && (
          <div>
            <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
              RATING# {spRatingId.toUpperCase()}
            </Title>
            <Rate
              size="sm"
              allowHalf={true}
              defaultValue={spRating.score / 20}
              disabled={true}
              className="mb-3.5 mt-3 pb-5 font-semibold @2xl:mb-5"
            />
          </div>
        )}
      </div>

      {/* Pass both ratings to the ViewReviewComponent */}
      <ViewReviewComponent
        customerRating={customerRating}
        spRating={spRating}
      />
    </>
  );
}
