'use client';

// import { MultiStepFormProps } from "@/types/custom-types";

import { motion } from 'framer-motion';
import {
  Input,
  Loader,
  Password,
  Radio,
  RadioGroup,
  Text,
  Checkbox,
} from 'rizzui';
import {
  CustomerSignUpFormSchema,
  customerSignUpFormSchema,
} from '@/utils/validators/custom-signup.schema';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import CustomMultiStepForm from '@/app/shared/custom-multi-step';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  customerInitialValues,
  customerSteps,
  type,
  gender,
  country,
  county,
  subCounty,
} from '@/app/shared/custom-sign-up/customer-fields/data';
import { useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { BASE_URL } from '@/lib/axios';
import { routes } from '@/config/routes';
import { log } from 'console';
import { counties } from '@/data/counties';

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

export default function CustomerSteps() {
  const [selectedCounty, setSelectedCounty] = useState<
    keyof typeof counties | ''
  >('');

  const subCountyOptions = selectedCounty
    ? counties[selectedCounty]?.map((subCounty: any) => ({
        label: subCounty,
        value: subCounty.toLowerCase().replace(/\s+/g, '-'),
      }))
    : [];
  const router = useRouter();
  const pathname = usePathname();

  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedGender, setSelectedGender] = useState<string | undefined>();

  // submit handler
  const onSubmit: SubmitHandler<CustomerSignUpFormSchema> = async (data, e) => {
    e?.preventDefault();

    let filteredData = { ...data };

    if (filteredData.type === 'organization') {
      if (!filteredData.organizationName) {
        console.error('Organization Name is required for organization type');
        return;
      }

      if (selectedType === 'organization') {
        filteredData.firstName = filteredData.organizationName;
        filteredData.lastName = filteredData.organizationName;
        filteredData.gender = 'N/A';
      }
    }

    let postData;

    postData = {
      displayName: filteredData.firstName,
      firstname: filteredData.firstName,
      lastname: filteredData.lastName,
      email: filteredData.email,
      description: 'customer',
      username: filteredData.email,
      password: filteredData.password,
      phone: filteredData.phone,
      metadata: {
        role: 'customer',
        type: filteredData.type,
        gender: filteredData.gender,
        phone: filteredData.phone,
        county: filteredData.county,
        subCounty: filteredData.subCounty,
        estate: filteredData.estate,
        otp: filteredData.accountVerification,
      },
    };

    sessionStorage.setItem('postData', JSON.stringify(postData));

    const firstName = postData.firstname ?? '';
    router.push(
      `${routes.auth.otp4}?phone=${encodeURIComponent(filteredData.phone)}&otp=${encodeURIComponent(filteredData.accountVerification)}&email=${encodeURIComponent(filteredData.email)}&firstname=${encodeURIComponent(firstName)}`
    );
    console.log(postData);
  };

  return (
    <>
      <CustomMultiStepForm<CustomerSignUpFormSchema>
        validationSchema={customerSignUpFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: customerInitialValues,
        }}
        steps={customerSteps}
      >
        {(
          { register, watch, formState: { errors }, control },
          currentStep,
          delta
        ) => (
          <>
            {/* Step 1 */}
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Title and description */}
                <div className="col-span-full pb-10 @4xl:col-span-4">
                  <h4 className="text-base font-medium">
                    Personal Information
                  </h4>
                  <p className="mt-2">Provide your personal details.</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Controller
                    control={control}
                    name="type"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        dropdownClassName="!z-10"
                        inPortal={false}
                        placeholder="Select Type"
                        label="Type"
                        size="lg"
                        selectClassName="font-medium text-sm"
                        optionClassName=""
                        options={type}
                        onChange={(val: any) => {
                          onChange(val);
                          setSelectedType(val);
                        }}
                        value={value}
                        className=""
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          type?.find((r) => r.value === selected)?.label ?? ''
                        }
                        error={errors?.type?.message as string}
                      />
                    )}
                  />

                  {selectedType !== 'individual' && (
                    <Input
                      placeholder="Organization Name"
                      label="Organization Name"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('organizationName')}
                      error={errors.organizationName?.message}
                      className="[&>label>span]:font-medium"
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
                  {selectedType === 'individual' && (
                    <>
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
                    </>
                  )}

                  <Input
                    placeholder="Phone Number"
                    label="Phone Number"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('phone')}
                    error={errors.phone?.message}
                    className="[&>label>span]:font-medium"
                  />
                  {selectedType === 'individual' && (
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          dropdownClassName="!z-10"
                          inPortal={false}
                          placeholder="Select gender"
                          label="Gender"
                          size="lg"
                          selectClassName="font-medium text-sm"
                          optionClassName=""
                          options={gender}
                          onChange={(val: any) => {
                            onChange(val);
                            setSelectedGender(val);
                          }}
                          value={value}
                          className=""
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            gender?.find((r) => r.value === selected)?.label ??
                            ''
                          }
                          error={errors?.gender?.message as string}
                        />
                      )}
                    />
                  )}
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
                <div className="col-span-full pb-10 @4xl:col-span-4">
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
                          country?.find((r) => r.value === selected)?.label ??
                          ''
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
                        options={county}
                        onChange={(selectedValue) => {
                          onChange(selectedValue);
                          // Update selectedCounty with the corresponding label
                          const selectedCountyLabel = county.find(
                            (county) => county.value === selectedValue
                          )?.label as keyof typeof counties;
                          setSelectedCounty(selectedCountyLabel);
                        }}
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
                        options={subCountyOptions}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          subCountyOptions?.find((r) => r.value === selected)
                            ?.label ?? ''
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
                <div className="col-span-full pb-10 @4xl:col-span-4">
                  <h4 className="text-base font-medium">Security</h4>
                  <p className="mt-2">Password and Verification</p>
                </div>

                {/* Inputs */}
                <div className="space-y-5">
                  <Password
                    label="Password"
                    placeholder="Enter your password"
                    size="lg"
                    {...register('password')}
                    className="[&>label>span]:font-medium"
                    error={errors.password?.message}
                  />
                  <Password
                    label="Password Confirmation"
                    placeholder="Confirm password"
                    size="lg"
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
                <div className="col-span-full pb-5 @4xl:col-span-4">
                  <h4 className="text-base font-medium">
                    Verifications & Terms
                  </h4>
                  {/* <p className="mt-2">Verification</p> */}
                </div>

                {/* Inputs */}
                <div className="space-y-5">
                  <p className="mt-2 font-semibold text-gray-700">
                    Account Verification
                  </p>
                  <p className="">
                    Choose the channel you will use to verify your account
                  </p>
                  <Controller
                    control={control}
                    name="accountVerification"
                    render={({ field: { value, onChange } }) => (
                      <>
                        <RadioGroup
                          value={value}
                          setValue={onChange}
                          className="flex gap-4"
                        >
                          <Radio label="SMS" value="sms" />
                          <Radio label="Email" value="email" />
                        </RadioGroup>
                        {errors.accountVerification && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.accountVerification.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <p className="mt-2 pt-10 font-semibold text-gray-700">
                  Terms & Policies
                </p>
                <div className="col-span-2 flex flex-col items-start pt-3 text-gray-700">
                  <Checkbox
                    {...register('termsAndConditions')}
                    className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                    label={
                      <Text as="span" className="ps-1 text-gray-500">
                        I agree to the{' '}
                        <Link
                          href="/"
                          className="font-semibold text-gray-700 transition-colors hover:text-primary"
                        >
                          Terms & Conditions
                        </Link>
                      </Text>
                    }
                  />
                  {errors.termsAndConditions && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.termsAndConditions.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 flex flex-col items-start pt-3 text-gray-700">
                  <Checkbox
                    {...register('privacyPolicy')}
                    className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                    label={
                      <Text as="span" className="ps-1 text-gray-500">
                        I agree to the{' '}
                        <Link
                          href="/"
                          className="font-semibold text-gray-700 transition-colors hover:text-primary"
                        >
                          Data Privacy Policy
                        </Link>
                      </Text>
                    }
                  />

                  {errors.privacyPolicy && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.privacyPolicy.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 flex flex-col items-start pt-3 text-gray-700">
                  <Checkbox
                    {...register('refundPolicy')}
                    className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                    label={
                      <Text as="span" className="ps-1 text-gray-500">
                        I agree to the{' '}
                        <Link
                          href="/"
                          className="font-semibold text-gray-700 transition-colors hover:text-primary"
                        >
                          Refund, Rework & Returns Policy
                        </Link>
                      </Text>
                    }
                  />
                  {errors.refundPolicy && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.refundPolicy.message}
                    </p>
                  )}
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
  );
}
