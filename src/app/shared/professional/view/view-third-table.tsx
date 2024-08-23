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

  const thirdTableKeys = Object.keys(CREATE_QUOTATION_DEFAULT_VALUE.thirdTable)
  const fieldNamesStandardOne = ['Professional Fees', 'Total Expenses', 'Total Amount', 'WHT 5%', 'WHT VAT 2%', 'Payable By Client','JaGedo Commission', 'Payable To Service Provider']
  const fieldNamesStandardTwo = ['Professional Fees', 'Total Expenses', 'Total Amount', 'WHT 5%', 'WHT VAT 2%', 'Payable By Client','Discount', 'Payable To Service Provider']
  const values = CREATE_QUOTATION_VIEW_VALUE.thirdTable
  type ValueKeys = keyof typeof values

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
          {thirdTableKeys.map((field, index) => {

            return (
              <>
              <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
                <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                    {index + 1}
                </div>  
                <div className="col-span-2 py-2 pt-3 text-center">
                  {standardTwo? fieldNamesStandardTwo[index] : fieldNamesStandardOne[index]}
                </div>
                <div className="col-span-1 p-2 pb-4">
                  {/* <QuoteInput
                    inputClassName="[&_input]:text-center"
                    placeholder="Name"
                    {...register(`thirdTable.${field}`)}
                  /> */}
                  {/* <QuoteInput
                    type="number"
                    placeholder="0"
                    inputClassName="[&_input]:text-center"
                    {...register(`thirdTable.${field}`, {
                      valueAsNumber: true,
                    })}
                  /> */}
                    <Text className='text-center text-gray-900 dark:text-gray-0'>{ values[field as ValueKeys] }</Text>
                </div>
              </div>
              </>
            )
          })}

          {/* <div className="group grid min-h-10 grid-cols-12 gap-0 border-b border-muted dark:border-muted/20"> */}
          
          
          
          
          {/* <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                inputClassName="[&_input]:text-center"
                placeholder="Name"
                {...register(`thirdTable.professionalName`)}
              />
            </div>
          </div>

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                {...register(`thirdTable.professionalFees`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                {...register(`thirdTable.expenses`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                {...register(`thirdTable.totalAmount`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                type="number"
                placeholder="5%"
                inputClassName="[&_input]:text-center"
                {...register(`thirdTable.withholdingTax`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                {...register(`thirdTable.payableByClient`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                {...register(`thirdTable.jagedoCommission`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
            <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                1
            </div>  
            <div className="col-span-2 py-2 pt-3 text-center">
              Professional Name
            </div>
            <div className="col-span-1 p-2 pb-4">
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                {...register(`thirdTable.payableToServiceProvider`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div> */}

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
