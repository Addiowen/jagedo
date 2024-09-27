import ViewProfessionalQuotationComponent from '@/app/shared/service-provider/view-quotation/professional';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';
// import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function QuotationDetailsPage() {
  return (
    <>
      <Title as="h4" className="mb-2 pb-5 font-semibold @2xl:mb-5">
        QTN0021
      </Title>
      <ViewProfessionalQuotationComponent />
    </>
  );
}
