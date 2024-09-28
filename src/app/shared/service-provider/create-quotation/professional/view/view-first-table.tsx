'use client';

import { Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';

export default function ViewFirstTable({
  professionalFees,
}: {
  professionalFees: any;
}) {
  const values = CREATE_QUOTATION_VIEW_VALUE.firstTable;

  return (
    <div className="relative rounded-lg border border-muted bg-gray-0 px-2 pb-8 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
      <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
        Professional Fees
      </p>

      <div className="grid grid-cols-10 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-2 flex items-center justify-center py-2 ps-4">
          <Text className="text-center font-semibold text-gray-500">
            SERVICE PROVIDER
          </Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 flex items-center justify-center py-2">
          <Text className="text-center font-semibold text-gray-500">NAME</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 flex items-center justify-center py-2">
          <Text className="text-center font-semibold text-gray-500">
            EMAIL ADDRESS
          </Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
          <Text className="text-center font-semibold text-gray-500">
            UNIQUE ID
          </Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
          <Text className="text-center font-semibold text-gray-500">
            NO. OF HOURS
          </Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
          <Text className="text-center font-semibold text-gray-500">
            RATE/HR (KES)
          </Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
          <Text className="text-center font-semibold text-gray-500">
            AMOUNT
          </Text>
        </TableHeaderCell>
      </div>
      <ul>
        {professionalFees?.map((field: any, index: number) => {
          // let rate = getValues(`firstTable.${index}.ratePerHour`);
          // let numOfHours = getValues(`firstTable.${index}.numberOfHours`);
          // let total = rate * numOfHours;
          return (
            <Fragment key={`view-first-table-${index}`}>
              <div>
                <div className="group grid min-h-10 grid-cols-10 gap-0 border-b border-muted dark:border-muted/20">
                  <div className="col-span-2 py-2 pe-2 ps-4">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.serviceProvider}
                    </Text>
                  </div>

                  <div className="col-span-2 p-2 pb-4">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.name}
                    </Text>
                  </div>

                  <div className="col-span-2 p-2">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.emailAddress}
                    </Text>
                  </div>

                  <div className="col-span-1 p-2">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.uniqueId}
                    </Text>
                  </div>

                  <div className="col-span-1 p-2">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.numberOfHours}
                    </Text>
                  </div>

                  <div className="col-span-1 p-2">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.ratePerHour}
                    </Text>
                  </div>

                  <div className="relative col-span-1 w-full p-2 pe-4 pt-3 text-center text-gray-900 dark:text-gray-0">
                    {/* {total ? total : 0} */}
                    {field.numberOfHours * field.ratePerHour}
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

function TableHeaderCell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'font-semibold [&_input]:uppercase [&_input]:text-gray-500 dark:[&_input]:text-gray-400',
        className
      )}
    >
      {children}
    </div>
  );
}
