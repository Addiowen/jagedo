
'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'


import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  UseFormProps,
  FieldValues, 
  Path,
  FormProvider,
  useFieldArray,
  ArrayPath,
} from 'react-hook-form';
import type { Schema } from 'zod';

// import { signUpFormSchema, SignUpFormSchema } from '@/utils/validators/custom-signup.schema'
import { MultiStepFormSteps } from '@/types/custom-types'
import { Button, Stepper } from 'rizzui';
import cn from '@/utils/class-names';
import { negMargin } from '@/components/form-footer';
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
  children: (methods: UseFormReturn<TFormValues>, currentStep: number, delta: number) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  // fieldErrors?: any[] | null;
  // formError?: string | string[] | null | any;
  // serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?: any | null;
  steps: MultiStepFormSteps[];
  setModalState: Dispatch<SetStateAction<boolean>>;
  redirect: () => void
  // fieldName: ArrayPath<TFormValues>
  // className?: string;
};


export default function CustomMultiStepComponent<
TFormValues extends Record<string, any> = Record<string, any>,
>(
  { onSubmit,
    children,
    useFormProps,
    validationSchema,
    steps,
    setModalState,
    redirect,
   }: FormProps<TFormValues>
) {

  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
  })

  // const { fields } = useFieldArray({
  //   control: methods.control,
  //   name: fieldName,
  // });

  // form submit handler
  // const handleFormSubmit: SubmitHandler<TFormValues> = data => {
  //   console.log(data)
  //   methods.reset()
  // }

  // type FieldName = keyof TFormValues

  // step functions
  const next = async () => {
    const fields = steps[currentStep].fields as Path<TFormValues>[]
    const output = await methods.trigger(fields, { shouldFocus: true })
    
    // console.log('before output')
    // console.log(`Output: ${output}`)
    // console.log(`Fields: ${fields}`)

    // run the console.log below to check the errors if the stepper is not working
    // console.log(methods.formState.errors)

    if (!output) return

    // console.log('after output')

    if (currentStep < steps.length - 1) {

      // if (currentStep === steps.length - 2) {
      //   await methods.handleSubmit(onSubmit)()
      // }

      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='inset-0 flex flex-col justify-between @container'>
      {/* steps */}
      <nav aria-label='Progress' className="relative">
      {/* <div className="-ml-20 w-full"> */}
        {/* <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'> */}
        <Stepper currentIndex={currentStep}>
          {steps.map((step, index) => (
            
              
                <Stepper.Step key={step.name} title={step.id} description={step.name} />
            //     <li key={step.name} className='md:flex-1'> 
            // </li>
          ))}
          </Stepper>
        {/* </ol> */}
        {/* </div> */}
      </nav>
      
      <FormProvider {...methods}>
        {/* Form */}
        <form className='mt-8 py-3' /*onSubmit={methods.handleSubmit(onSubmit)}*/>
            {children(methods, currentStep, delta)}
          

          {/* Navigation */}
          {/* <div className=''> */}
            {/* <div className='flex justify-between'> */}
            <div
              className={cn(
                'sticky bottom-0 left-0 right-0 z-10 mt-8 -mb-8 flex items-center justify-center gap-4 border-t bg-white px-4 py-2 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50',
                negMargin
              )}
            >
              <Button 
                className="w-full @xl:w-auto" 
                type="button" 
                // size="lg"
                onClick={prev}
                disabled={currentStep === 0}
              >
                <span>Back</span>{' '}
              </Button>

             

              { 
              currentStep === steps.length - 1 ? (
                <>
                <Button 
                  className="w-full @xl:w-auto" 
                  type="button" 
                  // size="lg"   
                  onClick={() => {
                    setModalState(true)
                  }}
                >
                  <span>Preview</span>{' '}
                </Button> 
              
                <Button 
                className="w-full @xl:w-auto" 
                type="button" 
                // size="lg"   
                onClick={() => {
                  // methods.handleSubmit(onSubmit)()
                  redirect()
                }}
                >
                  <span>Submit</span>{' '}
                </Button> 
                </>
              ) : (
                <Button 
                  className="w-full @xl:w-auto" 
                  type="button" 
                  // size="lg"
                  onClick={next}
                >
                  <span>Next</span>{' '}
                </Button>
              )}  
            </div>           
          {/* </div> */}
        </form>
      </FormProvider>
    </section>
  )
}
