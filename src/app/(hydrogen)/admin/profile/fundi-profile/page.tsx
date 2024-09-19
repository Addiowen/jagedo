import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateOrganizationProfileForm from '@/app/shared/organization';
import apiRequest from '@/lib/apiService';
import { BASE_URL } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import CreateFundiProfileForm from '@/app/shared/service-provider/profile/create-profile/fundi';
import CreateFundiProfileFormNew from '@/app/shared/admin/fundi-profile';
import AdminEditFundiProfileForm from '@/app/shared/admin/profile/edit-profile/fundi';

export const metadata = {
  ...metaObject('Profile'),
};

const pageHeader = {
  title: 'Fundi Profile',
  breadcrumb: [
    {
      href: '',
      name: 'Service Providers',
    },
    {
      href: '',
      name: 'Fundi',
    },
    {
      name: 'Create profile',
    },
  ],
};

const fetchUserDetails = async (userId: string) => {
  const session = await getServerSession(authOptions);

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
      <AdminEditFundiProfileForm userDetails={user} />
    </>
  );
}
