import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateContractorQuotationComponent from '@/app/shared/service-provider/create-quotation/contractor';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const metadata = {
  ...metaObject(),
};

const pageHeader = {
  title: 'Create Quotation',
  breadcrumb: [
    {
      href: '#',
      name: 'Home',
    },
    {
      href: '#',
      name: 'Quotations',
    },
  ],
};

const fetchUserDetails = async () => {
  const session = await getServerSession(authOptions);

  const professionalId = session?.user.id;

  try {
    const userDetails = await apiRequest({
      method: 'GET',
      endpoint: `/users/${professionalId}`,
    });
    return userDetails;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    return null;
  }
};

export default async function RfqStandardOnePage(
  {
    searchParams,
  }: {
    searchParams: any;
  }
) {
  const fetchTransactionDetails = async () => {

    const assetDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions/${searchParams.jobId}`,
    });
    return assetDetails;
  };

  const transactionDetails = await fetchTransactionDetails();
  const user = await fetchUserDetails();
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateContractorQuotationComponent userDetails={user} requestDetails={transactionDetails} />
    </>
  )
}
