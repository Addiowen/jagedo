import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import CreateEditProduct from '@/app/shared/admin/product/create-edit';
// import CreateCustomerForm from '@/app/shared/admin/profile/create-profile/customers/page';
import CreateFundiProfileForm from '@/app/shared/service-provider/profile/create-profile/fundi';
import EditFundiForm from '@/app/shared/service-provider/profile/edit-profile';

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