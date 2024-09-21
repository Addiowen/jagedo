// hooks/useCompleteMilestone.ts
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/lib/axios';

export const useCompleteMilestone = (jobId: string) => {
  const handleCompleteMilestone = async () => {
    try {
      const updateTransactionResponse = await axios.patch(
        `${BASE_URL}/transactions/${jobId}`,
        { status: 'pending approval' },
        {
          headers: { Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN },
        }
      );

      if (updateTransactionResponse.status === 200) {
        toast.success('Request Sent... Awaiting approval.');
        return 'pending approval';
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Approval Request Failed. Please try again later.');
    }
    return null;
  };

  return { handleCompleteMilestone };
};
