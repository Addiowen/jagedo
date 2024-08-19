'use client';

import { Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';

export default function ViewFirstTable() {
    const values = CREATE_QUOTATION_VIEW_VALUE.firstTable

  return (
    <div className="relative px-2 pt-6 pb-8 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">

      <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Professional Fees</p>

      <div className="grid grid-cols-10 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-2 ps-4 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>SERVICE PROVIDER</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>NAME</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>EMAIL ADDRESS</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>UNIQUE ID</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>NO. OF HOURS</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>RATE/HR (KES)</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>AMOUNT</Text>
        </TableHeaderCell>
      </div>
      <ul>
          {values?.map((field, index) => {
            // let rate = getValues(`firstTable.${index}.ratePerHour`);
            // let numOfHours = getValues(`firstTable.${index}.numberOfHours`);
            // let total = rate * numOfHours;
            return (
              <Fragment key={`view-first-table-${index}`}>
                <div>
                  <div className="group grid min-h-10 grid-cols-10 gap-0 border-b border-muted dark:border-muted/20">
                    
                    <div className="col-span-2 py-2 ps-4 pe-2">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.serviceProvider}</Text>
                    </div>

                    <div className="col-span-2 p-2 pb-4">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.name }</Text>
                    </div>

                    <div className="col-span-2 p-2">
                      <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.emailAddress }</Text>
                    </div>

                    <div className="col-span-1 p-2">
                      <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.uniqueId }</Text>
                    </div>

                    <div className="col-span-1 p-2">
                      <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.numberOfHours }</Text>
                    </div>

                    <div className="col-span-1 p-2">
                      <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.ratePerHour }</Text>
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
