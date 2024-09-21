'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Input, Modal } from 'rizzui';
// import FilterElement from './filter-element';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';
import ReviewCard from '@/app/shared/custom-reviews/review-card-view';

const filterState = {
  date: [null, null],
  status: '',
};
export default function AdminReviewsTable({
  className,
  transactions,
}: {
  className?: string;
  transactions: any;
}) {
  const [pageSize, setPageSize] = useState(7);
  const [viewReviewsModalState, setViewReviewsModalState] = useState(false);

  console.log(transactions, 'transactions');

  const mappedTransactions = transactions.results.map(
    (
      result: {
        id: any;
        createdDate: { [x: string]: any };
        metadata: {
          customerRatingId: string;
          spRatingId: string;
          category: string;
          skill: string;
          packageType: string;
          county: string;
          subCounty: string;
        };
      },
      index: number
    ) => ({
      number: (index + 1).toString() || '',
      id: result.id,
      date: result.createdDate || '',
      category: 'Fundi',
      subCategory: result.metadata.skill || '',
      spRatingId: result.metadata.spRatingId || '',
      customerRatingId: result.metadata.customerRatingId || '',
      requestType: result.metadata.packageType || '',
      county: result.metadata.county || '',
      subCounty: result.metadata.subCounty || '',
      requestTypeId: 0,
    })
  );

  console.log(mappedTransactions);

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
  } = useTable(mappedTransactions, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: mappedTransactions,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        setViewReviewsModalState,
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
    <>
      <Modal
        isOpen={viewReviewsModalState}
        onClose={() => setViewReviewsModalState(false)}
      >
        <div className="p-10">
          <ReviewCard
            reviewer={{ name: 'Joyce Wasike' }}
            message={'Did a good job fixing the wiring'}
            date={new Date()}
            role={'Customer'}
          />
        </div>
      </Modal>

      <WidgetCard2
        className={className}
        headerClassName="mb-2 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
        actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
        title="Reviews"
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
    </>
  );
}
