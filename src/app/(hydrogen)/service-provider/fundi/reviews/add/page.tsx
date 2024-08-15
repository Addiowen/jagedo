import AddReviewComponent from '@/app/shared/service-provider/details/reviews/add-review';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function ReviewsPage() {
  return (
    <>
      <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Add Review
      </Title>

      <AddReviewComponent />
    </>
  )
  
}
