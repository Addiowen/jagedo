import IndividualsTable from '@/app/shared/admin/dashboard/tables/customers/individuals';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button, Dropdown } from 'rizzui';

export const metadata = {
  ...metaObject('Customer Register'),
};

const fetchUsers = async () => {
  try {
    const customers = await apiRequest({
      method: 'GET',
      endpoint: `/users`,
    });
    return customers;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function IndividualPage() {
  const individualCustomers = await fetchUsers();
  return (
    <div className="@container">
      <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
        {/* <Link href={routes.admin.createIndividualProfile}>
          <Button>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Customer
          </Button>
        </Link> */}
      </div>
      <div className="grid  gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <IndividualsTable
          customers={individualCustomers}
          className="relative  @4xl:col-span-2 @7xl:col-span-12"
        />
      </div>
    </div>
  );
}
