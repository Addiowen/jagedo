// import Link from 'next/link';
// import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
// import { Button } from 'rizzui';
// import { routes } from '@/config/routes';
// import CreateEditProduct from '@/app/shared/admin/product/create-edit';
// import CreateCustomerForm from '@/app/shared/admin/profile/create-profile/customers/page';
import CreateFundiProfileForm from '@/app/shared/profile-1/profile/create-profile/fundi';

export const metadata = {
  ...metaObject('Professianl Profile'),
};

const pageHeader = {
  title: 'Professional Profile Creation',
  breadcrumb: [
    {
      href: '',
      name: 'Service Providers',
    },
    {
      href: '',
      name: 'Professional',
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

      <CreateFundiProfileForm />
    </>
  );
}