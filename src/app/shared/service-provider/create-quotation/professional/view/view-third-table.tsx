'use client';

import { Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { DragEndEvent } from '@dnd-kit/core';
// import { useFieldArray, useFormContext } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { CREATE_QUOTATION_DEFAULT_VALUE, CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';

export default function ViewThirdTable() {
  // const { control, register, } = useFormContext();
  // const { fields, move } = useFieldArray({
  //   control: control,
  //   name: 'thirdTable',
  // });

  const pathname = usePathname()
  const standardTwo = pathname.includes('standard-two')

  // const thirdTableKeys = Object.keys(CREATE_QUOTATION_DEFAULT_VALUE.thirdTable)
  // const fieldNamesStandardOne = ['Professional Fees', 'Total Expenses', 'Total Amount', 'WHT 5%', 'WHT VAT 2%', 'Payable By Client','JaGedo Commission', 'Payable To Service Provider']
  // const fieldNamesStandardTwo = ['Professional Fees', 'Total Expenses', 'Total Amount', 'WHT 5%', 'WHT VAT 2%', 'Payable By Client','Discount', 'Payable To Service Provider']
  const values = CREATE_QUOTATION_VIEW_VALUE.thirdTable
  // type ValueKeys = keyof typeof values
  const keys = ['professionalFees', 'expenses']
  const fieldNames = ['Professional Fees', 'Total Expenses']

  return (
    <div className="relative px-2 pt-6 pb-10 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">

      <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Payment Breakdown</p>

      <div className="grid grid-cols-4 gap-4 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-1 ps-4 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>NO.</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-2 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>DESCRIPTION</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>AMOUNT</Text>
        </TableHeaderCell>
      </div>

      <ul>
        <Fragment>
          <>
          {/* {keys.map((field, index) => {

            return (
              <>
              <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
                <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                    {index + 1}
                </div>  
                <div className="col-span-2 py-2 pt-3 text-center">
                  { fieldNames[index] }
                </div>
                <div className="col-span-1 p-2 pb-4">
                    <Text className='text-center text-gray-900 dark:text-gray-0'>{ values[field] }</Text>
                </div>
              </div>
              </>
            )
          })} */}

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Fees
            </div>
            <div className="col-span-1 p-2 pb-4">
                <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.professionalFees }</Text>
            </div>
          </div>


          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                2
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Expenses
            </div>
            <div className="col-span-1 p-2 pb-4">
                <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.expenses }</Text>
            </div>
          </div>

          <div className="w-full divide-y border-b dark:divide-muted/20">

          <div className="grid grid-cols-2 gap-2 py-4">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                Grand Total                
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
              <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.totalAmount }</Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                WHT 5%                
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
              <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.withholdingTax }</Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                WHT VAT 5%                
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
              <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.whtVat }</Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                JaGedo               
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
              <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.jagedoCommission }</Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                Payable To Service Provider              
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
              <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.payableToServiceProvider }</Text>
            </div>
          </div>

          {/* <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              
            </div>
          </div> */}

        </div>
              

          {/* <div className="group grid min-h-10 grid-cols-12 gap-0 border-b border-muted dark:border-muted/20"> */}
          

          {/* </div> */}
          </>
        </Fragment>
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
