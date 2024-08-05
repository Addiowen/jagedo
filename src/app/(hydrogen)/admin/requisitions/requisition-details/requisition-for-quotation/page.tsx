import { metaObject } from '@/config/site.config';
import RFQServiceProviderCard from '@/app/shared/admin/cards/rfq/service-provider';
import PageHeader from '@/app/shared/commons/page-header';

export const metadata = {
  ...metaObject('Requisition For Quotation'),
};

const pageHeader = {
  title: 'RFQ',
};

export default function RFQPage() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title}></PageHeader>
      <div className="mt-2 mt-6 flex flex-col gap-y-6 @container sm:gap-y-10">
        <RFQServiceProviderCard />
      </div>
    </div>
  );
}
