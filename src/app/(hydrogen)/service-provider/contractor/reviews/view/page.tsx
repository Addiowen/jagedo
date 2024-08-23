import ViewReviewComponent from '@/app/shared/service-provider/details/reviews/view-review';
import Rate from '@/components/ui/rate';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function ReviewsPage() {
  return (
    <>
    <div className='flex justify-between'>
      <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        JOB0021
      </Title>
      <Rate
        size="sm"
        allowHalf={true}
        defaultValue={4}
        disabled={true}
        className='mb-3.5 font-semibold @2xl:mb-5 pb-5 mt-3'
        // tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
      />
    </div>

      <ViewReviewComponent />
    </>
  )
  
}
