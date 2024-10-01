import { metaObject } from '@/config/site.config';
import EditProfileContactDetails from '@/app/shared/service-provider/profile/edit-profile';
import PageHeader from '@/app/shared/commons/page-header';
import apiRequest from '@/lib/apiService';
import EditAdminProfileContactDetails from '@/app/shared/admin/admin-profile/edit-profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

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

export default async function EditProfileContactDetailsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    throw Error('No user Id found');
  }

  console.log(session, 'the session');
  const fetchUserDetails = async () => {
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

  const user = await fetchUserDetails();

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <EditAdminProfileContactDetails
        editProfileId={userId}
        userDetails={user}
      />
    </>
  );
}
