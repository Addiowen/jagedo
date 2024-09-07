'use client';

import { motion } from 'framer-motion';
import { Input, Loader } from 'rizzui';
import {
  ContractorProfileSchema,
  contractorProfileSchema,
} from '@/utils/validators/custom-profile.schema';
import { SubmitHandler, Controller } from 'react-hook-form';
import CustomMultiStepForm from '@/app/shared/custom-multi-step';
import dynamic from 'next/dynamic';
import UploadZone from '@/components/ui/file-upload/upload-zone';

// import Link from 'next/link';
import {
  contractorInitialValues,
  contractorProfileSteps,
  county,
  subCounty,
  category,
  subCategory,
} from '@/app/shared/service-provider/profile/create-profile/contractor/data';
// import { useRouter } from 'next/navigation';
import CategoriesTable from './categories-table';
// import { routes } from '@/config/routes';

// dynamic import Select component from rizzui
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

export default function CreateContractorProfileForm() {
  // const router = useRouter()

  // submit handler
  const onSubmit: SubmitHandler<ContractorProfileSchema> = (data) => {
    window.sessionStorage.setItem('profileCreated', 'true');
    window.location.reload();
    // router.push()
  };

  return (
    <>
      <CustomMultiStepForm<ContractorProfileSchema>
        validationSchema={contractorProfileSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: contractorInitialValues,
        }}
        steps={contractorProfileSteps}
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
                  <h4 className="text-base font-medium">Personal Details</h4>
                  <p className="mt-2">Provide your personal details.</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Company Name"
                    label="Company Name"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('companyName')}
                    error={errors.companyName?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    type="email"
                    placeholder="Company Email Address"
                    label="Company Email Address"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('email')}
                    error={errors.email?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="Company Number"
                    label="Company Number"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('companyNumber')}
                    error={errors.companyNumber?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="Registration Number"
                    label="Registration Number"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('registrationNumber')}
                    error={errors.registrationNumber?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="Contact Person First Name"
                    label="Contact Person First Name"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="Contact Person Last Name"
                    label="Contact Person Last Name"
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
                    placeholder="Village/Estate"
                    label="Village/Estate"
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
                  <h4 className="text-base font-medium">Required Details</h4>
                  <p className="mt-2">Please provide required details</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <UploadZone
                    label="PIN Certificate"
                    className="flex-grow"
                    name="pinNo"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  <UploadZone
                    label="Company Profile"
                    className="flex-grow"
                    name="companyProfile"
                    getValues={getValues}
                    setValue={setValue}
                  />
                  {/* </div> */}

                  <UploadZone
                    label="Business registration"
                    className="flex-grow"
                    name="businessRegistration"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  <UploadZone
                    label="Portfolio"
                    className="flex-grow"
                    name="portfolio"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  {/* <UploadZone
                        label="NCA License"
                        className="flex-grow"
                        name="ncaCard"
                        getValues={getValues}
                        setValue={setValue}
                    />                                */}
                </div>
                {/* </div> */}
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
                  <h4 className="text-base font-medium">NCA Category</h4>
                  <p className="mt-2">Add one or more</p>
                </div>

                {/* Inputs */}
                <div>
                  <CategoriesTable />
                </div>
              </motion.div>
            )}
          </>
        )}
      </CustomMultiStepForm>
    </>
  );
}
