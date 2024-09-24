// import Link from 'next/link';
// import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import apiRequest from '@/lib/apiService';
import { BASE_URL } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
// import { Button } from 'rizzui';
// import { routes } from '@/config/routes';
// import CreateEditProduct from '@/app/shared/admin/product/create-edit';
// import CreateCustomerForm from '@/app/shared/admin/profile/create-profile/customers/page';
// import CreateFundiProfileForm from '@/app/shared/service-provider/profile/create-profile/fundi';
import CreateContractorProfileForm from '@/app/shared/service-provider/profile/create-profile/contractor';

export const metadata = {
  ...metaObject('Profile'),
};

let pageHeader = {
  title: 'Contractor Profile Creation',
  breadcrumb: [
    {
      href: '',
      name: 'Service Providers',
    },
    {
      href: '',
      name: 'Contractor',
    },
    {
      name: 'Create profile',
    },
  ],
};


const capitalizeFirstLetter = (string: any) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const fetchUserDetails = async () => {
  const session = await getServerSession(authOptions);

  try {
    const userDetails = await apiRequest({
      method: 'GET',
      endpoint: `/users/${session?.user.userId}`,
    });
    return userDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function ContractorCreateProfilePage() {
  const user = await fetchUserDetails();
  console.log('william 3');
  console.log('user', user);
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <CreateContractorProfileForm userDetails={user} />
    </>
  );
}
