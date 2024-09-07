import ReviewTable from '@/app/shared/admin/dashboard/tables/review-table';

import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Reviews'),
};

const fetchRating = async () => {
  try {
    const ratings = await apiRequest({
      method: 'GET',
      endpoint: `/ratings`,
    });
    return ratings;
  } catch (error) {
    console.error('Failed to fetch rating details:', error);
    return null;
  }
};

export default async function ReviewsPage() {
  const rating = await fetchRating();
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <ReviewTable
          ratings={rating}
          className="relative  @4xl:col-span-2 @7xl:col-span-12"
        />
      </div>
    </div>
  );
}
