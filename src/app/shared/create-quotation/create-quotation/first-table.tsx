'use client';

import { Button, Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { DragEndEvent } from '@dnd-kit/core';
// import { createId } from '@paralleldrive/cuid2';
import { QuoteInput } from './quote-forms/quote-input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
import {
  PiPlusCircle,
  PiTrashBold,
  PiArrowsOutCardinalBold,
} from 'react-icons/pi';

export default function FirstTable() {
  const { control, register, getValues } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: 'firstTable',
  });

  function handleChange(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);
    move(oldIndex, newIndex);
  }

  return (
    <div className="relative px-2 pt-6 pb-14 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">

      <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Professional Fees</p>

      <div className="grid grid-cols-10 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-2 ps-4 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>SERVICE PROVIDER</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>NAME</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>EMAIL ADDRESS</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>UNIQUE ID</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>NO. OF HOURS</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>RATE/HR (KES)</Text>
        </TableHeaderCell>
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='text-center font-semibold text-gray-500'>AMOUNT</Text>
        </TableHeaderCell>
      </div>
      <ul>
        <SortableList items={fields} onChange={handleChange}>
          {fields?.map((field, index) => {
            let rate = getValues(`firstTable.${index}.ratePerHour`);
            let numOfHours = getValues(`firstTable.${index}.numberOfHours`);
            let total = rate * numOfHours;
            return (
              <Fragment key={`first-table-${index}`}>
                <SortableList.Item id={field.id}>
                  <div className="group grid min-h-10 grid-cols-10 gap-0 border-b border-muted dark:border-muted/20">
                    <div className="col-span-2 py-2 ps-4 pe-2">
                      <QuoteInput
                        // rows={2}
                        // className="grow"
                        // variant="outline"
                        inputClassName="[&_input]:text-center"
                        placeholder="Service Provider"
                        {...register(`firstTable.${index}.serviceProvider`)}
                      />
                    </div>
                    <div className="col-span-2 p-2 pb-4">
                      <QuoteInput
                        inputClassName="[&_input]:text-center"
                        placeholder="Name"
                        {...register(`firstTable.${index}.name`)}
                      />
                    </div>
                    <div className="col-span-2 p-2">
                      <QuoteInput
                        inputClassName="[&_input]:text-center"
                        placeholder="johndoe@email.com"
                        {...register(`firstTable.${index}.emailAddress`)}
                      />
                    </div>
                    <div className="col-span-1 p-2">
                      <QuoteInput
                        inputClassName="[&_input]:text-center"
                        placeholder="Unique ID"
                        {...register(`firstTable.${index}.uniqueId`)}
                      />
                    </div>
                    <div className="col-span-1 p-2">
                      <QuoteInput
                        type="number"
                        placeholder="1"
                        inputClassName="[&_input]:text-center"
                        {...register(`firstTable.${index}.numberOfHours`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="col-span-1 p-2">
                      <QuoteInput
                        type="number"
                        placeholder="1"
                        inputClassName="[&_input]:text-center"
                        {...register(`firstTable.${index}.ratePerHour`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    {/* <div className="col-span-2 p-2">
                      <QuoteInput
                        type="number"
                        placeholder="5%"
                        inputClassName="[&_input]:text-end"
                        {...register(`firstTable.${index}.tax`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div> */}
                    <div className="relative col-span-1 w-full p-2 pe-4 pt-3 text-center text-gray-900 dark:text-gray-0">
                      {total ? total : 0}
                      <div className="absolute end-0 top-0 hidden translate-x-full grid-cols-1 gap-0 overflow-hidden rounded-md border bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.16)] group-hover:grid dark:border-muted/20">
                        <SortableList.DragHandle className="flex h-auto w-full items-center justify-center p-1.5 text-lg hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-700">
                          <PiArrowsOutCardinalBold className="size-4" />
                        </SortableList.DragHandle>
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
                </SortableList.Item>
              </Fragment>
            );
          })}
        </SortableList>
      </ul>

      <Button
        type="button"
        variant="text"
        className="absolute bottom-14 start-2 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
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
      </Button>
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
