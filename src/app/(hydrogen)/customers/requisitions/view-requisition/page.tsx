import PageHeader from '@/app/shared/commons/page-header';
import ViewRequisition from '@/app/shared/customers/requisitions/requisition-details';
import InvoiceDetails from '@/app/shared/logistics/shipment/details/invoice-details';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Profile Page'),
};

const pageHeader = {
  title: 'Requisition',
  breadcrumb: [
    {
      href: '/',
      name: 'Requisition',
    },
    {
      name: 'View Job',
    },
  ],
};

export default function ViewJob() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="mt-2 flex flex-col gap-y-6 @container sm:gap-y-10">
        <ViewRequisition />
      </div>
    </>
  );
}
