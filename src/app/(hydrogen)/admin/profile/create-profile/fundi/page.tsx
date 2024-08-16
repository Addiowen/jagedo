import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/commons/page-header';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import CreateFundiForm from '@/app/shared/admin/profile/create-profile/fundi/page';

export const metadata = {
  ...metaObject('Fundi Profile'),
};

export default function CreateFundiPage() {
  return (
    <>
      <CreateFundiForm />
    </>
  );
}
