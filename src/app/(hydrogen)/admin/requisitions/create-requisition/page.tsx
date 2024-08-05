import { metaObject } from '@/config/site.config';
import RFQServiceProviderCard from '@/app/shared/admin/cards/rfq/service-provider';
import PageHeader from '@/app/shared/commons/page-header';
import CreateRequestComponent from '@/app/shared/admin/requisitions/create-requisition';

export const metadata = {
  ...metaObject('Create Requsition'),
};

const pageHeader = {
  title: 'Professional',
};

export default function CreateRequestPage() {
  return (
    <div className="@container">
      {/* <PageHeader title={pageHeader.title}></PageHeader> */}

      <CreateRequestComponent />
    </div>
  );
}
