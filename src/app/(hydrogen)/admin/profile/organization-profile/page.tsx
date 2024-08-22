
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateOrganizationProfileForm from '@/app/shared/service-provider/profile/create-profile/organization';

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

export default function OrganizationCreateProfilePage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateOrganizationProfileForm />
    </>
  );
}
