import ViewFundiJobDetails from '@/app/shared/customers/requisitions/requisition-details/confirm-availability';
import ConfirmAvailability from '@/app/shared/service-provider/confirm-availability/confirm-availability';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};


interface RFQEmergencyFundiPageProps {
  requestId: string | null;
  searchParams: any;
}





export default async function RFQEmergencyFundiPage({
  requestId,
  searchParams,
}: RFQEmergencyFundiPageProps) {


  const fetchUserTransaction = async () => {
    try {
      const userTransaction = await apiRequest({
        method: 'GET',
        endpoint: `/transactions/${searchParams.id}`,
      });
      return userTransaction;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

   const customerRequest = await fetchUserTransaction()

   const formattedData = {
    Category: 'Fundi',
    'Sub-Category': customerRequest?.metadata.skill,
    'Request Type': customerRequest?.metadata.packageType || 'N/A',
    'Managed By': customerRequest?.metadata.managed || 'N/A',
    County: customerRequest?.metadata.county || 'N/A',
    'Sub-County': customerRequest?.metadata.subCounty || 'N/A',
    'Estate/Village': customerRequest?.metadata.village || 'N/A',
    'Request Date': customerRequest?.metadata.date ? new Date(customerRequest.metadata.date).toLocaleDateString() : 'N/A',
    Status: customerRequest?.status || 'N/A',
    'Start Date': customerRequest?.startDate ? new Date(customerRequest.startDate).toLocaleDateString() : 'N/A',
    'End Date': customerRequest?.endDate ? new Date(customerRequest.endDate).toLocaleDateString() : 'N/A',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid', 
    Amount: customerRequest?.metadata.linkageFee ? customerRequest.metadata.linkageFee.toFixed(2) : 'N/A',
  };
  

  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        
        {`REQ# ${(searchParams.id).toUpperCase()}`}
      </Title>

      <ViewFundiJobDetails
      
      request={formattedData}/>
    </>
  );
}
