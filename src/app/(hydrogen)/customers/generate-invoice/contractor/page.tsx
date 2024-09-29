import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/commons/page-header';
import ImportButton from '@/app/shared/commons/import-button';
import CreateInvoice from '@/app/shared/invoice/create-invoice';
import { metaObject } from '@/config/site.config';
// import GenerateInvoice from '@/app/shared/customers/profile/create-profile/professional/page';
import GenerateInvoiceProfessional from '@/app/shared/customers/requisitions/create-requisition/professional';
import GenerateInvoiceFundi from '@/app/shared/customers/requisitions/create-requisition/fundi';
import GenerateInvoiceContractor from '@/app/shared/customers/requisitions/create-requisition/contractor';

export const metadata = {
  ...metaObject('Create Invoice'),
};

const pageHeader = {
  title: 'Create Invoice',
};

export default function InvoiceCreatePage() {
  return (
    <>
      <GenerateInvoiceContractor />
    </>
  );
}
