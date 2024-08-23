// import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
// import AdminDashboard from '../shared/admin/dashboard';
// import FundiDashboard from './service-provider/fundi/dashboard/page';
import ServiceProviderDashboardPage from './service-provider/dashboard/fundi/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <ServiceProviderDashboardPage />;
}
