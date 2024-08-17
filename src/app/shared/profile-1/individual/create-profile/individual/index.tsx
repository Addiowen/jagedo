'use client';

import { motion } from 'framer-motion';
import { Input, Loader } from 'rizzui';
import { FileInput } from '@/app/shared/commons/custom-file-input';
import {
  fundiProfileSchema,
  FundiProfileSchema,
  individualProfileSchema,
  IndividualProfileSchema,
} from '@/utils/validators/custom-profile.schema';

import { SubmitHandler, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import CustomMultiStepForm from '@/app/shared/custom-multi-step';
// import Link from 'next/link';

import {
  county,
  subCounty,
  booleanQuestion,
  individualInitialValues,
  individualProfileSteps,
} from './data';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

// dynamic import Select component from rizzui
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

export default function CreateOrgForm() {
  const router = useRouter();

  // submit handler
  const onSubmit: SubmitHandler<IndividualProfileSchema> = (data) => {
    console.log(data);

    // window.sessionStorage.setItem('profileCreated', 'true');
    router.push(routes.admin.editOrgCustomerProfile);
  };

  return (
    <>
      <CustomMultiStepForm<IndividualProfileSchema>
        validationSchema={individualProfileSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: individualInitialValues,
        }}
        steps={individualProfileSteps}
      >
        {(
          { register, formState: { errors }, control, getValues, setValue },
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
                  <h4 className="text-base font-medium">Company Details</h4>
                  <p className="mt-2">Provide your details.</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Type"
                    label="Type"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('type')}
                    error={errors.type?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="Organization Name"
                    label="Organization Name"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('orgName')}
                    error={errors.orgName?.message}
                    className="[&>label>span]:font-medium"
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
                        className=""
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
                        className="flex-grow"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          subCounty?.find((r) => r.value === selected)?.label ??
                          ''
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
                    className="flex-grow [&>label>span]:font-medium"
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
                <div className="col-span-full pb-10 @4xl:col-span-4">
                  <h4 className="text-base font-medium">Contact Person</h4>
                  <p className="mt-2">Please provide the contact details</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                    placeholder="Phone"
                    label="Phone"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('phone')}
                    error={errors.phone?.message}
                    className="[&>label>span]:font-medium"
                  />

                  {/* <UploadZone
                    label="Certificates*"
                    className="flex-grow"
                    name="certificates"
                    getValues={getValues}
                    setValue={setValue}
                  /> */}
                </div>
              </motion.div>
            )}

            {/* {/ Step 3 /} */}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* {/ Title and description /} */}
                <div className="col-span-full pb-10 @4xl:col-span-4">
                  <h4 className="text-base font-medium">Uploads</h4>
                  <p className="mt-2">Upload the required documents below</p>
                </div>

                {/* {/ Inputs /} */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <UploadZone
                    label="Registreation Number:*"
                    className="flex-grow"
                    name="idFront"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  <UploadZone
                    label="PIN Number:*"
                    className="flex-grow"
                    name="idFront"
                    getValues={getValues}
                    setValue={setValue}
                  />
                </div>
                {/* {/ </div> /} */}
              </motion.div>
            )}
          </>
        )}
      </CustomMultiStepForm>
    </>
  );
}
