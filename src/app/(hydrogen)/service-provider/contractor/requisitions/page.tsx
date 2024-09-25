// import ServiceProviderRequisitionsTable from '@/app/shared/admin/dashboard/tables/service-provider-requisions';
// import SpRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table';
import ContractorRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/contractor';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { Alert, Text, Button } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const metadata = {
  ...metaObject(),
};

const fetchUserAssetDetails = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session, 'professional session');

    if (!session || !session.user) {
      toast.error('User not authenticated');
    }

    const assetId = session?.user?.metadata?.assetId;

    if (!assetId) {
      return (
        <Alert variant="flat" color="warning">
          <Text className="font-semibold">Unverified</Text>
          <Text>
            Verification pending! Please{' '}
            <Link
              className="text-blue-500 underline"
              href={routes.serviceProvider.contractor.profile}
            >
              complete your profile
            </Link>{' '}
            to request approval.
          </Text>
        </Alert>
      );
    }

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
  if (!asset || !asset.metadata) {
    return (
      <Alert variant="flat" color="warning">
        <Text className="font-semibold">Unverified</Text>
        <Text>
          Verification pending! Please{' '}
          <Link
            className="text-blue-500 underline"
            href={routes.serviceProvider.fundi.profile}
          >
            complete your profile
          </Link>{' '}
          to request approval.
        </Text>
      </Alert>
    );
  }

  console.log(asset.metadata, 'metadata');

  const fetchRequestDetails = async () => {
    if (!bookingRequests) {
      console.error('Request transaction ID is missing');
      return null;
    }

    try {
      // const assetDetails = await apiRequest({
      //   method: 'GET',
      //   endpoint: `/transactions?status=assigned&id[]=${bookingRequests}`,
      // });
      const assetDetails = await apiRequest({
        method: 'GET',
        endpoint: `/transactions`,
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
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Requests
      </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <ContractorRequisitionsTable
          requestDetails={receivedRequests}  className="relative @4xl:col-span-12  @7xl:col-span-8" />
        </div>
      </div>
    </>
  )
  
}
