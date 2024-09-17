import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateOrganizationProfileForm from '@/app/shared/organization';
import apiRequest from '@/lib/apiService';
import { BASE_URL } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import CreateFundiProfileForm from '@/app/shared/service-provider/profile/create-profile/fundi';
import CreateFundiProfileFormNew from '@/app/shared/admin/fundi-profile';
import CreateAdminProfileForm from '@/app/shared/admin/admin-profile';

export const metadata = {
  ...metaObject('Profile'),
};

const pageHeader = {
  title: 'Admin Profile',
  breadcrumb: [
    {
      href: '',
      name: 'Create profile',
    },
    {
      href: '',
      name: '',
    },
    {
      name: '',
    },
  ],
};

const fetchUserDetails = async (userId: string) => {
  try {
    const userDetails = await apiRequest({
      method: 'GET',
      endpoint: `/users/${userId}`,
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
  const user = await fetchUserDetails(searchParams.profileId);
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <CreateAdminProfileForm userDetails={user} />
    </>
  );
}
