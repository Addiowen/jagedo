'use client';

import { Text } from 'rizzui';
import { Fragment, useEffect, useState } from 'react';
import cn from '@/utils/class-names';
import { useFormContext } from 'react-hook-form';
import { BillTableType, BillType } from '@/utils/create-contractor-quotation.schema';

// const data = [
//     {
//         billNo: 1,
//         description: 'EXCAVATION',
//     },
//     {
//         billNo: 2,
//         description: 'FOUNDATION',
//     },
//     {
//         billNo: 3,
//         description: 'WALLING',
//     },
//     {
//         billNo: 4,
//         description: 'ROOFING',
//     },
// ]

// type Props = {
//   subTotal: any
// }

export default function ViewBillSummary(/*{ subTotal }: Props*/) {
  const { getValues, watch } = useFormContext();
//   const [contingency, setContingency] = useState(0)
  // const [subTotal, setSubTotal] = useState(0)
  const values = getValues()
//   let subTotal: any
  // let total: number
  // let contingency = undefined

  // useEffect(() => {
  //   console.log({total})
  //   setContingency(0.05 * subTotal)
  //   console.log('useEffect ran')
  //   console.log({contingency})
  // }, [subTotal])

  return (
    <>
    <div className="relative px-2 pt-6 pb-12 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">

      <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Bill Summary</p>

      <div className="grid grid-cols-4 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-1 ps-4 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>BILL NO.</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-2 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>DESCRIPTION</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>AMOUNT</Text>
        </TableHeaderCell>
      </div>

      <ul>
        <>
          {values?.bill.map((field: BillType, index: number) => {
            // let rate = getValues(`bill.${index}.billTable.${index}.rate`);
            // let quantity = getValues(`bill.${index}.billTable.${index}.quantity`);
            // let amount = '300,000';

            let subTotal = watch(`bill.${index}.billTable`).reduce((acc: number, item: BillTableType) => {
              if (!item.quantity || !item.rate) return acc;
              return acc + item.quantity * item.rate;
            }, 0);

            // total += subTotal

            // setSubTotal(
            //     subTotalValue)

            // setContingency(0.05 * subTotal)

            return (
              <Fragment key={`summary-table-${index}`}>
                <li /*id={field.id}*/>
                  <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
                    
                    <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                        {index + 1}
                    </div>  

                    <div className="col-span-2 py-2 pt-3 text-center">
                      {field.billTableTitle}
                    </div>

                    <div className="col-span-1 py-2 pt-3 pb-4 text-center">
                      {/* {subTotal} */}
                      {subTotal ? `${subTotal}` : 22000}
                      {/* 20000 */}
                      {/* {amount} */}
                    </div>
   
                  </div>
                </li>
              </Fragment>
            );
          })}
        <div className="w-full divide-y border-b dark:divide-muted/20">
        {/* <div className="grid grid-cols-4 dark:divide-muted/20"> */}
            {/* <div className='col-span-1 '></div> */}
            {/* <div className='col-span-3 divide-y'> */}
                <div className="grid grid-cols-2 gap-2 py-4 mt-12 border-t">
                    <div className='col-span-1 ps-6 font-semibold text-center'>
                        Contingency @5%                
                    </div>
                    <div className="text-gray-900 dark:text-gray-0 text-center">
                        {/* {contingency ? `${contingency}` : '--'} */}
                        {/* { contingency } */}
                        100,000
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-2 py-4">
                    <div className='col-span-1 ps-6 font-semibold text-center'>
                        Total
                    </div>
                    <div className="text-center text-gray-900 dark:text-gray-0 font-semibold">
                        {/* {totalTax ? `$${totalTax}` : '--'} */}
                        10,000,000
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-2 py-4">
                    <div className='col-span-1 ps-6 font-semibold text-center'>
                        WHT 5%
                    </div>
                    <div className="text-center text-gray-900 dark:text-gray-0">
                        100,000
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-2 py-4">
                    <div className='col-span-1 ps-6 font-semibold text-center'>
                        WHT VAT 2%
                    </div>
                    <div className="text-center text-gray-900 dark:text-gray-0">
                        50,000
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-2 py-4">
                    <div className='col-span-1 ps-6 font-semibold text-center'>
                        JaGedo
                    </div>
                    <div className="text-center text-gray-900 dark:text-gray-0">
                        50,000
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-2 py-4">
                    <div className='col-span-1 ps-6 font-semibold text-center'>
                        Payable To Service Provider
                    </div>
                    <div className="text-center font-semibold text-gray-900 dark:text-gray-0">
                        1,700,000
                    </div>
                </div>

            {/* </div> */}
        </div>
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
