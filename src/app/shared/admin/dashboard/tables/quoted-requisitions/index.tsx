'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input, Modal } from 'rizzui';
import { quotedRequisitionsData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';

const filterState = {
  date: [null, null],
  status: '',
};
export default function QuotedRequisitionsTable({
  className,
  transactions,
}: {
  transactions: any;
  className?: string;
}) {
  const [pageSize, setPageSize] = useState(7);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  console.log(transactions);

  const formattedData =
    transactions?.results
      .filter((item: any) => item.metadata.category !== 'fundi')
      .map((item: any, index: number) => {
        return {
          number: index + 1,
          id: item.id || '',
          date: item.createdDate || '',
          category: item.metadata.category,
          subCategory:
            item.metadata?.profession ||
            item.metadata?.skill ||
            item.metadata?.contractor ||
            '',
          requestType: `${item.metadata?.packageType}` || '',
          description: item.metadata?.description || '',
          county: item.metadata?.county || '',
          subCounty: item.metadata?.subCounty || '',
          status:
            item.status.charAt(0).toUpperCase() + item.status.slice(1) || '',
        };
      }) || [];

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
  } = useTable(formattedData, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: formattedData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: (id: string) => {
          handleRowSelect(id);
          setSelectedRow(id);
          setIsModalOpen(true);
        },
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const confirmSelection = () => {
    closeModal();
  };

  return (
    <WidgetCard2
      className={className}
      headerClassName="mb-2 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="QUOTATIONS"
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

      {/* {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <p>Are you sure you want to select this item?</p>
            <button onClick={confirmSelection}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </Modal>
      )} */}
    </WidgetCard2>
  );
}
