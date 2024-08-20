'use client';

// import RFQCard from '@/app/shared/admin/rfq';
import PageHeader from '@/app/shared/commons/page-header';
import { useSearchParams } from 'next/navigation';
import CreateProfessionalQuotationComponent from '@/app/shared/create-quotation/create-quotation';
import ViewContractorQuotationComponent from '../quotations/view-quotation/contractor';

// export const metadata = {
//   ...metaObject('RFQ '),
// };

export default function RFQPage() {
  const queryId = useSearchParams();
  const jobId = queryId.get('jobId');

  const pageHeader = {
    title: jobId ? `QTN#${jobId}` : '',
    breadcrumb: [],
  };

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
            <ViewContractorQuotationComponent />
          ) : (
            <CreateProfessionalQuotationComponent />
          )}
          {/* <CreateQuotationComponent /> */}
        </div>
      </div>
    </>
  );
}
