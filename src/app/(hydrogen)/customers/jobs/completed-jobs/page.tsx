import AdminDashboard from '@/app/shared/admin/dashboard';
import CompletedJobsTable from '@/app/shared/completed';
import CompleteJobsTable from '@/app/shared/tables/complete-jobs';
import RequisitionsTable from '@/app/shared/tables/requisitions';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Admin'),
};

export default function CompleteJobsPage() {
  return (
    <CompletedJobsTable className="relative @container  @4xl:col-span-2 @7xl:col-span-12" />
  );
}
