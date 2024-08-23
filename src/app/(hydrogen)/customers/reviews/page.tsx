import { metaObject } from '@/config/site.config';
import ReviewTable from '../tables/reviews';
import FundiReviewsTable from '../review-table';

export const metadata = {
  ...metaObject('Professional Register'),
};

export default function ReviewsPage() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <FundiReviewsTable className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
