import SpNavCards from './sp-nav-cards';
import JobSlider from './job-slider';
// import ReviewSlider from './review-slider';
// import CustomMessagesList from '@/app/shared/custom-messages-list';
// import RequisitionAlerts from './requisition-alerts';
import Notifications from './notifications';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { Alert, Text } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import apiRequest from '@/lib/apiService';

export default async function ServiceProviderDashboard({
  assetDetails,
}: {
  assetDetails: any;
}) {
  console.log('userdetails');

  const session = await getServerSession(authOptions);
  const userRole = session?.user.metadata.role;
  const userId = session?.user.id;

  const createProfileRoute =
    userRole === 'fundi'
      ? routes.serviceProvider.fundi.profile
      : userRole === 'contractor'
        ? routes.serviceProvider.contractor.profile
        : userRole === 'professional'
          ? routes.serviceProvider.professional.profile
          : userRole === 'customer'
            ? routes.customers.createCustomerProfile
            : routes.accessDenied;

  const fetchUserDetails = async () => {
    try {
      const userDetails = await apiRequest({
        method: 'GET',
        endpoint: `/users/${userId}`,
      });
      return userDetails;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const user = await fetchUserDetails();

  const profileCreated = user.metadata.profileCreated;

  // Fallback UI if the profile is not created
  if (!profileCreated) {
    return (
      <div className="mx-auto max-w-md">
        <Alert color="warning" rounded="xl">
          <Text className="font-semibold">Profile Not Approved</Text>
          <Text>
            It seems like your profile is not yet created. Please{' '}
            <Link className="text-blue-500 underline" href={createProfileRoute}>
              complete your profile
            </Link>{' '}
            to access full dashboard features.
          </Text>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {profileCreated && (
        <div className="@container">
          <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 3xl:gap-8">
            <SpNavCards className="py-5 @2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4" />
            <JobSlider />
            {/* <RequisitionAlerts /> */}
            <Notifications />
          </div>
        </div>
      )}
    </>
  );
}
