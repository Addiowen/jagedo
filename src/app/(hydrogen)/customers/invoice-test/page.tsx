import InvoiceComponent from "@/app/shared/custom-invoice-test";
// import PageHeader from '@/app/shared/commons/page-header';
import PageHeader from "@/app/shared/commons/page-header";
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';

export const metadata = {
  ...metaObject('Invoice'),
};

const pageHeader = {
  title: 'Invoice Details',
  breadcrumb: [
    {
      href: '',
      name: 'Customers',
    },
    {
      href: '',
      name: 'Invoice',
    },
    {
      name: 'Details',
    },
  ],
};

export default function InvoicePage() {
  return (
    <div>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
        <InvoiceComponent />
    </div>
  );
}
