import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateOrganizationProfileForm from '@/app/shared/organization';
import apiRequest from '@/lib/apiService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AdminEditOrganizationProfileForm from '@/app/shared/admin/profile/edit-profile/organization';

export const metadata = {
  ...metaObject('Profile'),
};

let pageHeader: { title: any; breadcrumb: any };

const capitalizeFirstLetter = (string: any) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const fetchUserDetails = async (userId: string) => {
  const session = await getServerSession(authOptions);

  const customerType = capitalizeFirstLetter(session?.user.metadata.type);

  pageHeader = {
    title: `${customerType} Profile Creation`,
    breadcrumb: [
      {
        href: '',
        name: 'Customers',
      },
      {
        href: '',
        name: `${customerType}`,
      },
      {
        name: 'Create profile',
      },
    ],
  };

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

export default async function OrganizationCreateProfilePage({
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

      <AdminEditOrganizationProfileForm userDetails={user} />
    </>
  );
}
