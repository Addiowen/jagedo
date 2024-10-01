'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Button, Input, Loader } from 'rizzui'; // Import Loader from rizzui
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

export default function AssignContractorsTable({
  className,
  contractors,
}: {
  className?: string;
  contractors: any;
}) {
  const [pageSize, setPageSize] = useState(7);
  const [assets, setAssets] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]); // State to hold selected row IDs
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedRowPhones, setSelectedRowPhones] = useState<string[]>([]); // State for selected phone numbers
  const [selectedRowEmails, setSelectedRowEmails] = useState<string[]>([]); // State for selected emails
  const [userAssetIds, setSelectedUserAssetIds] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const transactionId = searchParams.get('requestId');
  const packageType = searchParams.get('requestType');

  const router = useRouter();

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
  } = useTable(contractors, pageSize, filterState);

  console.log(contractors);

  // Update selectedRowIds whenever selectedRowKeys changes
  useEffect(() => {
    setSelectedRowIds(selectedRowKeys);
  }, [selectedRowKeys]);

  const newBookedRequests = {
    status: 'assigned',
    metadata: {
      bookingRequests: selectedRowIds,
      serviceProviderIds: userAssetIds,
      serviceProviderPhones: selectedRowPhones,
      serviceProviderEmails: selectedRowEmails,
    },
  };

  const assetIds = selectedRowIds;

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
    } catch (error) {}
  };

  let responses;

  const assignTransactionIdtoAssets = async (
    assetIds: string[],
    requestTransactionId: string
  ) => {
    try {
      const patchRequests = assetIds.map(async (assetId) => {
        // Fetch the current asset data
        const currentAsset = await axios.get(`${BASE_URL}/assets/${assetId}`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        });

        // Get the current bookingRequests array (or initialize it as an empty array)
        const existingBookingRequests =
          currentAsset.data.metadata.bookingRequests || [];

        // Append the new transaction ID to the array
        const updatedBookingRequests = [
          ...existingBookingRequests,
          requestTransactionId,
        ];

        // Send the patch request to update the asset
        const res = await axios.patch(
          `${BASE_URL}/assets/${assetId}`,
          {
            metadata: {
              bookingRequests: updatedBookingRequests,
            },
          },
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
            },
          }
        );

        // Update the local state (if necessary)
        setAssets(res.data);

        if (assets) {
          return assets as any;
        }
      });

      const responses = await Promise.all(patchRequests);
    } catch (error) {
      console.error('Error updating assets:', error);
    }
  };

  useEffect(() => {
    const selectedPhones = contractors
      .filter((professional: any) => {
        console.log('Filtering fundi:', professional); // Log fundi object during filter
        return selectedRowKeys.includes(professional.id);
      })
      .map((professional: any) => professional.phone);
    const selectedEmails = contractors
      .filter((professional: any) => selectedRowKeys.includes(professional.id))
      .map((professional: any) => professional.email);

    const selectedAssetUserIds = contractors
      .filter((professional: any) => selectedRowKeys.includes(professional.id))
      .map((professional: any) => professional.userId);

    setSelectedUserAssetIds(selectedAssetUserIds);
    setSelectedRowIds(selectedRowKeys);
    setSelectedRowPhones(selectedPhones);
    setSelectedRowEmails(selectedEmails);
  }, [selectedRowKeys, contractors]);

  const handleAssign = async () => {
    if (selectedRowIds.length === 0) {
      toast.error('No fundis selected. Please select fundis to assign.');
      return;
    }

    setLoading(true); // Start loading

    const result = await assignAssetIdstoTransaction();

    if (result) {
      if (transactionId) {
        await assignTransactionIdtoAssets(selectedRowIds, transactionId);

        toast.success('Request sent, Contractors have been assigned!');
        router.push(routes.admin.dashboard);
      }
    } else {
      console.error('assets update failed');
      toast.error('Assignment failed please try again later');
    }
    setLoading(false); // End loading
  };

  const columns = useMemo(
    () =>
      getColumns({
        data: contractors,
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
      title="Contractors Register"
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

      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <Loader /> {/* Use the Loader from rizzui */}
        </div>
      )}

      <div className="mt-6">
        <div className="mt-6">
          <Button
            onClick={handleAssign}
            disabled={loading || selectedRowIds.length === 0}
          >
            {loading ? 'Assigning...' : 'Assign'}
          </Button>
        </div>
      </div>
    </WidgetCard2>
  );
}
