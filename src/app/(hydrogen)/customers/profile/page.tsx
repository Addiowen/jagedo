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

const pageHeader = {
  title: 'Organization Profile Creation',
  breadcrumb: [
    {
      href: '',
      name: 'Customers',
    },
    {
      href: '',
      name: 'Organization',
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
    console.log(userDetails);
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
