import ReportComponent from '@/app/shared/admin/report';
import PageHeader from '@/app/shared/commons/page-header';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Professional Register'),
};

const pageHeader = {
  title: 'Generate Report',
  breadcrumb: [],
};

export default function ReportPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <div className="-mt-6 @container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <ReportComponent className="relative  @4xl:col-span-2 @7xl:col-span-12" />
        </div>
      </div>
    </>
  );
}
