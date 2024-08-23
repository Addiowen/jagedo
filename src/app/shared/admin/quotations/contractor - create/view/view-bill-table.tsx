'use client';

import { Button, Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { BillTableType } from '@/utils/create-contractor-quotation.schema';

type Props = {
    index: number;
    billTableValues: BillTableType[]
}
export default function ViewBillTable({ index, billTableValues }: Props) {

  return (
    <>
    <div className='relative'>

      {/* <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Professional Fees</p> */}

      <div className="grid grid-cols-8 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-1 ps-4 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>ITEM NO.</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-3 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>DESCRIPTION</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>QUANTITY</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>UNITS</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>RATE</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>AMOUNT</Text>
        </TableHeaderCell>
      </div>

      <ul>
        <>
          {billTableValues?.map((field, index) => {
            // let rate = getValues(`bill.${index}.billTable.${index}.rate`);
            // let quantity = getValues(`bill.${index}.billTable.${index}.quantity`);
            // let amount = rate * quantity;

            // console.log({billTableIndex: index})
            return (
              <Fragment key={`bill-table-${index}`}>
                <li>
                  <div className="group grid min-h-10 grid-cols-8 gap-0 border-b border-muted dark:border-muted/20">
                    
                    <div className="col-span-1 w-full p-2 pe-4 pt-3 text-center text-gray-900 dark:text-gray-0">
                        {index + 1}
                    </div>  

                    <div className="col-span-3 py-2 ps-4 pe-2">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.description }</Text>
                    </div>

                    <div className="col-span-1 p-2 pb-4">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.quantity ? field.quantity : 0 }</Text>
                    </div>

                    <div className="col-span-1 p-2">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.units }</Text>
                    </div>
                    
                    <div className="col-span-1 p-2">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.rate ? field.rate : 0 }</Text>
                    </div>

                    <div className="relative col-span-1 w-full p-2 pe-4 pt-3 text-center text-gray-900 dark:text-gray-0">
                        <Text className='text-center text-gray-900 dark:text-gray-0'>{ field.quantity && field.rate ? field.quantity * field.rate : 0 }</Text>
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}

        {/* <div className="ms-auto w-full max-w-xs divide-y dark:divide-muted/20">
            <div className="grid grid-cols-2 items-center gap-2 pt-4">
                <div className='font-semibold'>
                    Subtotal:
                </div>
                <div className="text-center font-semibold dark:text-gray-0">
                    
                    2,100,000
                </div>
            </div>
        </div> */}
        </>
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
