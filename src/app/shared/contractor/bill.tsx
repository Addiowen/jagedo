import { useFieldArray, useFormContext } from "react-hook-form";
// import { DragEndEvent } from '@dnd-kit/core';
import { Dispatch, Fragment, SetStateAction } from "react";
// import { SortableList } from "@/components/dnd-sortable/dnd-sortable-list";
// import { PiArrowsOutCardinalBold, PiPlusCircle, PiTrashBold } from "react-icons/pi";
// import { Button, Input } from "rizzui";
import BillTable from "./bill-table";
import { QuoteInput } from "../quote-forms/quote-input";
import { BillTableType } from "@/utils/create-contractor-quotation.schema";

// type Props = {
//     subTotal: any
//     // setSubTotal: Dispatch<any>
// }

export default function Bill() {
    const { control, register, watch } = useFormContext();
    const { fields } = useFieldArray({
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
            {fields?.map((field, index) => {

                let subTotal = watch(`bill.${index}.billTable`).reduce((acc: number, item: BillTableType) => {
                    if (!item.quantity || !item.rate) return acc;
                    return acc + item.quantity * item.rate;
                }, 0);

                // setSubTotal(subTotalValue)

                return  (
                    <Fragment key={`bill-${index}`}>
                        <li id={field.id}>
                            <div className="px-2 pt-6 pb-8 mb-8 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">
                                {/* <div className=""> */}
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

                                    <div>
                                        {/* <Button
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
                                            },)
                                            }
                                        >
                                            <PiPlusCircle className="size-5 text-green-dark dark:text-green" />
                                            Add Bill
                                        </Button> */}

                                        {/* <Button
                                            type="button"
                                            variant="text"
                                            className="gap-2 ps-0 dark:text-gray-400 ml-4"
                                            onClick={() => remove(index)}
                                        >
                                            <PiTrashBold className="size-5 text-red-dark dark:text-red" />
                                            Delete
                                        </Button> */}
                                    </div>
                                </div>
                                
                                {/* </div> */}

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
                                            value={subTotal}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="text-lg">Bill table goes here</div> */}
                            </div>
                        </li>
                    </Fragment>
                )
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
    )
}


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