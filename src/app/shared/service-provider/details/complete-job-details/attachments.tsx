'use client';

import { Button, Input, Loader, Text } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { DragEndEvent } from '@dnd-kit/core';
import dynamic from "next/dynamic";
import { Controller, useFieldArray, useForm, } from 'react-hook-form';
import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
import {
  PiPlusCircle,
  PiTrashBold,
  PiArrowsOutCardinalBold,
  PiCloudArrowDown,
} from 'react-icons/pi';
import CustomUploadZone from '@/components/ui/file-upload/custom-upload-zone';
import { ACTIVE_JOBS_DEFAULT_VALUE, activeJobsSchema, ActiveJobsType, COMPLETE_JOBS_DEFAULT_VALUE, completeJobsSchema } from '@/utils/active-jobs.schema';
import { zodResolver } from '@hookform/resolvers/zod';
// import { usePathname } from 'next/navigation';

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

export default function CompleteJobDetailsAttachments() {
//   const { control, register, getValues, setValue, formState: { errors } } = useForm();
    // const pathname = usePathname()
    // const fundi = pathname.includes('fundi')

  const { control, register, getValues, setValue, formState: { errors } } = useForm<ActiveJobsType>({
    mode: 'onChange',
    defaultValues: COMPLETE_JOBS_DEFAULT_VALUE,
    resolver: zodResolver(completeJobsSchema),
  });

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: 'attachmentsTable',
  });

  function handleChange(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);
    move(oldIndex, newIndex);
  }

  return (
    <form className='@container mb-4'>
        {/* <div> */}
        <div className="px-2 pt-6 pb-12 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">

          <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Attachments</p>

          <div className="grid grid-cols-6 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
            <TableHeaderCell className="col-span-1 ps-4 py-2">
              <Text className='text-center font-semibold text-gray-500'>No.</Text>
            </TableHeaderCell>

            <TableHeaderCell className="col-span-1 py-2">
              <Text className='text-center font-semibold text-gray-500'>Milestone</Text>
            </TableHeaderCell>

            <TableHeaderCell className="col-span-2 py-2">
              <Text className='text-center font-semibold text-gray-500'>Document Name</Text>
            </TableHeaderCell>

            <TableHeaderCell className="col-span-2 py-2">
              <Text className='text-center font-semibold text-gray-500'>Attachment</Text>
            </TableHeaderCell>
          </div>

          <ul className='relative'>
            <SortableList items={fields} onChange={handleChange}>
              {fields?.map((field, index) => {
                return (
                  <Fragment key={`attachments-table-${index}`}>
                    <SortableList.Item id={field.id}>
                      <div className="group grid min-h-10 grid-cols-6 gap-0 border-b border-muted dark:border-muted/20">

                        <div className="col-span-1 p-2 ms-4 pb-4 flex items-center justify-center">
                            <Text className='text-center font-semibold text-gray-500'>{index + 1}</Text>                       
                        </div>

                        <div className="col-span-1 p-2 pb-4 flex items-center justify-center">
                          <Text className='text-center text-gray-900 dark:text-gray-0'>Milestone {index + 1}</Text>
                        </div>

                        <div className="col-span-2 p-2 pb-4 flex items-center justify-center">
                          {field.docName ? (
                            <div className=''>
                              <Text className='text-center text-gray-900 dark:text-gray-0 flex'>{field.docName}</Text>
                            </div>
                          ) : (
                            <Input
                                placeholder="Add a name for the doc"
                                // label="Document Name"
                                size="lg"
                                inputClassName="text-sm"
                                {...register(`attachmentsTable.${index}.docName`)}
                                className="[&>label>span]:font-medium"
                            />
                          )}
                          {/* <Input
                                placeholder="Add a name for the doc"
                                // label="Document Name"
                                size="lg"
                                inputClassName="text-sm"
                                {...register(`attachmentsTable.${index}.docName`)}
                                className="[&>label>span]:font-medium"
                            /> */}
                        </div>

                        <div className="col-span-2 p-2 relative">
                          {field.attachment ? (
                            <div className='flex justify-center'>
                              
                              <Button
                                variant="text"
                                // variant='outline'
                                onClick={() => {}}
                                className="p-2 text-sm font-bold leading-loose text-gray-500 group col-span-1"
                              >
                                  <PiCloudArrowDown className="h-6 w-6 text-gray-500 group-hover:text-blue-500" /> 
                              </Button>
                          </div>
                          ) : (
                            <CustomUploadZone
                                // label="NCA License"
                                className="flex-grow"
                                name="attachment"
                                getValues={getValues}
                                setValue={setValue}
                            /> 
                          )}
                                                    
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



          {/* <div className='relative'>
            <Button
              type="button"
              variant="text"
              className="absolute bottom-0 start-0 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
            //   className="absolute -bottom-4 start-0 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
              onClick={() =>
                append({
                    docName: '',
                    attachment: '',
                },)
              }
            >
              <PiPlusCircle className="size-5" />
              Add Item
            </Button> 
          </div>      */}
        </div>
    </form>
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
