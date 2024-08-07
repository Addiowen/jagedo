'use client';

import { Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
// import { DragEndEvent } from '@dnd-kit/core';
// import { createId } from '@paralleldrive/cuid2';
// import { QuoteInput } from '../quote-forms/quote-input';
// import { useFieldArray, useFormContext } from 'react-hook-form';
// // import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
// import {
//   PiPlusCircle,
//   PiTrashBold,
//   PiArrowsOutCardinalBold,
// } from 'react-icons/pi';

const data = [
  {
    billNo: 1,
    description: 'EXCAVATION',
  },
  {
    billNo: 2,
    description: 'FOUNDATION',
  },
  {
    billNo: 3,
    description: 'WALLING',
  },
  {
    billNo: 4,
    description: 'ROOFING',
  },
];

export default function BillSummary() {
  //   const { control, register, getValues } = useFormContext();
  //   const { fields, append, remove, } = useFieldArray({
  //     control: control,
  //     name: `bill.${index}.billTable`,
  //   });

  //   function handleChange(event: DragEndEvent) {
  //     const { active, over } = event;
  //     if (!active || !over) return;
  //     const oldIndex = fields.findIndex((item) => item.id === active.id);
  //     const newIndex = fields.findIndex((item) => item.id === over.id);
  //     move(oldIndex, newIndex);
  //   }

  return (
    <>
      <div className="relative rounded-lg border border-muted bg-gray-0 px-2 pb-14 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
        <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
          Bill Summary
        </p>

        <div className="grid grid-cols-4 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2 ps-4">
            <Text className="text-center font-semibold text-gray-500">
              BILL NO.
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-2 flex items-center justify-center py-2">
            <Text className="text-center font-semibold text-gray-500">
              DESCRIPTION
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
            <Text className="text-center font-semibold text-gray-500">
              AMOUNT
            </Text>
          </TableHeaderCell>
        </div>

        <ul>
          <>
            {data?.map((field, index) => {
              // let rate = getValues(`bill.${index}.billTable.${index}.rate`);
              // let quantity = getValues(`bill.${index}.billTable.${index}.quantity`);
              let amount = '300,000';

              return (
                <Fragment key={`summary-table-${index}`}>
                  <li /*id={field.id}*/>
                    <div className="group grid min-h-10 grid-cols-4 gap-0 border-b border-muted dark:border-muted/20">
                      <div className="col-span-1 w-full p-2 pt-3 text-center text-gray-900 dark:text-gray-0">
                        {field.billNo}
                      </div>

                      <div className="col-span-2 py-2 pt-3 text-center">
                        {field.description}
                      </div>

                      <div className="col-span-1 py-2 pb-4 pt-3 text-center">
                        {amount}
                      </div>
                    </div>
                  </li>
                </Fragment>
              );
            })}
            <div className="ms-auto w-full max-w-xl divide-y dark:divide-muted/20">
              {/* {/ <div className="grid grid-cols-4 dark:divide-muted/20"> /} */}
              {/* {/ <div className='col-span-1 '></div> /} */}
              {/* {/ <div className='col-span-3 divide-y'> /} */}
              <div className="grid grid-cols-4 items-center gap-2 py-4 pt-8">
                <div className="col-span-3 ps-6 font-semibold">
                  Contingency @5%
                </div>
                <div className="text-start text-gray-900 dark:text-gray-0">
                  {/* {/ {subTotal ? `$${subTotal}` : '--'} /} */}
                  100,000
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-2 py-4">
                <div className="col-span-3 ps-6 font-semibold">TOTAL</div>
                <div className="text-start font-semibold text-gray-900 dark:text-gray-0">
                  {/* {/ {totalTax ? `$${totalTax}` : '--'} /} */}
                  2,100,000
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-2 py-4">
                <div className="col-span-3 ps-6 font-semibold">WHT 5%</div>
                <div className="text-start text-gray-900 dark:text-gray-0">
                  100,000
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-2 py-4">
                <div className="col-span-3 ps-6 font-semibold">WHT VAT 2%</div>
                <div className="text-start text-gray-900 dark:text-gray-0">
                  50,000
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-2 py-4">
                <div className="col-span-3 ps-6 font-semibold">JAGEDO</div>
                <div className="text-start text-gray-900 dark:text-gray-0">
                  50,000
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-2 py-4">
                <div className="col-span-3 ps-6 font-semibold">
                  PAYABLE TO SERVICE PROVIDER
                </div>
                <div className="text-start font-semibold text-gray-900 dark:text-gray-0">
                  1,700,000
                </div>
              </div>
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
