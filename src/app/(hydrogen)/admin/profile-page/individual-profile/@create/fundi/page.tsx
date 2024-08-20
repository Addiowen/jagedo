import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import CreateIndividualForm from '@/app/shared/profile-1/individual/create-profile/individual';

export const metadata = {
  ...metaObject('Fundi Profile'),
};

const pageHeader = {
  title: 'Fundi Profile Creation',
  breadcrumb: [
    {
      href: '',
      name: 'Service Providers',
    },
    {
      href: '',
      name: 'Fundi',
    },
    {
      name: 'Create profile',
    },
  ],
};

export default function IndividualCreatePage() {
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
