import { metaObject } from '@/config/site.config';
import CreateContractorQuotationComponent from '@/app/shared/create-quotation/contractor';

export const metadata = {
  ...metaObject('Contractor Quotation'),
};

export default function ReviewsPage() {
  return (
    <div className="@container">
      <div className="relative col-span-2">
        <CreateContractorQuotationComponent />
      </div>
    </div>
  );
}