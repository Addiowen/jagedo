import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import ViewProfessionalQuotationComponent from '@/app/shared/service-provider/view-quotation/professional';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Title } from 'rizzui';
// import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};


export default async function QuotationDetailsPage({
  searchParams,
}: {
  searchParams?: any;
}) {
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
      <Title as="h4" className="mb-2 pb-5 font-semibold @2xl:mb-5">
        Job #{requestDetails?.id}
      </Title>
      {
        quotationDetails?.results?.length > 0 ? (
          <ViewProfessionalQuotationComponent quotationDetails={quotationDetails.results[0]}  />
        ) : <>
            <p>No Quotation Found</p>
        </>
      }
    </>
  );
}
