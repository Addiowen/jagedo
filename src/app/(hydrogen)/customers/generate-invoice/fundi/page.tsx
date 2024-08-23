import { metaObject } from '@/config/site.config';

import GenerateInvoiceFundi from '@/app/shared/customers/requisitions/create-requisition/fundi';

export const metadata = {
  ...metaObject('Create Invoice'),
};

const pageHeader = {
  title: 'Create Invoice',
};

export default function InvoiceCreatePage() {
  return (
    <>
      <GenerateInvoiceFundi />
    </>
  );
}
