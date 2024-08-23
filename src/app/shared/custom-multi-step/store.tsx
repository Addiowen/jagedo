// 'use client'
// import React, { useState } from 'react'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm, SubmitHandler } from 'react-hook-form'

// import { signUpFormSchema, SignUpFormSchema } from '@/utils/validators/custom-signup.schema'
// import { MultiStepFormProps } from '@/types/custom-types'
// import { fundiSteps as steps, fundiInitialValues as initialValues } from '../custom-sign-up/fundi-fields/data'

// // import { Form } from '@/components/ui/form'
// // import { FormDataSchema } from '@/lib/schema'
// // import { motion } from 'framer-motion'
// // import { Input } from 'rizzui'
// // import { z } from 'zod'
// // type Inputs = z.infer<typeof FormDataSchema>

// export default function CustomMultiStepForm({ children }: MultiStepFormProps) {
//   const [previousStep, setPreviousStep] = useState(0)
//   const [currentStep, setCurrentStep] = useState(0)
//   const delta = currentStep - previousStep

//   // react hook form
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     trigger,
//     formState: { errors }
//   } = useForm<SignUpFormSchema>({
//     defaultValues: initialValues,
//     resolver: zodResolver(signUpFormSchema)
//   })

//   // form submit handler
//   const handleFormSubmit: SubmitHandler<SignUpFormSchema> = data => {
//     console.log(data)
//     reset()
//   }

//   type FieldName = keyof SignUpFormSchema

//   // step functions
//   const next = async () => {
//     const fields = steps[currentStep].fields
//     const output = await trigger(fields as FieldName[], { shouldFocus: true })

//     // console.log('before output')
//     // console.log(`Output: ${output}`)

//     if (!output) return

//     // console.log('after output')

//     if (currentStep < steps.length - 1) {

//       if (currentStep === steps.length - 2) {
//         await handleSubmit(handleFormSubmit)()
//       }

//       setPreviousStep(currentStep)
//       setCurrentStep(step => step + 1)
//     }
//   }

//   const prev = () => {
//     if (currentStep > 0) {
//       setPreviousStep(currentStep)
//       setCurrentStep(step => step - 1)
//     }
//   }

//   return (
//     <section className='inset-0 flex flex-col justify-between p-24'>
//       {/* steps */}
//       <nav aria-label='Progress'>
//         <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
//           {steps.map((step, index) => (
//             <li key={step.name} className='md:flex-1'>
//               {currentStep > index ? (
//                 <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
//                   <span className='text-sm font-medium text-sky-600 transition-colors '>
//                     {step.id}
//                   </span>
//                   <span className='text-sm font-medium'>{step.name}</span>
//                 </div>
//               ) : currentStep === index ? (
//                 <div
//                   className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
//                   aria-current='step'
//                 >
//                   <span className='text-sm font-medium text-sky-600'>
//                     {step.id}
//                   </span>
//                   <span className='text-sm font-medium'>{step.name}</span>
//                 </div>
//               ) : (
//                 <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
//                   <span className='text-sm font-medium text-gray-500 transition-colors'>
//                     {step.id}
//                   </span>
//                   <span className='text-sm font-medium'>{step.name}</span>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ol>
//       </nav>

//       {/* Form */}
//       <form className='mt-12 py-12' onSubmit={handleSubmit(handleFormSubmit)}>
//           {children(currentStep, delta, register, errors)}
//       </form>

//       {/* Navigation */}
//       <div className='mt-8 pt-5'>
//         <div className='flex justify-between'>
//           <button
//             type='button'
//             onClick={prev}
//             disabled={currentStep === 0}
//             className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
//           >
//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               fill='none'
//               viewBox='0 0 24 24'
//               strokeWidth='1.5'
//               stroke='currentColor'
//               className='h-6 w-6'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 d='M15.75 19.5L8.25 12l7.5-7.5'
//               />
//             </svg>
//           </button>
//           <button
//             type='button'
//             onClick={next}
//             disabled={currentStep === steps.length - 1}
//             className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
//           >
//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               fill='none'
//               viewBox='0 0 24 24'
//               strokeWidth='1.5'
//               stroke='currentColor'
//               className='h-6 w-6'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 d='M8.25 4.5l7.5 7.5-7.5 7.5'
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }
