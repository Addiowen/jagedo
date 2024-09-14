'use client';
import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  UseFormProps,
  FieldValues,
  Path,
  FormProvider,
} from 'react-hook-form';
import type { Schema } from 'zod';

import { MultiStepFormSteps } from '@/types/custom-types';
import { Button, Loader, Stepper } from 'rizzui';
import { PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
// import { PiArrowRightBold, PiArrowLeftBold } from 'react-icons/pi';
// import { useRouter } from 'next/navigation';
// import { routes } from '@/config/routes';

// import { fundiSteps as steps, fundiInitialValues as initialValues } from './fundi-fields/data'

// import { Form } from '@/components/ui/form'
// import { FormDataSchema } from '@/lib/schema'
// import { motion } from 'framer-motion'
// import { Input } from 'rizzui'
// import { z } from 'zod'
// type Inputs = z.infer<typeof FormDataSchema>

// type ServerErrors<T> = {
//   [Property in keyof T]: string;
// };

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (
    methods: UseFormReturn<TFormValues>,
    currentStep: number,
    delta: number
  ) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  loading: any;

  // fieldErrors?: any[] | null;
  // formError?: string | string[] | null | any;
  // serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?: any | null;
  steps: MultiStepFormSteps[];
};

// Spinner component
const Spinner = () => (
  <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-4 border-solid border-blue-500"></div>
);

export default function CustomMultiStepForm<
  TFormValues extends Record<string, any> = Record<string, any>,
>({
  loading,
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  steps,
}: FormProps<TFormValues>) {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading
  const delta = currentStep - previousStep;

  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
  });

  const next = async () => {
    const fields = steps[currentStep].fields as Path<TFormValues>[];
    const output = await methods.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await methods.handleSubmit(onSubmit)();
    setIsSubmitting(false);
  };

  return (
    <section className="inset-0 flex flex-col justify-between">
      {/* steps */}
      <nav aria-label="Progress" className="relative">
        <Stepper currentIndex={currentStep}>
          {steps.map((step, index) => (
            <Stepper.Step
              key={step.name}
              title={step.id}
              description={step.name}
            />
          ))}
        </Stepper>
      </nav>

      <FormProvider {...methods}>
        {/* Form */}
        <form className="mt-8 py-3">
          {children(methods, currentStep, delta)}

          {/* Navigation */}
          <div className="mt-16 pt-5">
            <div className="flex justify-between">
              <Button
                className="w-32"
                type="button"
                size="lg"
                onClick={prev}
                disabled={currentStep === 0}
              >
                <PiArrowLeftBold className="ms-2 mt-0.5 h-5 w-5" />
                <span>Back</span>
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  className="flex w-32 items-center justify-center"
                  type="button"
                  size="lg"
                  onClick={() => {
                    methods.handleSubmit(onSubmit)();
                  }}
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <Loader variant="spinner" size="sm" />
                  ) : (
                    <>
                      <span>Submit</span>{' '}
                      <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
                    </>
                  )}
                </Button>
              ) : (
                <Button className="w-32" type="button" size="lg" onClick={next}>
                  <span>Next</span>
                  <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
