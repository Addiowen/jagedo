import { useFieldArray, useFormContext } from 'react-hook-form';
// import { DragEndEvent } from '@dnd-kit/core';
import { Fragment } from 'react';
// import { SortableList } from "@/components/dnd-sortable/dnd-sortable-list";
import {
  PiArrowsOutCardinalBold,
  PiPlusCircle,
  PiTrashBold,
} from 'react-icons/pi';
import { Button, Input } from 'rizzui';
import BillTable from './bill-table';
import { QuoteInput } from '@/app/shared/create-quotation/create-quotation/quote-forms/quote-input';
import CustomTextArea from '@/app/shared/account-settings/custom-text-area';
import { useSearchParams } from 'next/navigation';

export default function Bill() {
  const queryId = useSearchParams();

  const jobId = queryId.get('jobId');
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'bill',
  });

  // function handleChange(event: DragEndEvent) {
  //     const { active, over } = event;
  //     if (!active || !over) return;
  //     const oldIndex = fields.findIndex((item) => item.id === active.id);
  //     const newIndex = fields.findIndex((item) => item.id === over.id);
  //     move(oldIndex, newIndex);
  // }

  return (
    <>
      <ul>
        <>
          {jobId !== '3400' && (
            <div className="mb-6 flex justify-end">
              <Button
                type="button"
                variant="text"
                className="gap-2 ps-0 dark:text-gray-400"
                onClick={() =>
                  append({
                    billTableTitle: '',
                    billTable: [
                      // {
                      // description: '',
                      // quantity: 55,
                      // units: '',
                      // rate: undefined,
                      // },
                    ],
                  })
                }
              >
                <PiPlusCircle className="size-5 text-green-dark dark:text-green" />
                Add Bill
              </Button>
            </div>
          )}

          {fields?.map((field, index) => {
            console.log({ billIndex: index });

            return (
              <>
                <Fragment key={`bill-${index}`}>
                  <li id={field.id}>
                    <div className="mb-8 rounded-lg border border-muted bg-gray-0 px-2 pb-14 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="flex">
                            {/* <p className="mb-4 ps-4 text-lg text-gray-700 font-semibold">Bill No. {index + 1}:</p> */}
                            <QuoteInput
                              inputClassName="[&_input]:text-gray-700 font-semibold text-lg mb-4 w-24 px-0 ps-4"
                              placeholder="0"
                              value={`Bill No. ${index + 1} :`}
                            />

                            <QuoteInput
                              inputClassName="[&_input]:text-gray-700 font-semibold text-lg mb-4"
                              placeholder="Enter title"
                              {...register(`bill.${index}.billTableTitle`)}
                            />
                          </div>
                          {jobId !== '3400' && jobId !== '3401' && (
                            <div>
                              <Button
                                type="button"
                                variant="text"
                                className="ml-4 gap-2 ps-0 dark:text-gray-400"
                                onClick={() => remove(index)}
                              >
                                <PiTrashBold className="size-5 text-red-dark dark:text-red" />
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                        {/* <div className=" grid-cols-1 gap-0 overflow-hidden rounded-md border bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.16)] group-hover:grid dark:border-muted/20">
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
                                    </div> */}
                      </div>

                      <BillTable index={index} />
                      {/* <div className="text-lg">Bill table goes here</div> */}
                    </div>
                  </li>
                </Fragment>
              </>
            );
          })}
        </>

        {/* <div className="relative px-2 pt-6 pb-14 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">

            </div> */}
      </ul>

      {/* <Button
            type="button"
            variant="text"
            className="absolute top-0 end-2 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
            onClick={() =>
            append({
                billTableTitle: '',
                billTable: [
                    // {
                    //   description: '',
                    //   quantity: undefined,
                    //   units: undefined,
                    //   rate: undefined,
                    // },
                ],
            },)
            }
        >
            <PiPlusCircle className="size-5" />
            Add Item
        </Button> */}
    </>
  );
}
