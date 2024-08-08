'use client';

import { motion } from 'framer-motion';
import { Input, Loader } from 'rizzui';
import { FileInput } from '@/app/shared/commons/custom-file-input';
import {
  fundiProfileSchema,
  FundiProfileSchema,
} from '@/utils/validators/custom-profile.schema';

import { SubmitHandler, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import CustomMultiStepForm from '@/app/shared/custom-multi-step';
// import Link from 'next/link';

import {
  fundiInitialValues,
  fundiProfileSteps,
  gender,
  level,
  years,
  county,
  subCounty,
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

export default function CreateFundiProfileForm() {
  const router = useRouter();

  // submit handler
  const onSubmit: SubmitHandler<FundiProfileSchema> = (data) => {
    console.log(data);

    // window.sessionStorage.setItem('profileCreated', 'true');
    router.push(routes.admin.editFundiProfile);
  };

  return (
    <>
      <CustomMultiStepForm<FundiProfileSchema>
        validationSchema={fundiProfileSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: fundiInitialValues,
        }}
        steps={fundiProfileSteps}
      >
        {(
          { register, formState: { errors }, control, getValues, setValue },
          currentStep,
          delta
        ) => (
          <>
            
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                
                <div className="col-span-full pb-10 @4xl:col-span-4">
                  <h4 className="text-base font-medium">Personal Details</h4>
                  <p className="mt-2">Provide your personal details.</p>
                </div>

               
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
                    placeholder="Phone Number"
                    label="Phone Number"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('phoneNo')}
                    error={errors.phoneNo?.message}
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
                        className=""
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          gender?.find((r) => r.value === selected)?.label ?? ''
                        }
                        error={errors?.gender?.message as string}
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
                
                <div className="col-span-full pb-10 @4xl:col-span-4">
                  <h4 className="text-base font-medium">Required Details</h4>
                  <p className="mt-2">Please provide required details</p>
                </div>

                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

                  <Controller
                    control={control}
                    name="level"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        dropdownClassName="!z-10"
                        inPortal={false}
                        placeholder="Select level/class"
                        label="Level/Class*"
                        size="lg"
                        selectClassName="font-medium text-sm"
                        optionClassName=""
                        options={level}
                        onChange={onChange}
                        value={value}
                        className=""
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          level?.find((r) => r.value === selected)?.label ?? ''
                        }
                        error={errors?.level?.message as string}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="years"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        dropdownClassName="!z-10"
                        inPortal={false}
                        placeholder="Select years of experience"
                        label="Years of experience*"
                        size="lg"
                        selectClassName="font-medium text-sm"
                        optionClassName=""
                        options={years}
                        onChange={onChange}
                        value={value}
                        className=""
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          years?.find((r) => r.value === selected)?.label ?? ''
                        }
                        error={errors?.years?.message as string}
                      />
                    )}
                  />
                 
                  <UploadZone
                    label="ID Picture/Passport Front:*"
                    className="flex-grow"
                    name="idFront"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  <UploadZone
                    label="ID Picture/Passport Back:*"
                    className="flex-grow"
                    name="idBack"
                    getValues={getValues}
                    setValue={setValue}
                  />
                

                  <UploadZone
                    label="Certificates*"
                    className="flex-grow"
                    name="certificates"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  <UploadZone
                    label="Resume/CV*"
                    className="flex-grow"
                    name="resume"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  <UploadZone
                    label="NCA Registration Card*"
                    className="flex-grow"
                    name="ncaCard"
                    getValues={getValues}
                    setValue={setValue}
                  />
                </div>
               
              </motion.div>
            )}

          </>
        )}
      </CustomMultiStepForm>
    </>
  );
}
