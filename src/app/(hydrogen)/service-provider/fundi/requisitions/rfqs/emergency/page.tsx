import ConfirmAvailability from '@/app/shared/service-provider/confirm-availability/confirm-availability';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default async function RFQEmergencyFundiPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const fetchRequestDetails = async () => {
    try {
      const assetDetails = await apiRequest({
        method: 'GET',
        endpoint: `/transactions/${searchParams.id}`,
      });

      return assetDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle error accordingly, e.g., show a message to the user
    }
  };

  const requestDetails = await fetchRequestDetails();

  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        REQ {searchParams.id}
      </Title>

      <ConfirmAvailability requestDetails={requestDetails} />
    </>
  );
}
