'use client';

import { Button, Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { DragEndEvent } from '@dnd-kit/core';
// import { createId } from '@paralleldrive/cuid2';
import { QuoteInput } from '../quote-forms/quote-input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
import {
  PiPlusCircle,
  PiTrashBold,
  PiArrowsOutCardinalBold,
} from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { CREATE_QUOTATION_DEFAULT_VALUE, FirstTableType, SecondTableType } from '@/utils/create-quotation.schema';

export default function ThirdTable() {
  const { control, register, watch } = useFormContext();
  // const { fields, move } = useFieldArray({
  //   control: control,
  //   name: 'thirdTable',
  // });

  const pathname = usePathname()
  const standardTwo = pathname.includes('standard-two')

  // function handleChange(event: DragEndEvent) {
  //   const { active, over } = event;
  //   if (!active || !over) return;
  //   const oldIndex = fields.findIndex((item) => item.id === active.id);
  //   const newIndex = fields.findIndex((item) => item.id === over.id);
  //   move(oldIndex, newIndex);
  // }

  // const thirdTableKeys = Object.keys(CREATE_QUOTATION_DEFAULT_VALUE.thirdTable)
  const keys = ['professionalFees', 'expenses']
  const fieldNames = ['Professional Fees', 'Total Expenses']
  // const fieldNamesStandardOne = ['Professional Fees', 'Total Expenses', 'Total Amount', 'WHT 5%', 'WHT VAT 2%', 'Payable By Client','JaGedo Commission', 'Payable To Service Provider']
  // const fieldNamesStandardTwo = ['Professional Fees', 'Total Expenses', 'Total Amount', 'WHT 5%', 'WHT VAT 2%', 'Payable By Client','Discount', 'Payable To Service Provider']

  let totalExpenses = watch(`secondTable`).reduce((acc: number, item: SecondTableType) => {
    // if (!item.numberOfHours || !item.ratePerHour) return acc;
    return acc + item.amount
  }, 0);

  let subTotal = watch(`firstTable`).reduce((acc: number, item: FirstTableType) => {
  if (!item.numberOfHours || !item.ratePerHour) return acc;
  return acc + item.numberOfHours * item.ratePerHour;
  }, 0);

  let grandTotal = totalExpenses + subTotal
  let wht = 0.05 * grandTotal
  let whtVatTax = 0.02 * grandTotal
  let jagedoComm = 0.1 * grandTotal
  let spPayable = grandTotal - wht - whtVatTax - jagedoComm

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
                  <QuoteInput
                    type="number"
                    placeholder="0"
                    inputClassName="[&_input]:text-center"
                    {...register(`thirdTable.${field}`, {
                      valueAsNumber: true,
                    })}
                  />
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
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                value={subTotal}
                {...register(`thirdTable.professionalFees`, {
                  valueAsNumber: true,
                })}
              />
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
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                value={totalExpenses}
                {...register(`thirdTable.professionalFees`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          {/* <div className="group grid min-h-10 grid-cols-12 gap-0 border-b border-muted dark:border-muted/20">                             */}

        <div className="w-full divide-y border-b dark:divide-muted/20">

          <div className="grid grid-cols-2 gap-2 py-4">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                Grand Total                
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
              <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                value={grandTotal}
                {...register(`thirdTable.totalAmount`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                WHT 5%                
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
            <QuoteInput
                type="number"
                placeholder="5%"
                inputClassName="[&_input]:text-center"
                value={wht}
                {...register(`thirdTable.withholdingTax`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                WHT VAT 2%                
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
            <QuoteInput
                type="number"
                placeholder="2%"
                inputClassName="[&_input]:text-center"
                value={whtVatTax}
                {...register(`thirdTable.whtVat`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                JaGedo               
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
            <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                value={jagedoComm}
                {...register(`thirdTable.jagedoCommission`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-t">
            <div className='col-span-1 ps-6 font-semibold text-center'>
                Payable To Service Provider              
            </div>
            <div className="text-gray-900 dark:text-gray-0 text-center">
            <QuoteInput
                type="number"
                placeholder="0"
                inputClassName="[&_input]:text-center"
                value={spPayable}
                {...register(`thirdTable.payableToServiceProvider`, {
                  valueAsNumber: true,
                })}
              />
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
          </>
        </Fragment>
      </ul>

      {/* <Button
        type="button"
        variant="text"
        className="absolute bottom-0 start-0 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
        onClick={() =>
          append({
            serviceProvider: '',
            name: '',
            emailAddress: '',
            uniqueId: '',
            numberOfHours: 0,
            ratePerHour: 0,
          },)
        }
      >
        <PiPlusCircle className="size-5" />
        Add Item
      </Button> */}
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
