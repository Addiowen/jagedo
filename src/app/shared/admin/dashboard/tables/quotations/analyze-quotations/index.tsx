'use client';

import { useCallback, useState, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Button, Input, Modal } from 'rizzui';
import { quotationData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import WidgetCard2 from '@/components/cards/widget-card2';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import toast from 'react-hot-toast';
import { routes } from '@/config/routes';

const filterState = {
  date: [null, null],
  status: '',
};
export default function AnalyzeQuotationsTable({
  className,
  quotations,
  bookingRequests,
}: {
  className?: string;
  quotations: any;
  bookingRequests: any;
}) {
  const getparams = useSearchParams();
  const queryId = getparams.get('id');
  const [pageSize, setPageSize] = useState(7);
  const [loading, setIsLoading] = useState(false);

  const requestId = queryId;

  const { data: session } = useSession();

  const assetId = session?.user.metadata.assetId;
  const userEmail = session?.user.metadata.email;
  const userId = session?.user.userId;
  const userPhone = session?.user.metadata.phone;
  const serviceProviderName = `${session?.user.firstname} ${session?.user.lastname}`;

  const assignedPros = bookingRequests || [];

  const otherPros = assignedPros.filter((id: string) => id !== assetId);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleApproveSelection = () => {};

  const formattedQuotations =
    quotations.results.map((item: any, index: number) => {
      return {
        number: index + 1,
        id: item.id || '',
        date: item.createdDate || '',
        uniqueId: item.senderId || '',
        subCategory: item.metadata?.skill || '',
        requestType: `${item.metadata?.packageType}` || '',
        description: item.metadata?.description || '',
        location: item.metadata?.village || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: item.status || '',
      };
    }) || [];

  console.log(formattedQuotations);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let status = 'assigned quotation';

      // First, update the transaction
      await axios.patch(
        `${BASE_URL}/transactions/${requestId}`,
        {
          assetId: assetId,
          status,
          metadata: {
            serviceProviderName,
            bookingRequests: assetId,
            serviceProviderPhones: userPhone,
            serviceProviderEmails: userEmail,
            serviceProviderIds: userId,
          },
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      // If the transaction is successfully updated, remove transactionId from booking requests
      const removeAssetIdFromBookingRequests = async () => {
        const patchRequests = otherPros.map(async (assetId: any) => {
          const res = await axios.patch(
            `${BASE_URL}/assets/${assetId}`,
            {
              metadata: {
                bookingRequests: [],
              },
            },
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
              },
            }
          );

          return res.data;
        });

        const responses = await Promise.all(patchRequests);
        console.log('Asset update responses:', responses);
      };

      await removeAssetIdFromBookingRequests();

      toast.success('Job accepted successfully!');

      // Ensure the router.push happens after everything is done
      router.push(routes.serviceProvider.fundi.activeJobs);
    } catch (error) {
      console.error('Error:', error);
      alert(
        'An error occurred while processing the request. Please try again.'
      );
    } finally {
      setIsLoading(false); // Only set isLoading to false at the end
    }
  };

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
  } = useTable(formattedQuotations, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: formattedQuotations,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        jobId: queryId,
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
      title="Analyze Quotations"
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
        variant="bordered"
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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="mx-auto max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
          <p className="text-1xl mb-6 text-gray-600">
            "Are you sure you want to submit this quotation? Please review the
            details before proceeding. Once submitted, this quotation will be
            sent to the customer for approval."
          </p>
          <Button
            className="mr-6 mt-4 rounded bg-blue-500 px-6 py-2 font-medium text-white transition-all hover:bg-blue-600"
            onClick={handleApproveSelection}
          >
            Approve Selection
          </Button>
          <Button
            className="mt-4 rounded  px-6 py-2 font-medium text-blue-500 transition-all "
            onClick={() => setShowModal(false)}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <div className="mt-6">
        <Button
          onClick={handleOpenModal}
          disabled={selectedRowKeys.length === 0} // Disable if no row is selected
        >
          Submit Quotation
        </Button>
      </div>
    </WidgetCard2>
  );
}
