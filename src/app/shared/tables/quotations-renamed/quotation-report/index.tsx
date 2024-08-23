'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input, Textarea } from 'rizzui';
import { jobData, quotationReportData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';

const filterState = {
  date: [null, null],
  status: '',
};

const data = [
  {},
  // {
  //   SiteConditions: 'Construction site Ongoing',
  //   'Deadline for Quoatation Submition': '3/4/2024, 7.00am',
  //   Specifications: 'Plumber-Busted Pipe',
  //   'Job No': 'A01137-RFQ',
  // },
  // {
  //   'Invoice date': 'Jun 15, 2023',
  //   'Package Type': 'Flat small box',
  //   'Courier Company': 'Cargus',
  // },
  // {
  //   'Delivery time': 'TNT 10-14 DAYS',
  //   'Payment Method': 'Cash on delivery',
  //   'Shipping Mode': 'Next Day',
  // },
];
export default function QuotationReports({
  className,
}: {
  className?: string;
}) {
  const [pageSize, setPageSize] = useState(7);
  const [message, setMessage] = useState('Paul Mwaura, Highest Rating');

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
  } = useTable(quotationReportData, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: quotationReportData,
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
      title=""
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
      <div className="-ml-8 grid items-start rounded-xl border-none border-gray-300  @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4">
        <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
            <span className=" font-semibold text-gray-900">
              SiteConditions :
            </span>
            Construction underway
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Deadline:</span>
            3/4/2024, 7.00am
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">
              Specifications :
            </span>
            Busted Pipe
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Job No :</span>
            A01137-RFQ
          </li>
        </ul>
        {data.map((item, index) => (
          <ul key={index} className="mt-3 grid gap-3 @5xl:mt-0">
            {Object.entries(item).map(([key, value]) => (
              <li key={key} className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">{key} :</span>
                {/* <span>{value}</span> */}
              </li>
            ))}
          </ul>
        ))}
      </div>
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
      <Textarea
        readOnly
        className="mt-8"
        label="Recommendation"
        value={message}
        size="sm"
      />
    </WidgetCard2>
  );
}
