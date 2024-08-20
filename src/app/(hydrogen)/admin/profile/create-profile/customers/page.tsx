import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import { routes } from '@/config/routes';
import CreateCustomerForm from '@/app/shared/admin/profile/create-profile/customers/page';

export const metadata = {
  ...metaObject('Fundi Profile'),
};

const pageHeader = {
  title: 'Customer Profile Creation',
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: 'Service Providers',
    },
    {
      href: routes.admin.createCustomerProfile,
      name: 'Customers',
    },
    {
      name: 'Create profile',
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

      <CreateCustomerForm />
    </>
  );
}
