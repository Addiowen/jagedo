import IndividualsTable from '@/app/shared/admin/dashboard/tables/customers/individuals';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button, Dropdown } from 'rizzui';

export const metadata = {
  ...metaObject('Customer Register'),
};

export default function IndividualPage() {
  return (
    <div className="@container">
      <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
        <Link href={routes.admin.createIndividualProfile}>
          <Button>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Customer
          </Button>
        </Link>
      </div>
      <div className="grid  gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <IndividualsTable className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
