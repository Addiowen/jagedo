import AdminReviewsTable from '.';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Reviews'),
};

const fetchRating = async () => {
  try {
    const transaction = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?status=reviewed`,
    });
    return transaction;
  } catch (error) {
    console.error('Failed to fetch transactions details:', error);
    return null;
  }
};

export default async function ReviewsPage() {
  const transactionDetails = await fetchRating();
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 3xl:gap-8">
        <AdminReviewsTable transactions={transactionDetails} />
      </div>
    </div>
  );
}
