'use client';

import { Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
// import { useFormContext } from 'react-hook-form';
import { CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';
// import { PiCaretDownBold } from 'react-icons/pi';

type MilestoneTableType = {
  milestone: string;
  percentageDisbursement: number;
  milestoneActivity: string;
  amount: number;
};

export default function ViewMilestonesTable({
  submissions,
}: {
  submissions: any;
}) {
  // const { getValues } = useFormContext();
  // const values = getValues()
  const values = CREATE_QUOTATION_VIEW_VALUE.fourthTable;

  return (
    <>
      <div className="relative mb-4 mt-4 rounded-lg border border-muted bg-gray-0 px-2 pb-10 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
        <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
          Milestones
        </p>

        <div className="grid grid-cols-12 gap-4 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
          <TableHeaderCell className="col-span-1 py-2 ps-4">
            <p className="text-center font-semibold text-gray-500"></p>
          </TableHeaderCell>
          <TableHeaderCell className="col-span-3 flex items-center justify-center py-2">
            <p className="text-center font-semibold text-gray-500">
              % DISBURSEMENT
            </p>
          </TableHeaderCell>
          <TableHeaderCell className="col-span-5 flex items-center justify-center py-2">
            <p className="text-center font-semibold text-gray-500">
              MILESTONE ACTIVITY
            </p>
          </TableHeaderCell>
          <TableHeaderCell className="col-span-3 flex items-center justify-center py-2">
            <p className="text-center font-semibold text-gray-500">
              AMOUNT (KES)
            </p>
          </TableHeaderCell>
        </div>

        <ul>
          {submissions?.map((field: MilestoneTableType, index: number) => {
            return (
              <Fragment key={`milestones-table-${index}`}>
                <li>
                  <div className="group grid min-h-10 grid-cols-12 gap-0 border-b border-muted dark:border-muted/20">
                    <div className="col-span-1 py-2 pe-2 ps-4">
                      <Text className="text-center">{field.milestone}</Text>
                    </div>

                    <div className="col-span-3 p-2 pb-4">
                      <Text className="text-center">
                        {field.percentageDisbursement}
                      </Text>
                    </div>

                    <div className="col-span-5 p-2">
                      <Text className="text-center">
                        {field.milestoneActivity}
                      </Text>
                    </div>

                    <div className="col-span-3 p-2">
                      <Text className="text-center">{field.amount}</Text>
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </>
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
