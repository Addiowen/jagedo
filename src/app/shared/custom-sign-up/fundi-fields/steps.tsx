'use client'

// import { MultiStepFormProps } from "@/types/custom-types";

import { motion } from "framer-motion";
import { Input, Loader, Password, Radio, RadioGroup, Text, Checkbox } from "rizzui";
import { 
    refinedSpSignUpFormSchema,
    RefinedSpSignUpFormSchema, 
  } from "@/utils/validators/custom-signup.schema";
import { SubmitHandler, Controller } from "react-hook-form";
import CustomMultiStepForm from "@/app/shared/custom-multi-step";
import dynamic from "next/dynamic";
import Link from 'next/link';
import { 
  // fundiInitialValues, 
  spInitialValues,
  category,
  fundiSteps, 
  skill, 
  gender, 
  country, 
  county, 
  subCounty, 
} from "@/app/shared/custom-sign-up/fundi-fields/data";
import { usePathname, useRouter } from 'next/navigation';
import { routes } from "@/config/routes";
// import { routes } from '@/config/routes';


// export type MultiStepFormProps = {

//     currentStep: number,
//     delta: number, 
//     register: UseFormRegister<SignUpFormSchema>, 
//     errors: FieldErrors<SignUpFormSchema>,
     
//   }

// dynamic import Select component from rizzui
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

