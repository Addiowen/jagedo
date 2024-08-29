import { metaObject } from '@/config/site.config';
import EditProfileContactDetails from '@/app/shared/service-provider/profile/edit-profile';
import PageHeader from '@/app/shared/commons/page-header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Profile View'),
};

const pageHeader = {
  title: 'Profile',
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

  try {
    const userDetails = await apiRequest({
      method: 'GET',
      endpoint: `/users/${session?.user.userId}`,
    });
    console.log(userDetails);
    return userDetails;
  } catch (error) {
    console.error('Failed to fetch usr details:', error);
    return null;
  }
};

export default async function EditProfileContactDetailsPage() {
  const user = await fetchUserDetails();

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <EditProfileContactDetails userDetails={user} />
    </>
  );
}
