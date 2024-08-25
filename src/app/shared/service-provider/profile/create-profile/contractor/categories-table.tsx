'use client';

import { Button, Input, Loader, Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { DragEndEvent } from '@dnd-kit/core';
// import { createId } from '@paralleldrive/cuid2';
// import { QuoteInput } from './quote-forms/quote-input';
import dynamic from "next/dynamic";
import { Controller, useFieldArray, useFormContext, } from 'react-hook-form';
import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
import {
  PiPlusCircle,
  PiTrashBold,
  PiArrowsOutCardinalBold,
} from 'react-icons/pi';
import { 
    category,
    subCategory,
  } from "@/app/shared/service-provider/profile/create-profile/contractor/data";
// import { ContractorProfileSchema } from '@/utils/validators/custom-profile.schema';
// import UploadZone from '@/components/ui/file-upload/upload-zone';
import CustomUploadZone from '@/components/ui/file-upload/custom-upload-zone';

// dynamic import Select component from rizzui
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
    ssr: false,
    loading: () => (
      <div className="grid h-10 place-content-center">
        <Loader variant="spinner" />
      </div>
    ),
  });

// type FormProps = {
//     register: UseFormRegister<ContractorProfileSchema>
//     control: Control<ContractorProfileSchema>
//     errors: FieldErrors<ContractorProfileSchema>
// }

export default function CategoriesTable(/*{ register, control, errors } : FormProps*/) {
  const { control, register, getValues, setValue, formState: { errors } } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: 'categoriesTable',
  });

  function handleChange(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);
    move(oldIndex, newIndex);
  }

//   console.log(errors.categoriesTable)

//   function getErrorMessage(errors: FieldErrors, index: number, fieldName: string): string {
//     const fieldError = errors.categories?.[index]?.[fieldName] as FieldError | undefined;
//     return fieldError ? fieldError.message : '';
//   }

  return (
    <div className='@container'>
        <div className="">
        {/* <div className="px-2 pt-6 pb-4 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50"> */}

          {/* <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Other Expenses</p> */}

          <div className="grid grid-cols-7 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
            <TableHeaderCell className="col-span-1 ps-4 py-2">
              <Text className='text-start font-semibold text-gray-500'>No.</Text>
            </TableHeaderCell>

            <TableHeaderCell className="col-span-2 py-2">
              <Text className='text-start font-semibold text-gray-500'>NCA Category</Text>
            </TableHeaderCell>

            <TableHeaderCell className="col-span-2 py-2">
              <Text className='text-start font-semibold text-gray-500'>Class</Text>
            </TableHeaderCell>

            <TableHeaderCell className="col-span-2 py-2">
              <Text className='text-start font-semibold text-gray-500'>Certificate</Text>
            </TableHeaderCell>
          </div>

          <ul className='relative'>
            <SortableList items={fields} onChange={handleChange}>
              {fields?.map((field, index) => {
                return (
                  <Fragment key={`categories-table-${index}`}>
                    <SortableList.Item id={field.id}>
                      <div className="group grid min-h-10 grid-cols-7 gap-0 border-b border-muted dark:border-muted/20">

                        <div className="col-span-1 p-2 ms-4 pb-4">
                            {/* <Input
                                placeholder="Contact Person First Name"
                                label="Contact Person First Name"
                                size="lg"
                                inputClassName="text-sm"
                                {...register('firstName')}
                                error={errors.firstName?.message}
                                className="[&>label>span]:font-medium"
                            /> */}
                            <Text className='text-start font-semibold text-gray-500'>{index + 1}</Text>                       
                        </div>

                        <div className="col-span-2 p-2 pb-4">
                          <Controller
                            control={control}
                            name={`categoriesTable.${index}.category` as const}
                            render={({ field: { value, onChange } }) => (
                                <Select 
                                dropdownClassName="!z-10"
                                inPortal={false}
                                placeholder="Select Category"
                                // label="NCA Category"
                                size="lg"
                                selectClassName="font-medium text-sm"
                                optionClassName=""
                                options={category}
                                onChange={onChange}
                                value={value}
                                className=""
                                getOptionValue={(option) => option.value}
                                displayValue={(selected) =>
                                    category?.find((r) => r.value === selected)?.label ?? ''
                                }
                                // @ts-ignore
                                error={errors.categoriesTable?.[index]?.category?.message as string}
                                />
                            )}
                            />
                        </div>

                        <div className="col-span-2 p-2 pb-4">
                            <Controller
                                control={control}
                                name={`categoriesTable.${index}.subCategory`}
                                render={({ field: { value, onChange } }) => (
                                    <Select 
                                    dropdownClassName="!z-10"
                                    inPortal={false}
                                    placeholder="Select Class"
                                    // label="Class*"
                                    size="lg"
                                    selectClassName="font-medium text-sm"
                                    optionClassName=""
                                    options={subCategory}
                                    onChange={onChange}
                                    value={value}
                                    className=""
                                    getOptionValue={(option) => option.value}
                                    displayValue={(selected) =>
                                        subCategory?.find((r) => r.value === selected)?.label ?? ''
                                    }
                                    // error={errors?.subCategory?.message as string}
                                    // @ts-ignore
                                    error={errors.categoriesTable?.[index]?.subCategory?.message as string}
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 p-2 relative">
                            <CustomUploadZone
                                // label="NCA License"
                                className="flex-grow"
                                name="ncaCard"
                                getValues={getValues}
                                setValue={setValue}
                            /> 
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
            {/* <p>{errors?.root?.message}</p> */}
        {/* <Button
          type="button"
          variant="text"
          className="absolute bottom-0 start-2 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
          onClick={() =>
            append({
              expenses: '',
              amount: 0,
            },)
          }
        >
          <PiPlusCircle className="size-5" />
          Add Item
        </Button>  */}
          </ul>



          <div className='relative'>
            <Button
              type="button"
              variant="text"
              className="absolute bottom-0 start-0 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
            //   className="absolute -bottom-4 start-0 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
              onClick={() =>
                append({
                    category: '',
                    subCategory: '',
                    ncaCard: '',
                },)
              }
            >
              <PiPlusCircle className="size-5" />
              Add Item
            </Button> 
          </div>     
        </div>
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
