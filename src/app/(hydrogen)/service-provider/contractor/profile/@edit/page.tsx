import { metaObject } from '@/config/site.config';
import EditProfileContactDetails from '@/app/shared/service-provider/profile/edit-profile';
import PageHeader from '@/app/shared/commons/page-header';

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

export default function EditProfileContactDetailsPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <EditProfileContactDetails />
    </>
  )
}
