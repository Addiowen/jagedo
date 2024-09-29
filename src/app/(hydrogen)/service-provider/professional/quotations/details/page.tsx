import ViewProfessionalQuotationComponent from '@/app/shared/service-provider/view-quotation/professional';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
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
      <Title as="h4" className="mb-2 pb-5 font-semibold @2xl:mb-5">
        QTN0021
      </Title>
      <ViewProfessionalQuotationComponent quotationDetails={requestDetails}  />
    </>
  );
}
