// import Link from 'next/link';
// import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
// import { Button } from 'rizzui';
// import { routes } from '@/config/routes';
// import CreateEditProduct from '@/app/shared/admin/product/create-edit';
// import CreateCustomerForm from '@/app/shared/admin/profile/create-profile/customers/page';
// import CreateFundiProfileForm from '@/app/shared/service-provider/profile/create-profile/fundi';
import CreateContractorProfileForm from '@/app/shared/service-provider/profile/create-profile/contractor';

export const metadata = {
  ...metaObject('Profile'),
};

const pageHeader = {
  title: 'Contractor Profile Creation',
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

      <CreateContractorProfileForm />
    </>
  );
}