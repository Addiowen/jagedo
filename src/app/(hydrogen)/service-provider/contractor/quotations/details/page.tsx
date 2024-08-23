import { metaObject } from '@/config/site.config';
import ViewContractorQuotationComponent from '@/app/shared/service-provider/view-quotation/contractor';
import PageHeader from '@/app/shared/commons/page-header';
import { Title } from 'rizzui';

export const metadata = {
    ...metaObject(),
};

// const pageHeader = {
//   title: 'QTN0021',
//   breadcrumb: [
//     {
//       href: '#',
//       name: 'Home',
//     },
//     {
//       href: '#',
//       name: 'Quotations',
//     },
//     {
//       href: '#',
//       name: 'Details',
//     },
//   ],
// };


  
export default function QuotationDetailsPage() {
  return (
      <>
          {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} /> */}
          <Title as="h4" className="mb-2 font-semibold @2xl:mb-5 pb-5">
                QTN0021
          </Title>

          <ViewContractorQuotationComponent />
      </>
  )
}