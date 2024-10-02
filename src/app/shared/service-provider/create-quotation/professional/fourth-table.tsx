'use client';

import { Fragment } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { QuoteInput } from '../quote-forms/quote-input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';

export default function FourthTable() {
  const { control, register, getValues } = useFormContext();

  const fourthTable = useFieldArray({
    control,
    name: 'fourthTable',
  });

  const fourthTableTwo = useFieldArray({
    control,
    name: 'fourthTableTwo',
  });

  const fourthTableThree = useFieldArray({
    control,
    name: 'fourthTableThree',
  });

  let fields, move;

  const payableToServiceProvider =
    getValues().thirdTable.payableToServiceProvider;

  if (payableToServiceProvider <= 1000000) {
    fields = fourthTable.fields;
    move = fourthTable.move;
    return renderMilestones(
      fields,
      move,
      register,
      'fourthTable',
      payableToServiceProvider / 2
    );
  } else if (payableToServiceProvider <= 6000000) {
    fields = fourthTableTwo.fields;
    move = fourthTableTwo.move;
    return renderMilestones(
      fields,
      move,
      register,
      'fourthTableTwo',
      payableToServiceProvider / 3
    );
  } else {
    fields = fourthTableThree.fields;
    move = fourthTableThree.move;
    return renderMilestones(
      fields,
      move,
      register,
      'fourthTableThree',
      payableToServiceProvider / 4
    );
  }
}

function renderMilestones(
  fields: any[],
  move: any,
  register: any,
  table_name: string,
  num: number
) {
  const amount = num;
  return (
    <div className="relative mb-8 rounded-lg border border-muted bg-gray-0 px-2 pb-10 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
      <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
        Milestones
      </p>

      <div className="grid grid-cols-12 gap-4 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <div className="col-span-2 py-2 pe-2 ps-4">
          <p className="text-center font-semibold text-gray-500"></p>
        </div>
        <div className="col-span-2 py-2">
          <p className="text-center font-semibold text-gray-500">
            % DISBURSEMENT
          </p>
        </div>
        <div className="col-span-6 py-2">
          <p className="text-center font-semibold text-gray-500">
            MILESTONE ACTIVITY
          </p>
        </div>
        <div className="col-span-2 py-2">
          <p className="text-center font-semibold text-gray-500">
            AMOUNT (KES)
          </p>
        </div>
      </div>

      <ul>
        <SortableList
          items={fields}
          onChange={(event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over.id);
            move(oldIndex, newIndex);
          }}
        >
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <SortableList.Item id={field.id}>
                <div className="group grid min-h-10 grid-cols-12 gap-0 border-b border-muted dark:border-muted/20">
                  <div className="col-span-2 py-2 pe-2 ps-4">
                    <QuoteInput
                      inputClassName="[&_input]:text-center"
                      placeholder="A"
                      {...register(`${table_name}.${index}.milestone`)}
                    />
                  </div>
                  <div className="col-span-2 p-2 pb-4">
                    <QuoteInput
                      inputClassName="[&_input]:text-center"
                      placeholder="50%"
                      {...register(
                        `${table_name}.${index}.percentageDisbursement`,
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />
                  </div>
                  <div className="col-span-6 p-2">
                    <QuoteInput
                      placeholder="First Draft"
                      inputClassName="[&_input]:text-center"
                      {...register(`${table_name}.${index}.milestoneActivity`)}
                    />
                  </div>
                  <div className="col-span-2 p-2">
                    <QuoteInput
                      type="number"
                      placeholder="0"
                      inputClassName="[&_input]:text-center"
                      {...register(`${table_name}.${index}.amount`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
              </SortableList.Item>
            </Fragment>
          ))}
        </SortableList>
      </ul>
    </div>
  );
}
