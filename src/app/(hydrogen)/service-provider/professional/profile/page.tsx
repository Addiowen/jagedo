// import Link from 'next/link';
// import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import apiRequest from '@/lib/apiService';
import { BASE_URL } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import CreateProfessionalProfileForm from '@/app/shared/service-provider/profile/create-profile/professional';

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
