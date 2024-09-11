'use client';

import {
  AdvancedRadio,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from 'rizzui';
import {
  AwaitedReactNode,
  Fragment,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from 'react';
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

export default function ViewReviewComponent({ rating }: { rating: any }) {
  const data = rating.metadata.answers.map(
    (answer: { question: any; value: any }) => ({
      question: answer.question,
      customerValue: answer.value,
      spValue: undefined,
      adminValue: undefined,
      average: (rating.score / 20).toFixed(1),
    })
  );
  // const { control, handleSubmit } = useForm()
  const router = useRouter();
  const pathname = usePathname();
  const professional = pathname.includes('professional');
  const contractor = pathname.includes('contractor');
  const fundi = pathname.includes('fundi');

  const [answers, setAnswers] = useState([
    {
      question: '',
      value: 0,
    },
  ]);

  const handleBack = () => router.back();

  let score = 0;

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
      <div className="relative rounded-lg border border-muted bg-gray-0 px-2 pb-8 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
        <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
          Job Review
        </p>

        <div className="grid grid-cols-7 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
            <Text className="font-semibold text-gray-500">No.</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-3 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Question</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Customer</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">
              Service Provider
            </Text>
          </TableHeaderCell>

          {/* <TableHeaderCell className="col-span-1 p-1 py-2 flex items-center">
          <Text className='font-semibold text-gray-500'>Admin</Text>
        </TableHeaderCell> */}

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Average</Text>
          </TableHeaderCell>
        </div>

        <>
          <form>
            {data.map(
              (
                field: {
                  customerValue: any;
                  spValue: any;
                  question:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                },
                index: number
              ) => {
                let reviewTotal = field.customerValue + field.spValue;
                let reviewAverage = reviewTotal / 2;
                score += reviewAverage;

                return (
                  <Fragment key={`add-review-table-${index}`}>
                    <div>
                      <div className="group grid min-h-10 grid-cols-7 gap-0 border-b border-muted py-2 dark:border-muted/20">
                        <div className="col-span-1 w-full p-2 pe-4 text-center text-gray-900 dark:text-gray-0">
                          {index + 1}
                        </div>

                        <div className="col-span-3 p-2">
                          <Text className="text-gray-900 dark:text-gray-0">
                            {field.question}
                          </Text>
                        </div>

                        <div className="col-span-1 p-2">
                          <Text className="text-gray-900 dark:text-gray-0">
                            {field.spValue ? `${field.spValue}` : '--'}
                          </Text>
                        </div>

                        <div className="col-span-1 p-2">
                          <Text className="text-gray-900 dark:text-gray-0">
                            {field.customerValue
                              ? `${field.customerValue}`
                              : '--'}
                          </Text>
                        </div>

                        {/* <div className="col-span-1 p-2">
                        <Text className='text-gray-900 dark:text-gray-0'>{ field.adminValue ? `${field.adminValue}` : '--' }</Text>
                    </div> */}

                        <div className="col-span-1 p-2">
                          {/* <Text className='text-gray-900 dark:text-gray-0'>{ field.average ? `${field.average}` : '--' }</Text> */}
                          <Text className="text-gray-900 dark:text-gray-0">
                            {reviewAverage}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              }
            )}

            <div className="ms-auto mt-2 w-full max-w-xs divide-y pb-4 dark:divide-muted/20">
              <div className="grid grid-cols-2 items-center gap-2">
                <div className="font-semibold">Score:</div>
                <div className="text-center font-semibold dark:text-gray-0">
                  {score ? `${score / data.length}` : '0'}
                  {/* 4.2 */}
                </div>
              </div>
            </div>
          </form>
        </>
      </div>

      <div className="mb-8 mt-12 border-t pt-4">
        <p className="mb-4 mr-8 flex-shrink-0 font-semibold">Comments</p>

        <div className="mb-4">
          <Text className="font-semibold">
            {fundi ? 'Fundi' : professional ? 'Professional' : 'Contractor'}
          </Text>
          <Text className="rounded-lg border border-muted p-2 pb-12 shadow-sm sm:rounded-sm xl:rounded-lg">
            {rating.comment || ''}
          </Text>
        </div>

        <div className="mb-4">
          <Text className="font-semibold">Customer</Text>
          <Text className="rounded-lg border border-muted p-2 pb-12 shadow-sm sm:rounded-sm xl:rounded-lg">
            {rating.metadata.fundiComment}
          </Text>
        </div>

        <div className="mb-4">
          <Text className="font-semibold">Admin</Text>
          <Text className="rounded-lg border border-muted p-2 pb-12 shadow-sm sm:rounded-sm xl:rounded-lg">
            {rating.metadata.admincomment || ''}
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

      <div className="mt-8 flex justify-center">
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
