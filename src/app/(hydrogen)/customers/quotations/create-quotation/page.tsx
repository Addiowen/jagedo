// import QuotationDetailsCard from '@/app/shared/service-provider/details/quotation-details';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { metaObject } from '@/config/site.config';
// import { Title } from 'rizzui';
import CreateQuotationComponent from '@/app/shared/customers/create-quotation';

export const metadata = {
    ...metaObject(),
  };
  
  export default function QuotationDetailsPage() {
    return (
        <>
            <CreateQuotationComponent />
        </>
    )
  }