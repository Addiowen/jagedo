'use client';

// import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
// import AdminDashboard from '../shared/admin/dashboard';
// import FundiDashboard from './service-provider/fundi/dashboard/page';
import ServiceProviderDashboardPage from './service-provider/dashboard/fundi/page';
import AdminDashboard from '@/app/shared/admin/dashboard';

// export const metadata = {
//   ...metaObject(),
// };

const userRole = window.sessionStorage.getItem('role');

export default function FileDashboardPage() {
  return userRole === 'admin' ? (
    <AdminDashboard />
  ) : (
    <ServiceProviderDashboardPage />
  );
}
