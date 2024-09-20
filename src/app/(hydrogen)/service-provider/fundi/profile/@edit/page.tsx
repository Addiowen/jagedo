import { metaObject } from '@/config/site.config';
import EditProfileContactDetails from '@/app/shared/service-provider/profile/edit-profile';
import PageHeader from '@/app/shared/commons/page-header';
import apiRequest from '@/lib/apiService';
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

const fetchUser = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

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

export default async function EditProfileContactDetailsPage() {
  const user = await fetchUser();
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <EditProfileContactDetails userDetails={user} editProfileId={''} />
    </>
  );
}