export default function FundiSteps() {
  const router = useRouter()
  const pathname = usePathname()

  const containsProfessional = pathname.includes('professional')
  const containsContractor = pathname.includes('contractor')

  // function to get schema
  // const getSignUpSchema = (pathname) => {
  //   if (pathname.includes('professional')) {
  //     return professionalSignUpFormSchema
  //   } else if (pathname.includes('contractor')) {
  //     return contractorSignUpFormSchema;
  //   } else {
  //     return fundiSignUpFormSchema; // Fallback schema if none match
  //   }
  // };

  // submit handler
  const onSubmit: SubmitHandler<RefinedSpSignUpFormSchema> = (data, e) => {
    e?.preventDefault()
    // console.log(e)
    // console.log(data);

    router.push(routes.auth.otp4)
  };

    return (
        <>

        <CustomMultiStepForm<RefinedSpSignUpFormSchema>
          validationSchema={refinedSpSignUpFormSchema}
          onSubmit={onSubmit}
          useFormProps={{
            mode: 'onChange',
            defaultValues: spInitialValues,
          }}
          steps={fundiSteps}
        >
          {({ register, formState: { errors }, control }, currentStep, delta) => (
            <>
            {console.log(errors)}

              {/* Step 1 */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Title and description */}
                  <div className="col-span-full @4xl:col-span-4 pb-10">
                    <h4 className="text-base font-medium">Personal Information</h4>
                    <p className="mt-2">Provide your personal details.</p>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {containsProfessional ? (
                      <Input
                        placeholder="Profession"
                        label="Profession"
                        size="lg"
                        inputClassName="text-sm"
                        {...register('profession')}
                        error={errors.profession?.message}
                        className="[&>label>span]:font-medium"
                      />
                    ) : containsContractor ? (
                      <Controller
                        control={control}
                        name="category"
                        render={({ field: { value, onChange } }) => (
                          <Select 
                            dropdownClassName="!z-10"
                            inPortal={false}
                            placeholder="Select Category"
                            label="Category"
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
                            error={errors?.category?.message as string}
                          />
                        )}
                      />
                    ) : (
                      <Controller
                        control={control}
                        name="skill"
                        render={({ field: { value, onChange } }) => (
                          <Select 
                            dropdownClassName="!z-10"
                            inPortal={false}
                            placeholder="Select Skill"
                            label="Skill"
                            size="lg"
                            selectClassName="font-medium text-sm"
                            optionClassName=""
                            options={skill}
                            onChange={onChange}
                            value={value}
                            className=""
                            getOptionValue={(option) => option.value}
                            displayValue={(selected) =>
                              skill?.find((r) => r.value === selected)?.label ?? ''
                            }
                            error={errors?.skill?.message as string}
                          />
                        )}
                      />
                    )}

                    <Input
                      type="email"
                      placeholder="Email"
                      label="Email Address"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('email')}
                      error={errors.email?.message}
                      className="[&>label>span]:font-medium"
                    />
                    <Input
                      placeholder="First Name"
                      label="First Name"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('firstName')}
                      error={errors.firstName?.message}
                      className="[&>label>span]:font-medium"
                    />
                    <Input
                      placeholder="Last Name"
                      label="Last Name"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('lastName')}
                      error={errors.lastName?.message}
                      className="[&>label>span]:font-medium"
                    />
                    <Input
                      placeholder="Phone Number"
                      label="Phone Number"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('phoneNo')}
                      error={errors.phoneNo?.message}
                      className="[&>label>span]:font-medium"
                    />
                    
                    <Input
                      placeholder="ID/Passport Number"
                      label="ID/Passport Number"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('idNo')}
                      error={errors.idNo?.message}
                      className="[&>label>span]:font-medium"
                    />
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field: { value, onChange } }) => (
                        <Select 
                          dropdownClassName="!z-10"
                          inPortal={false}
                          placeholder="Gender"
                          label="Gender"
                          size="lg"
                          selectClassName="font-medium text-sm"
                          optionClassName=""
                          options={gender}
                          onChange={onChange}
                          value={value}
                          className="col-span-full"
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            gender?.find((r) => r.value === selected)?.label ?? ''
                          }
                          error={errors?.gender?.message as string}
                        />
                      )}
                    />
                  </div>
                </motion.div>
              )}

              

              {/* Step 2 */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Title and description */}
                  <div className="col-span-full @4xl:col-span-4 pb-10">
                    <h4 className="text-base font-medium">Location</h4>
                    <p className="mt-2">Please provide your location.</p>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-5">                                     
                    <Controller
                      control={control}
                      name="country"
                      render={({ field: { value, onChange } }) => (
                        <Select 
                          dropdownClassName="!z-10"
                          inPortal={false}
                          placeholder="Country"
                          label="Country"
                          size="lg"
                          selectClassName="font-medium text-sm"
                          optionClassName=""
                          options={country}
                          onChange={onChange}
                          value={value}
                          className="col-span-full"
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            country?.find((r) => r.value === selected)?.label ?? ''
                          }
                          error={errors?.country?.message as string}
                        />
                      )}
                    /> 

                    <Controller
                      control={control}
                      name="county"
                      render={({ field: { value, onChange } }) => (
                        <Select 
                          dropdownClassName="!z-10"
                          inPortal={false}
                          placeholder="County/State"
                          label="County/State"
                          size="lg"
                          selectClassName="font-medium text-sm"
                          optionClassName=""
                          options={county}
                          onChange={onChange}
                          value={value}
                          className="col-span-full"
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            county?.find((r) => r.value === selected)?.label ?? ''
                          }
                          error={errors?.county?.message as string}
                        />
                      )}
                    />  

                    <Controller
                      control={control}
                      name="subCounty"
                      render={({ field: { value, onChange } }) => (
                        <Select 
                          dropdownClassName="!z-10"
                          inPortal={false}
                          placeholder="Sub-County/Area"
                          label="Sub-County/Area"
                          size="lg"
                          selectClassName="font-medium text-sm"
                          optionClassName=""
                          options={subCounty}
                          onChange={onChange}
                          value={value}
                          className="col-span-full"
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            subCounty?.find((r) => r.value === selected)?.label ?? ''
                          }
                          error={errors?.subCounty?.message as string}
                        />
                      )}
                    />  

                    <Input
                      placeholder="Estate"
                      label="Estate"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('estate')}
                      error={errors.estate?.message}
                      className="[&>label>span]:font-medium"
                    />                                  
                    
                  </div>
                </motion.div>
              )}



                {/* Step 3 */}
                {currentStep === 2 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Title and description */}
                  <div className="col-span-full @4xl:col-span-4 pb-10">
                    <h4 className="text-base font-medium">Security</h4>
                    <p className="mt-2">Password and Verification</p>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-5">                   
                    <Password
                      label="Password"
                      placeholder="Enter your password"
                      size='lg'
                      {...register('password')}
                      className="[&>label>span]:font-medium"
                      error={errors.password?.message}
                    />
                    <Password
                      label="Password Confirmation"
                      placeholder="Confirm password"
                      size='lg'
                      {...register('confirmPassword')}
                      className="[&>label>span]:font-medium"
                      error={errors.confirmPassword?.message}
                    />                
                  </div>
                </motion.div>
              )}

              {/* Step 4 */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Title and description */}
                  <div className="col-span-full @4xl:col-span-4 pb-5">
                    <h4 className="text-base font-medium">Verifications & Terms</h4>
                    {/* <p className="mt-2">Verification</p> */}
                  </div>

                  {/* Inputs */}
                  <div className="space-y-5"> 
                    <p className="mt-2 font-semibold text-gray-700">Account Verification</p>
                    <p className="">Choose the channel you will use to verify your account</p>                  
                    <Controller
                        control={control}
                        name="accountVerification"
                        render={({ field: { value, onChange } }) => (
                          <RadioGroup value={value} setValue={onChange} className="flex gap-4" >
                            <Radio label="SMS" value="sms" />
                            <Radio label="Email" value="email" />
                          </RadioGroup>
                        )}
                      />              
                  </div>
                  {/* error={errors?.accountVerification?.message as string} */}

                  <p className="mt-2 font-semibold text-gray-700 pt-10">Terms & Policies</p>
                  <div className="col-span-2 flex items-start text-gray-700 pt-3">
                    <Checkbox
                      {...register('termsAndConditions')}
                      className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                      label={
                        <Text as="span" className="ps-1 text-gray-500">
                          I agree to the{' '}
                          <Link
                            href="#"
                            className="font-semibold text-gray-700 transition-colors hover:text-primary"
                          >
                            Terms & Conditions
                          </Link>
                        </Text>
                      }
                    />
                  </div>

                  <div className="col-span-2 flex items-start text-gray-700 pt-3">
                    <Checkbox
                      {...register('privacyPolicy')}
                      className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                      label={
                        <Text as="span" className="ps-1 text-gray-500">
                          I agree to the{' '}
                          <Link
                            href="#"
                            className="font-semibold text-gray-700 transition-colors hover:text-primary"
                          >
                            Data Privacy Policy
                          </Link>
                        </Text>
                      }
                    />
                  </div>

                  <div className="col-span-2 flex items-start text-gray-700 pt-3">
                    <Checkbox
                      {...register('returnsPolicy')}
                      className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                      label={
                        <Text as="span" className="ps-1 text-gray-500">
                          I agree to the{' '}
                          <Link
                            href="#"
                            className="font-semibold text-gray-700 transition-colors hover:text-primary"
                          >
                            Refund, Rework & Returns Policy
                          </Link>
                        </Text>
                      }
                    />
                  </div>
                </motion.div>
              )}

              {/* {currentStep === 5 && (
                <>  
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Complete
                  </h2>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Thank you for your submission.
                  </p>
                </>
              )} */}
            </>
          )}
        </CustomMultiStepForm>
        
        </>
    )
}