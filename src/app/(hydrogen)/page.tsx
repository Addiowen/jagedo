'use client';

import ServiceProviderDashboardPage from './service-provider/dashboard/fundi/page';
import AdminDashboard from '@/app/shared/admin/dashboard';
import CustomerDashboard from '../shared/customers/dashboard';
import { useSession } from 'next-auth/react';


export default function FileDashboardPage() {
  const { data: session } = useSession();

  const userRole = session?.user.role;

  return userRole === 'admin' ? (
    <AdminDashboard />
  ) : userRole === 'customer' ? (
    <CustomerDashboard />
  ) : (
    <ServiceProviderDashboardPage />
  );
}
