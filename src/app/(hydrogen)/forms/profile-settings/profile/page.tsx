import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';

import CreateIndividualCustomerProfileForm from '@/app/shared/admin/profile/create-profile/customers/page';

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

export default function FundiCreateProfilePage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateIndividualCustomerProfileForm />
    </>
  );
}
