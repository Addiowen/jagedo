'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/roles-permissions/users-table/columns';
import { Loader } from 'rizzui';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
const FilterElement = dynamic(
  () => import('@/app/shared/roles-permissions/users-table/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/commons/table-footer'), {
  ssr: false,
});

const filterState = {
  role: '',
  status: '',
};

export default function UsersTable({ data }: { data: any }) {
  const router = useRouter();

  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  // Default to empty array if data.results is undefined or null
  const allUsers = data?.results || [];

  console.log(allUsers);

  const mappedUsers =
    allUsers
      .filter((item: any) => item.metadata.role === 'admin')
      .map((item: any, index: number) => {
        return {
          no: index + 1,
          id: item.id || '',
          date: item.createdDate || '',
          type: item.metadata?.type || '',
          firstname: item.firstname || '',
          lastname: item.lastname || '',
          organizationName: item.organizationName || '',
          email: item.email || '',
          role: item.metadata?.role || 'N/A',
          phone: item.metadata?.phone || '',
          skill: item.metadata?.skill || '',
          county: item.metadata?.county || '',
          subCounty: item.metadata?.subCounty || '',
          status: item.metadata?.status || '',
        };
      }) || [];

  console.log(mappedUsers);

  const onDeleteItem = useCallback(async (id: string) => {
    try {
      // Assuming the DELETE endpoint is something like `/users/:id`
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
          },
        }
      );

      console.log('User deleted:', response.data);

      toast.success('User Removed successfully!');
      handleDelete(id);
      // Refresh the page or component after successful deletion
      router.refresh();
    } catch (error) {
      console.error('Error deleting user:', error);
      // Optionally, display an error notification here
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(mappedUsers, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: mappedUsers,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div className="mt-14">
      <FilterElement
        isFiltered={isFiltered}
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />

      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader /> {/* Ensure Loader is imported and used correctly */}
        </div>
      ) : mappedUsers.length === 0 ? (
        <div className="flex h-60 items-center justify-center">
          <p>No users found.</p>
        </div>
      ) : (
        <ControlledTable
          variant="modern"
          data={tableData}
          showLoadingText={true}
          // @ts-ignore
          columns={visibleColumns}
          paginatorOptions={{
            pageSize,
            setPageSize,
            total: totalItems,
            current: currentPage,
            onChange: (page: number) => handlePaginate(page),
          }}
          tableFooter={
            <TableFooter
              checkedItems={selectedRowKeys}
              handleDelete={(ids: string[]) => {
                setSelectedRowKeys([]);
                handleDelete(ids);
              }}
            />
          }
          className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        />
      )}
    </div>
  );
}
