'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
import { disbursementData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';

const filterState = {
  date: [null, null],
  status: '',
};
export default function DisbursementTable({
  className,
}: {
  className?: string;
}) {
  const [pageSize, setPageSize] = useState(7);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

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
  } = useTable(disbursementData, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: disbursementData,
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
      title="Disbursement"
      titleClassName="whitespace-nowrap font-inter"
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
    </WidgetCard2>
  );
}
