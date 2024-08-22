'use client';

import { AdvancedRadio, Button, Checkbox, Radio, RadioGroup, Text, Textarea } from 'rizzui';
import { Fragment, useState } from 'react';
import cn from '@/utils/class-names';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { usePathname, useRouter } from 'next/navigation';
import JobDescriptionChunked from '@/app/shared/job-description-chunked';
import { reviewComments } from '@/data/custom-job-details-data';
// import { useFieldArray, useFormContext } from 'react-hook-form';
// import { BillTableType } from './view-bill';

// type Props = {
//     index: number;
//     billTableValues: BillTableType[]
// }

const data = [
    {
        question: 'Was the quality of the workmanship satisfactory?',
        customerValue: 3,
        spValue: 4,
        adminValue: undefined,
        average: 5,
    },
    {
        question: 'Did the Service Provider adhere to the project timeline?',
        customerValue: 2,
        spValue: 5,
        adminValue: undefined,
        average: 4,
    },
    {
        question: 'Was the project completed within the agreed budget?',
        customerValue: 5,
        spValue: 4,
        adminValue: undefined,
        average: 3.5,
    },
    {
        question: 'Were the materials used in line with the agreed-upon specifications?',
        customerValue: 5,
        spValue: 2,
        adminValue: undefined,
        average: 2.7,
    },
    {
        question: 'Would you recommend this Service Provider for future projects?',
        customerValue: 4,
        spValue: 3,
        adminValue: 4,
        average: 24,
    }
]

