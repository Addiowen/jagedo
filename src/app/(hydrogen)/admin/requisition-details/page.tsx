import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import { metaObject } from '@/config/site.config';
import RequisitionDetails from '@/app/shared/admin/dashboard';
import CustomerDetails from '@/app/shared/admin/dashboard/tables/requisitions/requisition-details/customer-details';
import CustomerDetailsCard from '@/app/shared/logistics/dashboard/cutomer-details';
import JobDetailsCard from '@/app/shared/logistics/dashboard/job-details';
import CustomTextArea2 from '@/app/shared/account-settings/custom-text-area2';
import CustomTextArea from '@/app/shared/account-settings/custom-text-area';
import JobsWidget from '@/app/shared/ecommerce/dashboard/promotional-sales';
import JobStats from '@/app/shared/job-dashboard/job-stats';
import JobDetails from '@/app/shared/admin/dashboard/tables/requisitions/requisition-details/job-details';

export const metadata = {
  ...metaObject('View Job'),
};

const pageHeader = {
  title: 'View Job',
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: 'Home',
    },
    {
      href: routes.admin.requisitions,
      name: 'All requisitions',
    },
    {
      name: 'View Request',
    },
  ],
};

export default function RequisitionDetailsPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CustomerDetailsCard className="mt-2" />
      {/* <JobDetailsCard className="mt-6" /> */}
      <div className="mt-2 mt-6 flex flex-col gap-y-6 @container sm:gap-y-10">
        <JobDetails />
      </div>
      <CustomTextArea className="mt-6" />
    </>
  );
}
