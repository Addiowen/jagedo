import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import AdminDashboard from '../shared/admin/dashboard';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <AdminDashboard />;
}
