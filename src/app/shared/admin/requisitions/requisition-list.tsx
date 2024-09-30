'use client';

import { useState } from 'react';
import AdminRequisitionsTable from '@/app/shared/admin/dashboard/tables/requisitions/admin-requisitions';
import { PiPlusBold } from 'react-icons/pi';
import { Button, Tab } from 'rizzui';
import AllCustomersTable from '../dashboard/tables/customers/all';
import AssignIndividuals from '../dashboard/tables/customers/assign-individuals';
import AssignOrganization from '../dashboard/tables/customers/assign-organization';

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
  const [showButton, setShowButton] = useState(true);
  const handleClick = () => {
    setShowAllCustomers(true);
    setShowButton(false);
  };

  const individualCustomers = customers.results;
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
          {showButton && (
            <Button onClick={handleClick} className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create Request
            </Button>
          )}
        </div>
      </div>

      {showAllCustomers && (
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Select a customer to create a request:
          </p>
        </div>
      )}

      <>
        {!showAllCustomers ? (
          <AdminRequisitionsTable
            requests={formattedData}
            className="relative @4xl:col-span-2"
          />
        ) : (
          <div className="@container">
            <Tab>
              <Tab.List>
                <Tab.ListItem>Individual</Tab.ListItem>
                <Tab.ListItem>Organization</Tab.ListItem>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
                    <AssignIndividuals
                      className="relative  @4xl:col-span-2 @7xl:col-span-12"
                      customers={customers}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid grid-cols-1 ">
                    <AssignOrganization customers={customers} />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab>
          </div>
        )}
      </>
    </div>
  );
}
