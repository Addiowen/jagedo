import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateOrganizationProfileForm from '@/app/shared/organization';
import apiRequest from '@/lib/apiService';
import { BASE_URL } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const metadata = {
  ...metaObject('Profile'),
};

let pageHeader: { title: any; breadcrumb: any };

const capitalizeFirstLetter = (string: any) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const fetchUserDetails = async () => {
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
      endpoint: `/users/${session?.user.userId}`,
    });
    return userDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function OrganizationCreateProfilePage() {
  const user = await fetchUserDetails();
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateOrganizationProfileForm userDetails={user} />
    </>
  );
}
