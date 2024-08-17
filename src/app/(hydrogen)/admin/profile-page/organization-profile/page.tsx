import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateIndividualForm from '@/app/shared/profile-1/individual/create-profile/individual';

export const metadata = {
  ...metaObject('Organization Profile'),
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
      name: 'Individual',
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

      <CreateIndividualForm />
    </>
  );
}
