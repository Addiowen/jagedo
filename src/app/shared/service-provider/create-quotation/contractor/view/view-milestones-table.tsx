'use client';

import { Collapse, Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { useFormContext } from 'react-hook-form';
// import { PiCaretDownBold } from 'react-icons/pi';

type MilestoneTableType = {
    milestone: string
    percentageDisbursement: number
    milestoneActivity: string
    amount: number
}

export default function ViewMilestonesTable() {
    const { getValues } = useFormContext();
    const values = getValues()
    
  return (
    <>
    {/* <Collapse
        defaultOpen={false}
        className={cn('mx-0 py-5 md:py-7 lg:mx-8')}
        header={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="flex w-full cursor-pointer items-center justify-between text-left font-lexend text-xl font-semibold text-gray-700"
          >
            Bills
            <PiCaretDownBold
              className={cn(
                'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
                open && '-rotate-0 rtl:rotate-0'
              )}
            />
          </button>
        )}
      > */}
        <div className="relative mt-4 mb-4 px-2 pt-6 pb-10 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">
            <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Milestones</p>

            <div className="grid grid-cols-12 gap-4 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
            <TableHeaderCell className="col-span-1 ps-4 py-2">
                <p className='text-center font-semibold text-gray-500'></p>
            </TableHeaderCell>
            <TableHeaderCell className="col-span-3 py-2 flex justify-center items-center">
                <p className='text-center font-semibold text-gray-500'>% DISBURSEMENT</p>
            </TableHeaderCell>
            <TableHeaderCell className="col-span-5 py-2 flex justify-center items-center">
                <p className='text-center font-semibold text-gray-500'>MILESTONE ACTIVITY</p>
            </TableHeaderCell>
            <TableHeaderCell className="col-span-3 py-2 flex justify-center items-center">
                <p className='text-center font-semibold text-gray-500'>AMOUNT (KES)</p>
            </TableHeaderCell>
            </div>

            <ul>
            {values?.milestonesTable.map((field: MilestoneTableType, index: number) => {
                return (
                <Fragment key={`milestones-table-${index}`}>
                    <li>
                    <div className="group grid min-h-10 grid-cols-12 gap-0 border-b border-muted dark:border-muted/20">
                        <div className="col-span-1 py-2 ps-4 pe-2">
                            <Text className='text-center'>{ field.milestone }</Text>
                        </div>

                        <div className="col-span-3 p-2 pb-4">
                            <Text className='text-center'>{ field.percentageDisbursement }</Text>
                        </div>
                        
                        <div className="col-span-5 p-2">
                            <Text className='text-center'>{ field.milestoneActivity }</Text>
                        </div>

                        <div className="col-span-3 p-2">
                            <Text className='text-center'>{ field.amount }</Text>
                        </div>
                    </div>
                    </li>
                </Fragment>
                );
            })}     
            </ul>
        </div>
      {/* </Collapse> */}
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
