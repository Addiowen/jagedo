'use client';

import { useState } from 'react';
import { Textarea, Button } from 'rizzui';
import Rate from '@/components/ui/rate';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';

type ReviewFormValues = {
  rating: any;
  review: string;
};

export default function ReviewForm() {
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<ReviewFormValues> = (data) => {
    console.log(data);
    setReset({ rating: '', review: '' });
  };
  return (
    <Form<ReviewFormValues>
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { rating: '', review: '' },
      }}
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className='font-semibold text-lg pb-4 text-center'>Add a review...</div>
          <div className="space-y-6">
            <Controller
              name="rating"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Rate size="sm" value={value} onChange={onChange} />
              )}
            />
            <Textarea
              placeholder="Description...."
              {...register('review')}
              error={errors.review?.message}
              textareaClassName="h-24"
              className="col-span-2"
            />
            <div className='flex justify-center'>
              <Button size="lg" className="px-8" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  );
}
