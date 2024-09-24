// import ConfirmAvailability from '@/app/shared/service-provider/confirm-availability/confirm-availability';
// import ProfessionalAvailability from '@/app/shared/service-provider/confirm-availability/professional-availability';
import RequestDetails from '@/app/shared/service-provider/details/request-details';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default async function RFQEmergencyFundiPage(
  {
    searchParams,
  }: {
    searchParams?: any;
  }
) {

  const fetchRequestDetails = async () => {
    try {
      const transactionDetails = await apiRequest({
        method: 'GET',
        endpoint: `/transactions/${searchParams.id}`,
      });

      return transactionDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const requestDetails = await fetchRequestDetails();

  return (
    <>
        <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
            REQ0021
        </Title>
    
        {/* <ProfessionalAvailability /> */}
        <RequestDetails requestDetails={requestDetails}  />
    </>
  )
  
}
