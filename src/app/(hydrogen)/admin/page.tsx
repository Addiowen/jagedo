import AdminDashboard from '@/app/shared/admin/dashboard';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Admin'),
};

export default function Admin() {
  return <AdminDashboard />;
}
