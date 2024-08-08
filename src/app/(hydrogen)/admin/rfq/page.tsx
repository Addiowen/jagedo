'use client';

// import RFQCard from '@/app/shared/admin/rfq';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateContractorQuotationComponent from '@/app/shared/admin/quotations/contractor';
import { useSearchParams } from 'next/navigation';
import CreateProfessionalQuotationComponent from '@/app/shared/create-quotation/create-quotation';

// export const metadata = {
//   ...metaObject('RFQ '),
// };

const pageHeader = {
  title: 'View  Quotation',
  breadcrumb: [],
};

export default function RFQPage() {
  const queryId = useSearchParams();
  const jobId = queryId.get('jobId');

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <div className="@container">
        <div className="flex flex-col  @container sm:gap-y-10">
          {/* <RFQCard className="relative  @4xl:col-span-2 @7xl:col-span-12" /> */}
          {jobId === '3401' ||
          jobId === '3400' ||
          jobId === '3324' ||
          jobId === '3327' ? (
            <CreateContractorQuotationComponent />
          ) : (
            <CreateProfessionalQuotationComponent />
          )}
          {/* <CreateQuotationComponent /> */}
        </div>
      </div>
    </>
  );
}
