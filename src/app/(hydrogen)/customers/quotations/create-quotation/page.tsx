import { metaObject } from '@/config/site.config';
import CreateQuotationComponent from '@/app/shared/create-quotation';
import ViewProfessionalQuotationComponent from '@/app/shared/create-quotation';

export const metadata = {
    ...metaObject(),
  };
  
  export default function QuotationDetailsPage() {
    return (
        <>
            <ViewProfessionalQuotationComponent />
        </>
    )
  }