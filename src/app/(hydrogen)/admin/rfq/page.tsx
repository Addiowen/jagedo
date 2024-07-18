import ContactorsTable from '@/app/shared/admin/dashboard/tables/contractor';
// import RFQCard from '@/app/shared/admin/rfq';
import { metaObject } from '@/config/site.config';
import RFQServiceProviderCard from '@/app/shared/admin/cards/rfq/service-provider';
import PageHeader from '@/app/shared/commons/page-header';

export const metadata = {
  ...metaObject('RFQ '),
};

const pageHeader = {
  title: 'RFQ',
  breadcrumb: [],
};

export default function RFQPagr() {
  return (
    <>
      {' '}
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <div className="@container">
        <div className="mt-2 mt-6 flex flex-col gap-y-6 @container sm:gap-y-10">
          {/* <RFQCard className="relative  @4xl:col-span-2 @7xl:col-span-12" /> */}
          <RFQServiceProviderCard />
        </div>
      </div>
    </>
  );
}
