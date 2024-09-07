'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input, Button } from 'rizzui';
import WidgetCard2 from '@/components/cards/widget-card2';
import { useRouter, useSearchParams } from 'next/navigation';
import apiRequest from '@/lib/apiService';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import { requisitions } from '@/data/job-data';

const filterState = {
  date: [null, null],
  status: '',
};

export default  function RequisitionsTable({ className,request }: { className?: string; request: Requisition[]; }) {

console.log(requisitions, "requist");
console.log(request, "req");

  const [pageSize, setPageSize] = useState(7);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
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
  } = useTable(request, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: request,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
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

  const router = useRouter();

  return (
    <WidgetCard2
      className={className}
      headerClassName="mb-2 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto flex justify-between"
      title="Requests"
      titleClassName="whitespace-nowrap font-inter"
      action={
        <div className="flex w-full flex-col-reverse items-center justify-between gap-3 @[42rem]:flex-row @[57rem]:mt-0">
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
          <div className="flex w-full items-center gap-3 @[42rem]:w-auto @[70rem]:w-80">
            <Input
              className="w-full @[42rem]:w-auto"
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
        </div>
      }
    >
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
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
    </WidgetCard2>
  );
}
