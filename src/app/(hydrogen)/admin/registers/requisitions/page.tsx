import AdminRequisitionsTable from '@/app/shared/admin/dashboard/tables/requisitions/admin-requisitions';
import AdminRequestsListsComponent from '@/app/shared/admin/requisitions/requisition-list';
import DropDownComponent from '@/components/dropdown/dropdown';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Admin Req'),
};

const fetchTransactions = async () => {
  try {
    const transactionDetails = await apiRequest({
      method: 'GET',
      endpoint: `/transactions?orderBy=createdDate&order=desc&status=assigned,paid
`,
    });
    return transactionDetails;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
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

export default async function AdminRequisitionsPage() {
  const transactions = await fetchTransactions();
  const customers = await fetchUsers();

  // Format the data if needed

  return (
    <div className="@container">
      <AdminRequestsListsComponent
        customers={customers}
        transactions={transactions}
      />
    </div>
  );
}
