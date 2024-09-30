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
  searchParams: any;
}) {
  const requestId = searchParams.jobId;
  const messageId = searchParams.messageId;

  const fetchQuotation = async () => {
    // try {
    //   const quotations = await apiRequest({
    //     method: 'GET',
    //     endpoint: `/messages?status=assigned&id[]=${quotationsArray}`,
    //   });

    try {
      const quotation = await apiRequest({
        method: 'GET',
        endpoint: `/messages/${messageId}`,
      });

      return quotation;
    } catch (error) {
      console.error('Error fetching request details:', error);
      // Handle error accordingly
      return null;
    }
  };

  const quotationDetails = await fetchQuotation();

  return (
    <>
      <Title as="h4" className="mb-2 pb-5 font-semibold @2xl:mb-5">
        QTN {requestId}
      </Title>
      <ViewProfessionalQuotationComponent quotationDetails={quotationDetails} />
    </>
  );
}
