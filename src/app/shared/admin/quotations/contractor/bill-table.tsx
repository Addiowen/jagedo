'use client';

import { Button, Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
// import { DragEndEvent } from '@dnd-kit/core';
// import { createId } from '@paralleldrive/cuid2';
import { QuoteInput } from '@/app/shared/create-quotation/create-quotation/quote-forms/quote-input';
import { useFieldArray, useFormContext } from 'react-hook-form';
// import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
import {
  PiPlusCircle,
  PiTrashBold,
  PiArrowsOutCardinalBold,
} from 'react-icons/pi';

type Props = {
  index: number;
};
export default function BillTable({ index }: Props) {
  const { control, register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `bill.${index}.billTable`,
  });

  //   function handleChange(event: DragEndEvent) {
  //     const { active, over } = event;
  //     if (!active || !over) return;
  //     const oldIndex = fields.findIndex((item) => item.id === active.id);
  //     const newIndex = fields.findIndex((item) => item.id === over.id);
  //     move(oldIndex, newIndex);
  //   }

  console.log({ billIndexForTable: index });

  return (
    <>
      <div className="relative">
        {/* <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Professional Fees</p> */}
        {/* <QuoteInput
            inputClassName="[&_input]:text-center"
            placeholder="Bill No."
            {...register(`billTable.${index}.emailAddress`)}
        /> */}

        <div className="grid grid-cols-8 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2 ps-4">
            <Text className="text-center font-semibold text-gray-500">
              ITEM NO.
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-3 flex items-center justify-center py-2">
            <Text className="text-center font-semibold text-gray-500">
              DESCRIPTION
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
            <Text className="text-center font-semibold text-gray-500">
              QUANTITY
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
            <Text className="text-center font-semibold text-gray-500">
              UNITS
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
            <Text className="text-center font-semibold text-gray-500">
              RATE
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
            {fields?.map((field, index) => {
              let rate = getValues(`bill.${index}.billTable.${index}.rate`);
              let quantity = getValues(
                `bill.${index}.billTable.${index}.quantity`
              );
              let amount = rate * quantity;

              console.log({ billTableIndex: index });
              return (
                <Fragment key={`bill-table-${index}`}>
                  <li id={field.id}>
                    <div className="group grid min-h-10 grid-cols-8 gap-0 border-b border-muted dark:border-muted/20">
                      <div className="col-span-1 w-full p-2 pe-4 pt-3 text-center text-gray-900 dark:text-gray-0">
                        {index + 1}
                      </div>

                      <div className="col-span-3 py-2 pe-2 ps-4">
                        <QuoteInput
                          // rows={2}
                          // className="grow"
                          // variant="outline"
                          inputClassName="[&_input]:text-center"
                          placeholder="E.g., Gypsum Board"
                          {...register(
                            `bill.${index}.billTable.${index}.description`
                          )}
                        />
                      </div>

                      <div className="col-span-1 p-2 pb-4">
                        <QuoteInput
                          inputClassName="[&_input]:text-center"
                          placeholder="0"
                          {...register(
                            `bill.${index}.billTable.${index}.quantity`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                        />
                      </div>
                      <div className="col-span-1 p-2">
                        <QuoteInput
                          inputClassName="[&_input]:text-center"
                          placeholder="Enter units"
                          {...register(
                            `bill.${index}.billTable.${index}.units`
                          )}
                        />
                      </div>

                      <div className="col-span-1 p-2">
                        <QuoteInput
                          type="number"
                          placeholder="0"
                          inputClassName="[&_input]:text-center"
                          {...register(
                            `bill.${index}.billTable.${index}.rate`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                        />
                      </div>

                      <div className="relative col-span-1 w-full p-2 pe-4 pt-3 text-center text-gray-900 dark:text-gray-0">
                        {amount ? amount : 0}
                        <div className="absolute end-0 top-0 hidden translate-x-full grid-cols-1 gap-0 overflow-hidden rounded-md border bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.16)] group-hover:grid dark:border-muted/20">
                          {/* <SortableList.DragHandle className="flex h-auto w-full items-center justify-center p-1.5 text-lg hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-700">
                          <PiArrowsOutCardinalBold className="size-4" />
                        </SortableList.DragHandle> */}
                          <button
                            type="button"
                            className="flex h-full w-full items-center justify-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => remove(index)}
                          >
                            <PiTrashBold className="size-4 text-red-dark dark:text-red" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </Fragment>
              );
            })}
          </>
        </ul>

        <Button
          type="button"
          variant="text"
          className="absolute bottom-0 start-0 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
          onClick={() =>
            append({
              description: '',
              quantity: undefined,
              units: '',
              rate: undefined,
            })
          }
        >
          <PiPlusCircle className="size-5" />
          Add Item
        </Button>
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
