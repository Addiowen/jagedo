import dynamic from 'next/dynamic';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';
import UploadButton from '@/app/shared/commons/upload-button';
import PageHeader from '@/app/shared/commons/page-header';
import ProfessionalCreateQuotationComponent from '@/app/shared/service-provider/create-quotation/professional';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import ProfessionalAvailability from '@/app/shared/service-provider/confirm-availability/professional-availability';
const FileUpload = dynamic(() => import('@/app/shared/commons/file-upload'), {
    ssr: false,
  });

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
    // {
    //   name: 'List',
    // },
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


export default async function RfqStandardTwoPage({
  searchParams,
}: {
  searchParams: any;
}) {

  const fetchTransactionDetails = async () => {

    const assetDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions/${searchParams.jobId}`,
    });

     
  
    console.log(assetDetails, 'assetDetails');
  
    return assetDetails;
  };

  const transactionDetails = await fetchTransactionDetails();
  const user = await fetchUserDetails();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>
      {/* <ProfessionalAvailability requestDetails={transactionDetails}   /> */}
      <ProfessionalCreateQuotationComponent requestDetails={transactionDetails} userDetails={user} />
    </>
  )
  
}
