// import CompletedJobDetails from '@/app/shared/service-provider/details/complete-job-details';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import FundiCompleteJobDetails from '@/app/shared/service-provider/details/complete-job-details/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const transactionIdUpperCase = searchParams.id.toUpperCase();
  const transactionId = searchParams.id;

  const fetchTransactions = async () => {
    try {
      const transactions = await apiRequest({
        method: 'GET',
        endpoint: `/transactions/${transactionId}`,
      });
      return transactions;
    } catch (error) {
      console.error('Failed to fetch transaction details:', error);
      return null;
    }
  };

  const requisitionDetails = await fetchTransactions();
  console.log(requisitionDetails, 'requisitionDetails');

  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        JOB# {transactionIdUpperCase}
      </Title>

      {/* <div className="@container"> */}
      <FundiCompleteJobDetails requestDetails={requisitionDetails} />
      {/* </div> */}
    </>
  );
}
