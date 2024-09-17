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

export default function ViewReviewComponent({
  spRating,
  customerRating,
}: {
  spRating: any;
  customerRating: any;
}) {
  console.log(customerRating);
  console.log(spRating);

  // Check if the metadata has customer and service provider answers
  const customerAnswers = customerRating?.metadata?.answers || [];
  const serviceProviderAnswers = spRating?.metadata?.answers || [];

  // Combine the customer and service provider answers, matching questions
  const combinedData =
    customerAnswers.length > serviceProviderAnswers.length
      ? customerAnswers.map(
          (customerAnswer: { question: any; value: any }, index: number) => ({
            question: customerAnswer.question,
            customerValue: customerAnswer.value || '',
            spValue: serviceProviderAnswers[index]
              ? serviceProviderAnswers[index].value || ''
              : '',
            average:
              ((customerAnswer.value || 0) +
                (serviceProviderAnswers[index]?.value || 0)) /
              2,
          })
        )
      : serviceProviderAnswers.map(
          (spAnswer: { question: any; value: any }, index: number) => ({
            question: spAnswer.question,
            customerValue: customerAnswers[index]
              ? customerAnswers[index].value || ''
              : '',
            spValue: spAnswer.value || '',
            average:
              ((customerAnswers[index]?.value || 0) + (spAnswer.value || 0)) /
              2,
          })
        );

  const router = useRouter();
  const pathname = usePathname();
  const professional = pathname.includes('professional');
  const contractor = pathname.includes('contractor');
  const fundi = pathname.includes('fundi');
  const customer = pathname.includes('customer');

  const handleBack = () => router.back();

  let score = 0;

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

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Average</Text>
          </TableHeaderCell>
        </div>

        <>
          <form>
            {combinedData.map(
              (
                field: {
                  customerValue: any;
                  spValue: any;
                  question: any;
                },
                index: number
              ) => {
                let reviewTotal =
                  (field.customerValue || 0) + (field.spValue || 0);
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
                            {field.customerValue
                              ? `${field.customerValue}`
                              : '--'}
                          </Text>
                        </div>

                        <div className="col-span-1 p-2">
                          <Text className="text-gray-900 dark:text-gray-0">
                            {field.spValue ? `${field.spValue}` : '--'}
                          </Text>
                        </div>

                        <div className="col-span-1 p-2">
                          <Text className="text-gray-900 dark:text-gray-0">
                            {reviewAverage.toFixed(1)}
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
                  {score ? `${(score / combinedData.length).toFixed(1)}` : '0'}
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
            {fundi
              ? 'Fundi'
              : professional
                ? 'Professional'
                : customer
                  ? 'Customer'
                  : 'Contractor'}
          </Text>
          <Text className="rounded-lg border border-muted p-2 pb-12 shadow-sm sm:rounded-sm xl:rounded-lg">
            {spRating?.metadata?.customerComment || ''}
          </Text>
        </div>

        <div className="mb-4">
          <Text className="font-semibold">Customer</Text>
          <Text className="rounded-lg border border-muted p-2 pb-12 shadow-sm sm:rounded-sm xl:rounded-lg">
            {customerRating?.metadata?.customerComment || ''}
          </Text>
        </div>

        {/* <div className="mb-4">
          <Text className="font-semibold">Admin</Text>
          <Text className="rounded-lg border border-muted p-2 pb-12 shadow-sm sm:rounded-sm xl:rounded-lg">
            {rating.metadata.adminComment || ''}
          </Text>
        </div> */}
      </div>
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
