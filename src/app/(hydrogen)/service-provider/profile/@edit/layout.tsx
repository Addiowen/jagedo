import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/commons/page-header';
import FundiEditProfileNav from '@/app/shared/service-provider/profile/edit-profile/navigation';
// import ProfileSettingsNav from '@/app/shared/account-settings/navigation';

const pageHeader = {
  title: 'Profile',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    // {
    //   href: routes.forms.profileSettings,
    //   name: 'Profile',
    // },
    {
      name: 'Profile',
    },
  ],
};

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {/* <ProfileSettingsNav /> */}
      <FundiEditProfileNav />
      {children}
    </>
  );
}
