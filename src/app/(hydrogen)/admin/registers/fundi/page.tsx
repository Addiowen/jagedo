import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Fundi Page'),
};

export default function FundisPage() {
  return (
    <div className="@container">
      <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
        <Link
          href={routes.admin.createFundiProfile}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Fundi
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <FundisTable className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
