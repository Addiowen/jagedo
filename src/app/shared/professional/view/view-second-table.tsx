'use client';

import { Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';
import ViewTotalsBlock from './view-totals-block';

export default function ViewSecondTable() {
    const values = CREATE_QUOTATION_VIEW_VALUE.secondTable

  return (
    <div className="relative px-2 pt-6 pb-8 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">

        <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Other Expenses</p>

        <div className="grid grid-cols-2 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-1 ps-4 py-2">
            <Text className='text-center font-semibold text-gray-500'>EXPENSES</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2">
            <Text className='text-center font-semibold text-gray-500'>AMOUNT</Text>
        </TableHeaderCell>
        </div>

        <ul className='relative'>
        {/* <> */}
          {values?.map((field, index) => {

            return (
              <Fragment key={`second-table-${index}`}>
                <div>
                  <div className="group grid min-h-10 grid-cols-2 gap-0 border-b border-muted dark:border-muted/20">
                    <div className="col-span-1 p-2 pb-4">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.expenses }</Text>
                    </div>
                    <div className="col-span-1 p-2 relative">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.amount }</Text>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })} 
        {/* </> */}
      </ul>

      <ViewTotalsBlock />
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
