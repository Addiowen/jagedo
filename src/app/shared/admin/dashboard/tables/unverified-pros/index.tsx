'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Button, Input } from 'rizzui';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';
import apiRequest from '@/lib/apiService';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';

const filterState = {
  date: [null, null],
  status: '',
};

export default function UnverifiedProfessionalsTable({
  className,
  fundis,
}: {
  className?: string;
  fundis: any;
}) {
  const [pageSize, setPageSize] = useState(7);
  const [assets, setAssets] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]); // State to hold selected row IDs

  const searchParams = useSearchParams();
  const transactionId = searchParams.get('requestId');
  const router = useRouter();

  console.log(selectedRowIds);

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
  } = useTable(fundis, pageSize, filterState);

  // Update selectedRowIds whenever selectedRowKeys changes
  useEffect(() => {
    setSelectedRowIds(selectedRowKeys);
  }, [selectedRowKeys]);

  const newBookedRequests = {
    metadata: {
      bookedRequests: [selectedRowIds],
    },
  };

  const assetIds = selectedRowIds;
  console.log(assetIds);

  const assignAssetIdstoTransaction = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/transactions/${transactionId}`,
        newBookedRequests,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      const transaction = res.data;

      if (transaction) {
        return transaction as any;
      }
    } catch (error) {
      console.log(error);
    }
  };

  let responses;

  const assignTransactionIdtoAssets = async (
    assetIds: string[],
    requesttransactionId: string
  ) => {
    try {
      const patchRequests = assetIds.map(async (assetId) => {
        const res = await axios.patch(
          `${BASE_URL}/assets/${assetId}`,
          { metadata: { requesttransactionId } },
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
            },
          }
        );

        setAssets(res.data);
        console.log(assets, 'this');

        if (assets) {
          return assets as any;
        }
      });
      responses = await Promise.all(patchRequests);
      console.log('All assets updated successfully:', responses);
    } catch (error) {
      console.error('Error updating assets:', error);
    }
  };

  const handleAssign = async () => {
    const result = await assignAssetIdstoTransaction();
    console.log(result);

    if (result) {
      console.log('Transaction updated successfully:', result);
      if (transactionId) {
        const updatedAssets = await assignTransactionIdtoAssets(
          selectedRowIds,
          transactionId
        );
        if (result && assets) {
          toast.success('Request sent, Fundis have been assigned!');
          router.push(routes.admin.dashboard);
        }
      }
    } else {
      console.error('assets update failed');
    }
  };

  const columns = useMemo(
    () =>
      getColumns({
        data: fundis,
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

  return (
    <WidgetCard2
      className={className}
      headerClassName="mb-2 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="Professionals Register"
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
    </WidgetCard2>
  );
}
