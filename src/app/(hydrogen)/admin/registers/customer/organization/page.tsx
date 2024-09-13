import OrganizationsTable from '@/app/shared/admin/dashboard/tables/customers/organization';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Customer Register'),
};

const fetchUsers = async () => {
  try {
    const fundis = await apiRequest({
      method: 'GET',
      endpoint: `/users`,
    });
    return fundis;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

export default async function CustomerPage() {
  const users = await fetchUsers();
  return (
    <div className="@container">
      <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
        <Link
          href={routes.admin.createOrgCustomerProfile}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          {/* <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Customer
          </Button> */}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <OrganizationsTable
          customers={users}
          className="relative @4xl:col-span-12  @7xl:col-span-8"
        />
      </div>
    </div>
  );
}
