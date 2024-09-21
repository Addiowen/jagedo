import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import ServiceProviderDashboard from '@/app/shared/service-provider/dashboard';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';

export default async function ServiceProviderDashboardPage() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user.metadata.role;
  const assetId = session?.user.metadata.assetId;

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
  return <ServiceProviderDashboard assetDetails={asset} />;
}
