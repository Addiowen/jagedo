import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import FundiRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject(),
};

const fetchUserAssetDetails = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session, 'fundi session');

    if (!session || !session.user) {
      throw new Error('User not authenticated');
    }

    const assetId = session?.user?.metadata?.assetId;

    if (!assetId) {
      throw new Error('User does not exist or asset ID is missing');
    }

    console.log(assetId, 'asset id');

    const assetDetails = await apiRequest({
      method: 'GET',
      endpoint: `/assets/${assetId}`,
    });

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
  const asset = await fetchUserAssetDetails();

  // Use optional chaining to safely access metadata
  const bookingRequests = asset?.metadata?.bookingRequests;

  if (!asset || !asset.metadata) {
    console.error('Asset or metadata is missing');
    return <p>You have not been approved!.</p>; // Render an error message
  }

  console.log(asset.metadata, 'metadata');

  const fetchRequestDetails = async () => {
    if (!bookingRequests) {
      console.error('Request transaction ID is missing');
      return null;
    }

    try {
      const assetDetails = await apiRequest({
        method: 'GET',
        endpoint: `/transactions?id[]=${bookingRequests}`,
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
