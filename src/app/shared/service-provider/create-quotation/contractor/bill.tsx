import { useFieldArray, useFormContext } from "react-hook-form";
// import { DragEndEvent } from '@dnd-kit/core';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
// import { SortableList } from "@/components/dnd-sortable/dnd-sortable-list";
// import { PiArrowsOutCardinalBold, PiPlusCircle, PiTrashBold } from "react-icons/pi";
// import { Button, Input } from "rizzui";
import BillTable from "./bill-table";
import { QuoteInput } from "../quote-forms/quote-input";
import { BillTableType, BillType } from "@/utils/create-contractor-quotation.schema";
import { useBills } from "@/app/context/billsContext";
// type Props = {
//     subTotal: any
//     // setSubTotal: Dispatch<any>
// }

export default function Bill() {
    const { control, register, watch } = useFormContext();
    //console.log("register", register);
    const { fields } = useFieldArray({
        control: control,
        name: 'bill',
    });

    const { setBills } = useBills();
    let [billType, setBillType] = useState<BillType[]>([]);
    billType = fields.map((field, index) => {
        const billTable = watch(`bill.${index}.billTable`) || [];
        const subTotal = billTable.reduce((acc: number, item: BillTableType) => {
            if (!item.quantity || !item.rate) return acc;
            return acc + item.quantity * item.rate;
        }, 0);

        return {
            billTableTitle: watch(`bill.${index}.billTableTitle`),
            billTable: billTable,
            subTotal: subTotal,
        };

    });
    
    const updateBillType = (index: number, updatedBill: Partial<BillType>) => {
        setBillType((prevBillType) =>
            prevBillType.map((bill, i) => (i === index ? { ...bill, ...updatedBill } : bill))
        );
    };

    useEffect(() => {
        console.log('updated');
        
        const updatedBillType = fields.map((field, index) => {
            const billTable = watch(`bill.${index}.billTable`) || [];
            const subTotal = billTable.reduce((acc: number, item: BillTableType) => {
                if (!item.quantity || !item.rate) return acc;
                return acc + item.quantity * item.rate;
            }, 0);

            return {
                billTableTitle: watch(`bill.${index}.billTableTitle`),
                billTable: billTable,
                subTotal: subTotal,
            };

        });

        // Update the state outside of the render cycle
        setBillType(updatedBillType);
        setBills(updatedBillType);
        
    }, [fields, watch]); 
    // console.log("watch", watch);
    console.log("billType", billType);
    console.log("fields", fields);

    return (
        <>
        <ul>
            <>
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
