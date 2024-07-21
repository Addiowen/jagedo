// import ServiceProviderRequisitionsTable from '@/app/shared/admin/dashboard/tables/service-provider-requisions';
// import SpRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table';
// import ReviewCard from '@/app/shared/custom-reviews/review-card-view';
// import ContractorReviewsTable from '@/app/shared/service-provider/tables/reviews-table';
import ReviewCard from '@/components/cards/review-card';
// import ContractorQuotationsTable from '@/app/shared/service-provider/tables/sp-quotations-table/contractor';
// import ContractorRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/contractor';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function ReviewsPage() {
  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        Review
      </Title>

      <div className="@container">
        <ReviewCard
          customer={{ name: 'Floyd Wangari' }}
          message="Did a good job fixing the wiring"
          date={new Date()}
        />
      </div>
    </>
  );
}
