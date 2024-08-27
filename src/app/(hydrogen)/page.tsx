'use client';

import { metaObject } from '@/config/site.config';
import ServiceProviderDashboardPage from './service-provider/dashboard/fundi/page';
import AdminDashboard from '@/app/shared/admin/dashboard';
import CustomerDashboard from '../shared/customers/dashboard';
import { useSession } from 'next-auth/react';

// export const metadata = {
//   ...metaObject(),
// };

export default function FileDashboardPage() {
  const { data: session } = useSession();

  // const userRole = session?.user.role;

  const userRole = session?.user.role;

  // const user = sessionStorage.getItem('userData');

  // if (user) {
  //   const userObject: any = JSON.parse(user);

  //   userRole = userObject.metadata?.role;
  // }

  return userRole === 'admin' ? (
    <AdminDashboard />
  ) : userRole === 'customer' ? (
    <CustomerDashboard />
  ) : (
    <ServiceProviderDashboardPage />
  );
}
