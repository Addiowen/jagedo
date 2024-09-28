'use client';

import { Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';
import ViewTotalsBlock from './view-totals-block';

export default function ViewSecondTable({ otherFees }: { otherFees: any }) {
  const values = CREATE_QUOTATION_VIEW_VALUE.secondTable;

  return (
    <div className="relative rounded-lg border border-muted bg-gray-0 px-2 pb-8 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
      <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
        Other Expenses
      </p>

      <div className="grid grid-cols-2 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-1 py-2 ps-4">
          <Text className="text-center font-semibold text-gray-500">
            EXPENSES
          </Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2">
          <Text className="text-center font-semibold text-gray-500">
            AMOUNT
          </Text>
        </TableHeaderCell>
      </div>

      <ul className="relative">
        {/* <> */}
        {otherFees?.map((field: any, index: any) => {
          return (
            <Fragment key={`second-table-${index}`}>
              <div>
                <div className="group grid min-h-10 grid-cols-2 gap-0 border-b border-muted dark:border-muted/20">
                  <div className="col-span-1 p-2 pb-4">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.expenses}
                    </Text>
                  </div>
                  <div className="relative col-span-1 p-2">
                    <Text className="text-center text-gray-900 dark:text-gray-0">
                      {field.amount}
                    </Text>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
        {/* </> */}
      </ul>

      <ViewTotalsBlock otherFees={otherFees} />
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
