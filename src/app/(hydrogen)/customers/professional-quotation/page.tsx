import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import ViewProfessionalQuotationComponent from '@/app/shared/service-provider/view-quotation/professional';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import { Title } from 'rizzui';
// import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default async function QuotationDetailsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const requestId = searchParams.id;
  const messageId = searchParams.messageId;
  

  const fetchQuotation = async () => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id
    console.log("owen", userId, requestId);
    
    try {
      const quotation = await apiRequest({
        method: 'GET',
        endpoint: `/messages?topicId=${requestId}&receiverId=${userId}`,
      });

      return quotation;
    } catch (error) {
      console.error('Error fetching request details:', error);
      // Handle error accordingly
      return null;
    }
  };


  const quotationResults = await fetchQuotation();
  const quotationDetails = quotationResults.results[0];
  const quotationId = quotationDetails.id

  return (
    <>
      <Title as="h4" className="mb-2 pb-5 font-semibold @2xl:mb-5">
        QTN {requestId}
      </Title>
      <ViewProfessionalQuotationComponent quotationDetails={quotationDetails} quotationId={quotationId} />
    </>
  );
}
