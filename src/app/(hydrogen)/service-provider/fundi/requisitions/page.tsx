import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import FundiRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

const fetchUserAssetDetails = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('User not authenticated');
    }

    const assetId = session.user.assetId;
    console.log(assetId, 'that asset Id');

    const assetDetails = await apiRequest({
      method: 'GET',
      endpoint: `/assets/${assetId}`,
    });

    return assetDetails;
  } catch (error) {
    console.error('Error fetching user details:', error);
    // Handle error accordingly, e.g., show a message to the user
    return null; // Return null in case of error
  }
};

export default async function RequisitionsPage() {
  const asset = await fetchUserAssetDetails();

  // Check if asset and metadata exist
  const therequestId = asset?.metadata?.requesttransactionId;

  const fetchRequestDetails = async () => {
    if (!therequestId) {
      console.error('Request transaction ID is missing');
      return null; // Handle missing ID case
    }

    try {
      const assetDetails = await apiRequest({
        method: 'GET',
        endpoint: `/transactions/${therequestId}`,
      });

      return assetDetails;
    } catch (error) {
      console.error('Error fetching request details:', error);
      // Handle error accordingly, e.g., show a message to the user
      return null; // Return null in case of error
    }
  };

  const receivedRequests = await fetchRequestDetails();
  console.log(receivedRequests, 'received requests');

  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Requisitions
      </Title> */}

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
