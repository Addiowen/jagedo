import { usersData } from '@/data/users-data';
import PageHeader from '@/app/shared/commons/page-header';
import ModalButton from '@/app/shared/commons/modal-button';
import RolesGrid from '@/app/shared/roles-permissions/roles-grid';
import UsersTable from '@/app/shared/roles-permissions/users-table';
import CreateRole from '@/app/shared/roles-permissions/create-role';
import apiRequest from '@/lib/apiService';

const pageHeader = {
  title: 'User Management ',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'User and Role management',
    },
  ],
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

export default async function UsermanagementPage() {
  const users = await fetchUsers();
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ModalButton label="Add New Role" view={<CreateRole />} /> */}
      </PageHeader>
      {/* <RolesGrid /> */}
      <UsersTable data={users} />
    </>
  );
}
