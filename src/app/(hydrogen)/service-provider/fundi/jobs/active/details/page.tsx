// import ActiveJobDetailsAttachments from '@/app/shared/service-provider/details/sp-job-details/attachments';
import toast from 'react-hot-toast';
import SpActiveJobComponent from '@/app/shared/service-provider/active-job';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject(),
};

type PageProps = {
  className: string;
  searchParams: any;
};

export default async function JobDetailsPage({
  className,
  searchParams,
}: PageProps) {
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
  return <SpActiveJobComponent jobs={requisitionDetails} className={''} />;
}
