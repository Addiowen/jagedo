'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
import { fundiCompletedJobsData } from '@/data/job-data';
// import FilterElement from './filter-element';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';

const filterState = {
  date: [null, null],
  status: '',
};
export default function FundiCompletedJobsTable({
  className,
  requests,
}: {
  className?: string;
  requests?: any;
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

  console.log(requests);
  const results = requests.results;

  const jobs = results.map(
    (
      result: {
        id: any;
        metadata: {
          date: any;
          skill: any;
          county: any;
          subCounty: any;
          packageType: any;
        };
        assetType: { name: any };
        status: any;
      },
      index: number
    ) => ({
      number: (index + 1).toString(), // Use the index to generate the number
      id: result.id,
      date: result.metadata.date,
      category: 'Fundi',
      subCategory: result.metadata.skill,
      requestType: result.metadata.packageType,
      county: result.metadata.county,
      subCounty: result.metadata.subCounty,
      status: result.status,
      requestTypeId: 1, // Static value or could be mapped if there's a logic for it
    })
  );

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
  } = useTable(jobs, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: jobs,
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
      title="Complete Jobs"
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
        variant="minimal"
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
