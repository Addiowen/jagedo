'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
import { contractorData, professionalsData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';
import ListingFilters from '@/app/shared/admin/explore-listing/listing-filters';
import { useSearchParams } from 'next/navigation';

const filterState = {
  date: [null, null],
  status: '',
};
export default function WaterContractorsTable({
  className,
}: {
  className?: string;
}) {
  const [pageSize, setPageSize] = useState(7);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const contractorType = searchParams.get('contractor');

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterContractorData = (data: any[], jobId: string) => {
    if (contractorType === 'Roads') {
      return data.filter((item) => item.contractorType === 'Roads');
    } else if (contractorType === 'Water') {
      return data.filter((item) => item.contractorType === 'Water');
    }
    return data;
  };

  const filteredData = filterContractorData(contractorData, jobId || '');
  console.log(filteredData);

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
  } = useTable(filteredData, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: filteredData,
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
      title="Contractors Register"
      titleClassName="whitespace-nowrap font-inter"
      action={
        <div className="flex">
          {/* <div className=" mt-4 flex w-full flex-col-reverse items-center   gap-3  @[42rem]:flex-row @[57rem]:mt-0">
            <FilterElement
              isFiltered={isFiltered}
              filters={filters}
              updateFilter={updateFilter}
              handleReset={handleReset}
            />

          </div> */}
          <Input
            className="w-full justify-end @[42rem]:w-auto @[70rem]:w-80"
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
    </WidgetCard2>
  );
}
