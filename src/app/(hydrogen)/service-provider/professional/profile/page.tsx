// import Link from 'next/link';
// import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
// import { Button } from 'rizzui';
// import { routes } from '@/config/routes';
// import CreateEditProduct from '@/app/shared/admin/product/create-edit';
// import CreateCustomerForm from '@/app/shared/admin/profile/create-profile/customers/page';
// import CreateFundiProfileForm from '@/app/shared/service-provider/profile/create-profile/fundi';
import CreateProfessionalProfileForm from '@/app/shared/service-provider/profile/create-profile/professional';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Profile'),
};

const pageHeader = {
  title: 'Professional Profile Creation',
  breadcrumb: [
    {
      href: '',
      name: 'Service Providers',
    },
    {
      href: '',
      name: 'Professional',
    },
    {
      name: 'Create profile',
    },
  ],
};

const fetchUserDetails = async () => {
  const session = await getServerSession(authOptions);

  const fundiId = session?.user.id;

  try {
    const userDetails = await apiRequest({
      method: 'GET',
      endpoint: `/users/${fundiId}`,
    });
    return userDetails;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    return null;
  }
};

export default async function FundiCreateProfilePage() {
  const user = await fetchUserDetails();

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateProfessionalProfileForm userDetails={user} />
    </>
  );
}
