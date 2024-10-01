import { useFieldArray, useFormContext } from "react-hook-form";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import BillTable from "./bill-table";
import { QuoteInput } from "../quote-forms/quote-input";
import { BillTableType, BillType } from "@/utils/create-contractor-quotation.schema";
import { useBills } from "@/app/context/billsContext";
import { Button } from "rizzui";
import { PiPlusCircle } from "react-icons/pi";

export default function Bill() {
    const { control, register, watch } = useFormContext();
    //console.log("register", register);
    const { fields, append } = useFieldArray({
        control: control,
        name: 'bill',
    });


    return (
        <>
        <ul>
            <>
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
            {fields?.map((field, index) => {

                let subTotal = (watch(`bill.${index}.billTable`) || []).reduce((acc: number, item: BillTableType) => {
                    if (!item.quantity || !item.rate) return acc;
                    return acc + (item.quantity * item.rate);
                }, 0);

                return  (
                    <Fragment key={`bill-${index}`}>
                        <li id={field.id}>
                            <div className="px-2 pt-6 pb-8 mb-8 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <QuoteInput
                                            inputClassName="[&_input]:text-gray-700 font-semibold text-lg mb-4 w-24 px-0 ps-4"
                                            placeholder="0"
                                            value={`Bill No. ${index + 1} :`}
                                            onChange={() => {}}
                                        />

                                        <QuoteInput
                                            inputClassName="[&_input]:text-gray-700 font-semibold text-lg mb-4"
                                            placeholder="Enter title"
                                            {...register(`bill.${index}.billTableTitle`)}
                                        />
                                    </div>

                                </div>
                                

                            <BillTable billIndex={index} />
                            <div className="ms-auto w-full max-w-xs divide-y dark:divide-muted/20">
                                <div className="grid grid-cols-2 items-center gap-2">
                                    <div className='font-semibold'>
                                        Subtotal:
                                    </div>
                                    <div className="text-center font-semibold dark:text-gray-0">
                                        {/* {subTotal ? `${subTotal}` : '--'} */}
                                        <QuoteInput
                                            type="number"
                                            placeholder="--"
                                            inputClassName="[&_input]:text-center"
                                            {...register(`bill.${index}.subTotal`, {
                                            valueAsNumber: true,
                                            })}
                                            value={isNaN(subTotal) ? '' : subTotal}
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </li>
                    </Fragment>
                )
            })}
            </>
        </ul>
        </>
    )
}
