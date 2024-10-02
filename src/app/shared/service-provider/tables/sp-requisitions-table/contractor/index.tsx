'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input } from 'rizzui';
import { contractorRequisitionData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';

const filterState = {
  date: [null, null],
  status: '',
};
export default function ContractorRequisitionsTable({
  className,
  requestDetails,
}: {
  className?: string;
  requestDetails: any;
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

  const requests = requestDetails?.results || [];

  const transformedRequests = requests.map(
    (
      requestDetails: {
        id: any;
        createdDate: any;
        metadata: {
          contractor: string;
          subCategory: string;
          category: string;
          packageType: string;
          county: string;
          subCounty: string;
          skill: string;
          managed: string;
        };
        status: any;
      },
      index: number
    ) => ({
      number: index + 1, // Generate sequential number
      id: requestDetails.id,
      date: requestDetails.createdDate, // Extract date from createdDate
      category: requestDetails.metadata.category || 'Contractor', // Use a default value
      subCategory:
        requestDetails.metadata.skill ||
        requestDetails.metadata.contractor ||
        '', // Map 'packageType' to 'subCategory'
      requestType: `${requestDetails.metadata.packageType}` || '', // Construct 'requestType'
      county: requestDetails.metadata.county || '', // Map 'county'
      subCounty: requestDetails.metadata.subCounty || '', // Map 'subCounty'
      status: requestDetails.status, // Directly map 'status'
      requestTypeId: requestDetails.id, // No direct mapping, using id as requestTypeId
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
  } = useTable(transformedRequests, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: transformedRequests,
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
      title="Requests"
      titleClassName="whitespace-nowrap font-inter"
      action={
        <div className=" mt-4 flex w-full flex-col-reverse items-center justify-between  gap-3  @[42rem]:flex-row @[57rem]:mt-0">
          {/* <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          /> */}
          <div></div>
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
