import AddReviewComponent from '@/app/shared/service-provider/details/reviews/add-review';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function ReviewsPage({ searchParams }: { searchParams: any }) {
  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        JOB #{searchParams.jobId.toUpperCase()}
      </Title>

      <AddReviewComponent />
    </>
  );
}
