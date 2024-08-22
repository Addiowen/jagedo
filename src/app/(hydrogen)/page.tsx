import { metaObject } from '@/config/site.config';
import CustomerDashboard from '../shared/admin/dashboard';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <CustomerDashboard />;
}
