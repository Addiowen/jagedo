import QuotationReports from '@/app/shared/tables/quotations-renamed/quotation-report';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Admin'),
};

export default function Admin() {
  return (
    <QuotationReports className="relative @container  @4xl:col-span-2 @7xl:col-span-12" />
  );
}
