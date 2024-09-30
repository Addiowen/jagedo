import ServiceProviderDashboardPage from './service-provider/dashboard/fundi/page';
import AdminDashboard from '@/app/shared/admin/dashboard';
import CustomerDashboard from '../shared/customers/dashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth-options';
import apiRequest from '@/lib/apiService';
import ServiceProviderDashboard from '../shared/service-provider/dashboard';
import { Alert, Text } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';

export default async function FileDashboardPage() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user.metadata.role;
  const profileCreated = session?.user.metadata.profileCreated;
  const assetId = session?.user.metadata.assetId;

  // Fetch asset details
  const fetchAssetDetails = async () => {
    try {
      const userDetails = await apiRequest({
        method: 'GET',
        endpoint: `/assets/${assetId}`,
      });
      return userDetails;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const asset = await fetchAssetDetails();

  // Conditional rendering based on profile creation status

  return userRole === 'admin' ? (
    <AdminDashboard />
  ) : userRole === 'customer' ? (
    <CustomerDashboard />
  ) : (
    <ServiceProviderDashboard assetDetails={asset} />
  );
}
