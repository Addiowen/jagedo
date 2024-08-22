import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import EditFundiForm from '@/app/shared/profile/profile';
export const metadata = {
  ...metaObject('Fundi Profile'),
};

const pageHeader = {
  title: 'Fundi Profile Edit',
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
      name: 'Edit profile',
    },
  ],
};

export default function CreateCustomer() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <EditFundiForm />
    </>
  );
}
