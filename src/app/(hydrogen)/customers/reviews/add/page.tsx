import AddReviewComponentCustomer from '@/app/shared/customers/reviews/add-review';
import AddReviewComponent from '@/app/shared/service-provider/details/reviews/add-review';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const fetchTransactionDetails = async () => {
    try {
      const transactionDetails = await apiRequest({
        method: 'GET',
        endpoint: `/transactions/${searchParams.jobId}`,
      });
      return transactionDetails;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const transaction = await fetchTransactionDetails();
  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        JOB #{searchParams.jobId.toUpperCase()}
      </Title>

      <AddReviewComponentCustomer transactionDetails={transaction} />
    </>
  );
}
