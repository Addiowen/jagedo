// import SpCompletedJobsTable from '@/app/shared/service-provider/tables/sp-completed-jobs-table';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import FundiCompletedJobsTable from '@/app/shared/service-provider/tables/sp-completed-jobs-table/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
// import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

const fetchRequestDetails = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('User not authenticated');
    }

    const assetId = session.user.metadata.assetId;

    const requestDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?assetId=${assetId}`,
    });

    return requestDetails;
  } catch (error) {
    console.error('Error fetching request details:', error);
    return null;
  }
};

export default async function JobsPage() {
  const requisitions = await fetchRequestDetails();
  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
                Completed Jobs
            </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <FundiCompletedJobsTable
            requests={requisitions}
            className="relative @4xl:col-span-12  @7xl:col-span-8"
          />
        </div>
      </div>
    </>
  );
}
