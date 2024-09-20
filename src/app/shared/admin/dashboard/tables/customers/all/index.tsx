'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Badge, Button, Input } from 'rizzui';
import { professionalsData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

const filterState = {
  date: [null, null],
  status: '',
};

export default function AllCustomersTable({
  className,
  customers,
}: {
  className?: string;
  customers: any;
}) {
  console.log(customers, 'organization customers');
  const allCustomers = customers.results.filter(
    (item: { metadata: { role: string; assetId?: string; type: string } }) =>
      item.metadata.type === 'organization' ||
      item.metadata.type === 'individual'
  );
  const router = useRouter();
  const [pageSize, setPageSize] = useState(7);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  console.log(allCustomers);

  const filteredCustomers =
    allCustomers?.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        type: item.metadata.type || '',
        firstName:
          item.metadata.type === 'individual' ? item.firstname || '' : 'N/A', // Set firstname only for individuals
        lastName:
          item.metadata.type === 'individual' ? item.lastname || '' : 'N/A', // Set lastname only for individuals
        organizationName:
          item.metadata.type === 'organization'
            ? item.metadata.organizationName || ''
            : 'N/A', // Set organizationName only for organizations
        email: item.email || '',
        phone: item.metadata?.phone || '',
        skill: item.metadata?.skill || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: item.metadata?.status || '',
      };
    }) || [];

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
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
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(filteredCustomers, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: filteredCustomers,
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

  const { visibleColumns } = useColumn(columns);

  return (
    <WidgetCard2
      className={className}
      headerClassName="mb-2 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title=" Customers Register"
      titleClassName="whitespace-nowrap font-inter"
      action={
        <div className=" mt-4 flex w-full flex-col-reverse items-center justify-between  gap-3  @[42rem]:flex-row @[57rem]:mt-0">
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
          <Input
            className="w-full @[42rem]:w-auto @[70rem]:w-80"
            type="search"
            placeholder="Search for user details..."
            inputClassName="h-9"
            value={searchTerm}
            onClear={() => handleSearch('')}
            onChange={(event) => handleSearch(event.target.value)}
            clearable
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
        </div>
      }
    >
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
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
        className="-mx-5 lg:-mx-5"
      />
      {selectedRowKeys.length > 0 && (
        <div className="mt-4">
          <Button
            onClick={() => {
              const idsQueryString = selectedRowKeys.join(',');

              // Use router to navigate with the query string
              router.push(
                `${routes.admin.createRequest}?ids=${idsQueryString}`
              );
            }}
          >
            Create Request
          </Button>
        </div>
      )}
    </WidgetCard2>
  );
}
