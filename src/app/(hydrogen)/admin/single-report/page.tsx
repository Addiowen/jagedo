import SingleReportTable from '@/app/shared/admin/dashboard/tables/generate-report-general';
import PageHeader from '@/app/shared/commons/page-header';
import ToastButton from '@/components/buttons/toast-button';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Profile Page'),
};

const pageHeader = {
  title: 'Plumber',
  breadcrumb: [
    {
      href: routes.admin.analyzeQuotations,
      name: 'Analyze Quotations',
    },
    {
      name: 'Generate Report',
    },
  ],
};

export default function GenerateReport() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="mt-2 flex flex-col gap-y-6 @container sm:gap-y-10">
        <SingleReportTable className="-mt-2" />
        <Link
          href={routes.admin.dashboard}
          className="  grid grid-cols-1 @lg:w-auto"
        >
          <ToastButton
            title="Generate Report"
            message="Report generated successfully!"
          />
        </Link>
      </div>
    </>
  );
}
