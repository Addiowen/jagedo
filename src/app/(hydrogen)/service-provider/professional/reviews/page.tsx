// import ContractorReviewsTable from '@/app/shared/service-provider/tables/reviews-table';
import ProfessionalReviewsTable from '@/app/shared/service-provider/tables/reviews-table/professional';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function ReviewsPage() {
  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Reviews
      </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <ProfessionalReviewsTable className="relative @4xl:col-span-12  @7xl:col-span-8" />
        </div>
      </div>
    </>
  )
  
}
