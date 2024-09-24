import { metaObject } from '@/config/site.config';
import EditProfileContactDetails from '@/app/shared/service-provider/profile/edit-profile';
import PageHeader from '@/app/shared/commons/page-header';
import apiRequest from '@/lib/apiService';
import { BASE_URL } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const metadata = {
  ...metaObject('Profile View'),
};

// let pageHeader: { title: any; breadcrumb: any };

const capitalizeFirstLetter = (string: any) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};


const fetchUserDetails = async () => {
  const session = await getServerSession(authOptions);

  const customerType = capitalizeFirstLetter(session?.user.metadata.type);


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

export default async function EditProfileContactDetailsPage() {
  const user = await fetchUserDetails();
  console.log('user', user);
  console.log('william 333');
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <EditProfileContactDetails userDetails={user} editProfileId={''} />
    </>
  )
}
