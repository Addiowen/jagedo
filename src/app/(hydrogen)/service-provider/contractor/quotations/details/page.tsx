import { metaObject } from '@/config/site.config';
import ViewContractorQuotationComponent from '@/app/shared/service-provider/view-quotation/contractor';
import PageHeader from '@/app/shared/commons/page-header';
import { Title } from 'rizzui';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import apiRequest from '@/lib/apiService';

export const metadata = {
    ...metaObject(),
};


  
export default async function QuotationDetailsPage(
    {
        searchParams,
    }: {
        searchParams?: any;
    }
) {
    const session = await getServerSession(authOptions);

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
    const fetchQuotationDetails = async (senderId: any, topicId: any) => {
      try {
        const transactionDetails = await apiRequest({
          method: 'GET',
          endpoint: `/messages?senderId=${senderId}&topicId=${topicId}`,
        });
    
        return transactionDetails;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    
    const requestDetails = await fetchRequestDetails();
    
    const quotationDetails = await fetchQuotationDetails(session?.user?.metadata?.assetId, requestDetails?.id);
  
    console.log(quotationDetails, 'quotationDetails');

    
  return (
      <>
          <Title as="h4" className="mb-2 font-semibold @2xl:mb-5 pb-5">
                Job #{requestDetails?.id}
          </Title>

          <ViewContractorQuotationComponent quotationDetails={quotationDetails.results[0]} quotationId={''}  />
      </>
  )
}