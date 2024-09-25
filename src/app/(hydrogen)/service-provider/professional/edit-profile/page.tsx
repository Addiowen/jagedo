import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';

import CreateFundiProfileForm from '@/app/shared/service-provider/profile/create-profile/fundi';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import apiRequest from '@/lib/apiService';
import FundiEditProfileForm from '.';
import CreateProfessionalProfileForm from '.';

export const metadata = {
  ...metaObject('Profile'),
};

const pageHeader = {
  title: 'Profile Creation',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Profile',
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
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function FundiCreateProfilePage({
  searchParams,
}: {
  searchParams: any;
}) {
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