export default function ViewReviewComponent() {
  // const { control, handleSubmit } = useForm()
  const router = useRouter()
  const pathname = usePathname()
  const professional = pathname.includes('professional')
  const contractor = pathname.includes('contractor')
  const fundi = pathname.includes('fundi')

  const [answers, setAnswers] = useState([{
    question: '',
    value: 0
  }])

  const handleBack = () => router.back()

  let score = 0

  // const onSubmit = (data) => {
  //   console.log('Form Submitted:', data);
  // };
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

  // console.log({billIndexForTable: index})

  return (
    <>
    <div className='relative px-2 pt-6 pb-8 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50'>

      <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Job Review</p>

      <div className="grid grid-cols-7 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-1 py-2 flex items-center justify-center">
          <Text className='font-semibold text-gray-500'>No.</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-3 p-1 py-2 flex items-center">
          <Text className='font-semibold text-gray-500'>Question</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 p-1 py-2 flex items-center">
          <Text className='font-semibold text-gray-500'>Customer</Text>
        </TableHeaderCell>

        <TableHeaderCell className="col-span-1 p-1 py-2 flex items-center">
          <Text className='font-semibold text-gray-500'>Service Provider</Text>
        </TableHeaderCell>

        {/* <TableHeaderCell className="col-span-1 p-1 py-2 flex items-center">
          <Text className='font-semibold text-gray-500'>Admin</Text>
        </TableHeaderCell> */}

        <TableHeaderCell className="col-span-1 p-1 py-2 flex items-center">
          <Text className='font-semibold text-gray-500'>Average</Text>
        </TableHeaderCell>
      </div>

      <>
        <form>
          {data.map((field, index) => {
            let reviewTotal = field.customerValue + field.spValue
            let reviewAverage = reviewTotal / 2
            score += reviewAverage

            return (
              <Fragment key={`add-review-table-${index}`}>
                <div>
                  <div className="group grid py-2 min-h-10 grid-cols-7 gap-0 border-b border-muted dark:border-muted/20">
                    
                    <div className="col-span-1 w-full p-2 pe-4 text-center text-gray-900 dark:text-gray-0">
                        {index + 1}
                    </div>  

                    <div className="col-span-3 p-2">
                        <Text className='text-gray-900 dark:text-gray-0'>{ field.question }</Text>
                    </div>

                    <div className="col-span-1 p-2">
                        <Text className='text-gray-900 dark:text-gray-0'>{ field.customerValue ? `${field.customerValue}` : '--' }</Text>
                    </div>

                    <div className="col-span-1 p-2">
                        <Text className='text-gray-900 dark:text-gray-0'>{ field.spValue ? `${field.spValue}` : '--' }</Text>
                    </div>

                    {/* <div className="col-span-1 p-2">
                        <Text className='text-gray-900 dark:text-gray-0'>{ field.adminValue ? `${field.adminValue}` : '--' }</Text>
                    </div> */}

                    <div className="col-span-1 p-2">
                        {/* <Text className='text-gray-900 dark:text-gray-0'>{ field.average ? `${field.average}` : '--' }</Text> */}
                        <Text className='text-gray-900 dark:text-gray-0'>{ reviewAverage }</Text>
                    </div>

                  </div>
                </div>
              </Fragment>
            );
          })}

          <div className="mt-2 ms-auto pb-4 w-full max-w-xs divide-y dark:divide-muted/20">
            <div className="grid grid-cols-2 items-center gap-2">
                <div className='font-semibold'>
                    Score:
                </div>
                <div className="text-center font-semibold dark:text-gray-0">
                    {score ? `${score / data.length}` : '0'}
                    {/* 4.2 */}
                </div>
            </div>
        </div>
        </form>
      </>
      </div>

      <div className='mt-12 mb-8 border-t pt-4'>
        <p className='font-semibold mr-8 mb-4 flex-shrink-0'>Comments</p>

        <div className='mb-4'>
            <Text className='font-semibold'>{fundi ? 'Fundi' : professional ? 'Professional' : 'Contractor'}</Text>
            <Text className='p-2 pb-12 border border-muted shadow-sm rounded-lg sm:rounded-sm xl:rounded-lg'>
                Job was finished with no problems
            </Text>
        </div>

        <div className='mb-4'>
            <Text className='font-semibold'>Customer</Text>
            <Text className='p-2 pb-12 border border-muted shadow-sm rounded-lg sm:rounded-sm xl:rounded-lg'>
                Liked the service, would recommend
            </Text>
        </div>

        <div className='mb-4'>
            <Text className='font-semibold'>Admin</Text>
            <Text className='p-2 pb-12 border border-muted shadow-sm rounded-lg sm:rounded-sm xl:rounded-lg'>
                The service provider did a good job
            </Text>
        </div>

        {/* <Textarea
          placeholder="Add comments..."
          // {...register('review')}
          // error={errors.review?.message}
          textareaClassName="h-24 w-full"
          className="mt-8"
          label="Customer"
          value={'Liked the service, would recommend'}
        />

        <Textarea
          placeholder="Add comments..."
          // {...register('review')}
          // error={errors.review?.message}
          textareaClassName="h-24 w-full"
          className="mt-4"
          label="Admin"
          value={'The service provider did a good job'}
        />
        

        <Textarea
          placeholder="Add comments..."
          // {...register('review')}
          // error={errors.review?.message}
          textareaClassName="h-24 w-full"
          className="mt-4"
          label="Service Provider"
          value={'Job was finished with no problems'}
        /> */}

        {/* <JobDescriptionChunked
          className="mt-4"
          data={reviewComments[0]}
          dataChunkSize={1}
          // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        /> */}
      </div>

      {/* {contractor && (
        <div className='flex justify-center mt-8'>
          <Link href={routes.serviceProvider.contractor.reviews}>
            <Button className="px-8" type="submit">
              Submit
            </Button>
          </Link>
        </div>
      )}

      {professional && (
        <div className='flex justify-center mt-8'>
          <Link href={routes.serviceProvider.professional.reviews}>
            <Button className="px-8" type="submit">
              Submit
            </Button>
          </Link>
        </div>
      )}

      {fundi && (
        <div className='flex justify-center mt-8'>
          <Link href={routes.serviceProvider.fundi.reviews}>
            <Button className="px-8" type="submit">
              Submit
            </Button>
          </Link>
        </div>
      )} */}

        <div className='flex justify-center mt-8'>
            <Button className="px-8" type="submit" onClick={handleBack}>
                Back
            </Button>
        </div>

      {/* <div className='flex justify-center mt-8'>
        <Link href={routes.serviceProvider.contractor.reviews}>
          <Button className="px-8" type="submit">
            Submit
          </Button>
        </Link>
      </div> */}
     
      
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
