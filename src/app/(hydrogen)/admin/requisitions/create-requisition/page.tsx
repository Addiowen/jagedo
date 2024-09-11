import { metaObject } from '@/config/site.config';
import CreateRequestComponent from '@/app/shared/admin/requisitions/create-requisition';
import Link from 'next/link';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import GenerateInvoiceFundi from '@/app/shared/customers/requisitions/create-requisition/fundi';
import apiRequest from '@/lib/apiService';
import GenerateInvoiceAdmin from '@/app/shared/admin/requisitions/generate-invoice';

export const metadata = {
  ...metaObject('Create Requsition'),
};

const fetchUsers = async (ids: string[]) => {
  try {
    const fundis = await apiRequest({
      method: 'GET',
      endpoint: `/users?id=${ids}`, // Use comma-separated IDs
    });
    return fundis;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    return null;
  }
};

const pageHeader = {
  title: 'Professional',
};

export default async function CreateRequestPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const id = searchParams.ids || [];
  const users = await fetchUsers(id);

  console.log(id, 'Id');

  console.log(users, 'users');

  if (!users) {
    return <div>Failed to load user details.</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

  const zohoIds = users.results.map((user: any) => user.metadata.zohoid);
  const customerUserIds = users.results.map((user: any) => user.zohoid);

  console.log(zohoIds, 'zohoids');

  return (
    <div className="@container">
      {/* <PageHeader title={pageHeader.title}></PageHeader> */}

      {/* <CreateRequestComponent /> */}
      <GenerateInvoiceAdmin zohoIds={zohoIds} />
    </div>
  );
}
