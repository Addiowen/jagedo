import AdminDashboard from '@/app/shared/admin/dashboard';
import RequisitionsTable from '@/app/shared/tables/requisitions';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Admin'),
};

export default function Admin() {
  return (
    <RequisitionsTable className="relative @container  @4xl:col-span-2 @7xl:col-span-12" />
  );
}
