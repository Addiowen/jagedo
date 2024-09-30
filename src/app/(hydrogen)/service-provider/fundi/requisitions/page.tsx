import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import FundiRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/fundi';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Alert, Badge, Button } from 'rizzui';
import { Text } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

const fetchUserAssetDetails = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session, 'fundi session');

    if (!session || !session.user) {
      // throw new Error('User not authenticated');
      toast.error('User not authenticated');
    }

    const assetId = session?.user?.metadata?.assetId;

    const assetDetails = await apiRequest({
      method: 'GET',
      endpoint: `/assets/${assetId}`,
    });

    console.log(assetDetails, 'assetDetails');

    return assetDetails;
  } catch (error) {
    // Assert that 'error' is of type 'Error'
    if (error instanceof Error) {
      console.error('Error fetching user details:', error.message);
      // toast.error(error.message);
    } else {
      console.error('Unexpected error:', error);
    }

    return null; // Return null to signify an error occurred
  }
};

export default async function RequisitionsPage() {
  const session = await getServerSession(authOptions);

  const approvalStatus = session?.user.metadata.approvalStatus;

  const asset = await fetchUserAssetDetails();

  // Use optional chaining to safely access metadata
  const bookingRequests = asset?.metadata?.bookingRequests;

  if (approvalStatus === 'pending') {
    return (
      <Alert variant="flat" color="warning">
        <Text className="font-semibold">Unverified</Text>
        <Text>Awaiting verification from admin! Please try again later</Text>
      </Alert>
    );
  }

  const fetchRequestDetails = async () => {
    if (!bookingRequests) {
      console.error('Request transaction ID is missing');
      return null;
    }

    try {
      const assetDetails = await apiRequest({
        method: 'GET',
        endpoint: `/transactions?status=assigned&id[]=${bookingRequests}`,
      });

      return assetDetails;
    } catch (error) {
      console.error('Error fetching request details:', error);
      // Handle error accordingly
      return null;
    }
  };

  const receivedRequests = await fetchRequestDetails();
  console.log(receivedRequests, 'received requests');

  return (
    <>
      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <FundiRequisitionsTable
            requestDetails={receivedRequests}
            className="relative @4xl:col-span-12  @7xl:col-span-8"
          />
        </div>
      </div>
    </>
  );
}
