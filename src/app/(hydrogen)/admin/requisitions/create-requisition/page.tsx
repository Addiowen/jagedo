import { metaObject } from '@/config/site.config';
import CreateRequestComponent from '@/app/shared/admin/requisitions/create-requisition';
import Link from 'next/link';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import GenerateInvoiceFundi from '@/app/shared/customers/requisitions/create-requisition/fundi';

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

      {/* <CreateRequestComponent /> */}
      <GenerateInvoiceFundi />
    </div>
  );
}
