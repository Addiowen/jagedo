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
import { Fragment, useState } from 'react';
import cn from '@/utils/class-names';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { usePathname } from 'next/navigation';
// import { useFieldArray, useFormContext } from 'react-hook-form';
// import { BillTableType } from './view-bill';

// type Props = {
//     index: number;
//     billTableValues: BillTableType[]
// }

const data = [
  {
    question: 'Question 1 goes here',
  },
  {
    question: 'Question 2 goes here',
  },
  {
    question: 'Question 3 goes here',
  },
  {
    question: 'Question 4 goes here',
  },
  {
    question: 'Question 5 goes here',
  },
];

export default function AddReviewComponent() {
  // const { control, handleSubmit } = useForm()
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
          Add Review
        </p>

        <div className="grid grid-cols-9 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
            <Text className="font-semibold text-gray-500">No.</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-3 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Question</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">
              Strongly Disagree
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Disagree</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Neutral</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Agree</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Strongly Agree</Text>
          </TableHeaderCell>
        </div>

        <>
          <form>
            {data.map((field, index) => {
              return (
                <Fragment key={`add-review-table-${index}`}>
                  <div>
                    <div className="group grid min-h-10 grid-cols-9 gap-0 border-b border-muted py-2 dark:border-muted/20">
                      <div className="col-span-1 w-full p-2 pe-4 text-center text-gray-900 dark:text-gray-0">
                        {index + 1}
                      </div>

                      <div className="col-span-3 p-2">
                        <Text className="text-gray-900 dark:text-gray-0">
                          {field.question}
                        </Text>
                      </div>

                      {/* <RadioGroup value='' setValue={setAnswers([...answers, { question: field.question, value: 5}])}> */}
                      <Radio
                        value={1}
                        name={`review-q${index}`}
                        className="col-span-1 p-2 ps-4"
                      />
                      <Radio
                        value={2}
                        name={`review-q${index}`}
                        className="col-span-1 p-2 ps-4"
                      />
                      <Radio
                        value={3}
                        name={`review-q${index}`}
                        className="col-span-1 p-2 ps-4"
                      />
                      <Radio
                        value={4}
                        name={`review-q${index}`}
                        className="col-span-1 p-2 ps-4"
                      />
                      <Radio
                        value={5}
                        name={`review-q${index}`}
                        className="col-span-1 p-2 ps-4"
                      />
                      {/* </RadioGroup>           */}

                      {/* <Controller
                      name="radioValue" // Replace "radioValue" with your desired field name
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <RadioGroup value={value} setValue={onChange}>
                          <Radio value={1} className='col-span-1 p-2 ps-4'>Option 1</Radio>
                          <Radio value={2} className='col-span-1 p-2 ps-4'>Option 2</Radio>
                          <Radio value={3} className='col-span-1 p-2 ps-4'>Option 3</Radio>
                          <Radio value={4} className='col-span-1 p-2 ps-4'>Option 4</Radio>
                          <Radio value={5} className='col-span-1 p-2 ps-4'>Option 5</Radio>
                        </RadioGroup>
                      )}
                    /> */}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </form>
        </>

        {/* <Textarea
        placeholder="Add comments..."
        // {...register('review')}
        // error={errors.review?.message}
        textareaClassName="h-24 w-full"
        className="mt-8"
        label="Comments"
      /> */}

        {/* <div className='flex justify-center mt-8'>
        <Link href={routes.serviceProvider.contractor.reviews}>
          <Button className="px-8" type="submit">
            Submit
          </Button>
        </Link>
      </div> */}
      </div>

      <div className="mt-4 pb-4 pt-4">
        {/* <p className='font-semibold mr-8 flex-shrink-0'>Comments</p> */}
        <Textarea
          placeholder="Add comments..."
          // {...register('review')}
          // error={errors.review?.message}
          textareaClassName="h-24 w-full"
          className=""
          label="Comments"
        />
      </div>

      {contractor && (
        <div className="mt-8 flex justify-center">
          <Link href={routes.admin.reviews}>
            <Button className="px-8" type="submit">
              Submit
            </Button>
          </Link>
        </div>
      )}

      {professional && (
        <div className="mt-8 flex justify-center">
          <Link href={routes.admin.reviews}>
            <Button className="px-8" type="submit">
              Submit
            </Button>
          </Link>
        </div>
      )}

      {fundi && (
        <div className="mt-8 flex justify-center">
          <Link href={routes.admin.reviews}>
            <Button className="px-8" type="submit">
              Submit
            </Button>
          </Link>
        </div>
      )}
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
