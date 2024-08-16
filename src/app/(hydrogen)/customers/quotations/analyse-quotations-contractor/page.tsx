import ReportComponent from './analyse-quotation';
import ToastButton from '@/components/buttons/toast-button';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Customer Contractor Quotations'),
};

export default function AdminRequisitionsPage() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <ReportComponent className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
      <div className="flex justify-center">
        <ToastButton
          title="Generate Invoice"
          route={routes.customers.invoice}
          message="Processing..."
        />
      </div>
    </div>
  );
}
