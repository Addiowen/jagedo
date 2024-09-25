'use client';

import { useState } from 'react';
import AdminRequisitionsTable from '@/app/shared/admin/dashboard/tables/requisitions/admin-requisitions';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import AllCustomersTable from '../dashboard/tables/customers/all';

export const metadata = {
  title: 'Admin Requests',
};

export default function AdminRequestsListsComponent({
  transactions,
  customers,
}: {
  transactions: any;
  customers: any;
}) {
  const [showAllCustomers, setShowAllCustomers] = useState(false);

  // Format the data if needed
  const formattedData =
    transactions?.results
      // .filter(
      //   (item: any) => item.status === 'paid' || item.status === 'assigned'
      // )
      .map((item: any, index: number) => {
        return {
          number: index + 1,
          id: item.id || '',
          date: item.createdDate || '',
          category: item.metadata.category,
          subCategory: item.metadata?.profession || item.metadata?.skill || '',
          requestType: `${item.metadata?.packageType}` || '',
          description: item.metadata?.description || '',
          county: item.metadata?.county || '',
          subCounty: item.metadata?.subCounty || '',
          status:
            item.status.charAt(0).toUpperCase() + item.status.slice(1) || '',
        };
      }) || [];

  console.log(formattedData);

  return (
    <div className="@container">
      <div className="mb-6 flex justify-end">
        <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
          <Button
            onClick={() => setShowAllCustomers(true)}
            className="w-full @lg:w-auto"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Request
          </Button>
        </div>
      </div>

      {showAllCustomers && (
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Select a customer to create a request:
          </p>
        </div>
      )}

      <div className="grid grid-cols-1  @4xl:grid-cols-2 3xl:gap-8">
        {!showAllCustomers ? (
          <AdminRequisitionsTable
            requests={formattedData}
            className="relative @4xl:col-span-2"
          />
        ) : (
          <AllCustomersTable
            className="relative @4xl:col-span-2"
            customers={customers}
          />
        )}
      </div>
    </div>
  );
}
