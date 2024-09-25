'use client';

import { motion } from 'framer-motion';
import { Input, Loader } from 'rizzui';
import {
  ProfessionalProfileSchema,
  professionalProfileSchema,
} from '@/utils/validators/custom-profile.schema';
import { SubmitHandler, Controller } from 'react-hook-form';
import CustomMultiStepForm from '@/app/shared/custom-multi-step';
import dynamic from 'next/dynamic';
import UploadZone from '@/components/ui/file-upload/upload-zone';
// import Link from 'next/link';
import {
  professionalProfileSteps,
  level,
  county,
  subCounty,
  years,
  field,
} from '@/app/shared/service-provider/profile/create-profile/professional/data';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { useState } from 'react';
import axios, { BASE_URL } from '@/lib/axios';
import toast from 'react-hot-toast';

// dynamic import Select component from rizzui
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

export default function CreateProfessionalProfileForm({
  userDetails,
}: {
  userDetails: any;
}) {
  console.log(userDetails);

  const professionalInitialValues: ProfessionalProfileSchema = {
    firstName: userDetails.firstname,
    lastName: userDetails.lastname,
    email: userDetails.metadata.email,
    phoneNo: userDetails.metadata.phone,
    county: userDetails.metadata.county,
    subCounty: userDetails.metadata.subCounty,
    estate: userDetails.metadata.estate,
    profession: userDetails.metadata.profession,
    field: '',
    level: '',
    years: '',
    idPic: '',
    kcse: '',
    degree: '',
    registrationCertificate: '',
    resume: '',
    portfolio: '',
    pinCertificate: '',
    taxCompliance: '',
    idNo: userDetails.metadata.idNo,
    gender: userDetails.metadata.gender,
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false); // Add loading state

  const pathname = usePathname();

  // submit handler
  const onSubmit: SubmitHandler<ProfessionalProfileSchema> = async (data) => {
    setLoading(true); // Set loading to true
    try {
      // Prepare the data to be sent to the API
      const updateData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        metadata: {
          approvalStatus: 'pending',
          profileCreated: true,
          firstName: data.firstName,
          lastName: data.lastName,
          county: data.county,
          subCounty: data.subCounty,
          estate: data.estate,
          phone: data.phoneNo,
          level: data.level,
          years: data.years,
          gender: data.gender,
          idPic: data.idPic,
          resume: data.resume,
        },
      };

      // Fetch additional user details
      const userDetailsRes = await axios.patch(
        `${BASE_URL}/users/${userDetails.id}`,
        updateData,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      // If the user profile update is successful
      if (userDetailsRes) {
        //Refresh and redirect after successful profile update
        router.refresh();
        // Determine the redirection based on the pathname
        if (pathname.includes('admin')) {
          router.push(`${routes.admin.editFundiProfile}?id=${userDetails.id}`);
        } else if (pathname.includes('professional')) {
          router.push(
            `${routes.serviceProvider.professional.viewProfile}?id=${userDetails.id}`
          );
        } else {
          router.push(
            `${routes.serviceProvider.fundi.editprofileafterCreation}?id=${userDetails.id}`
          );
        }
      }
    } catch (error: any) {
      toast.error('Failed to update user details:', error);
      // Optionally, handle the error (e.g., show a notification)
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
      <CustomMultiStepForm<ProfessionalProfileSchema>
        validationSchema={professionalProfileSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: professionalInitialValues,
        }}
        steps={professionalProfileSteps}
        loading={false}
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
                    placeholder="Email Address"
                    label="Email Address"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('email')}
                    error={errors.email?.message}
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
                  <h4 className="text-base font-medium">Required Details</h4>
                  <p className="mt-2">Please provide required details</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Profession"
                    label="Profession"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('profession')}
                    error={errors.profession?.message}
                    className="flex-grow [&>label>span]:font-medium"
                  />

                  <Controller
                    control={control}
                    name="field"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        dropdownClassName="!z-10"
                        inPortal={false}
                        placeholder="Select field"
                        label="Field"
                        size="lg"
                        selectClassName="font-medium text-sm"
                        optionClassName=""
                        options={field}
                        onChange={onChange}
                        value={value}
                        className=""
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          field?.find((r) => r.value === selected)?.label ?? ''
                        }
                        error={errors?.field?.message as string}
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

                  {/* </div> */}

                  {/* <div className="flex"> */}
                  {/* <div> */}
                  <UploadZone
                    label="PIN No."
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

                  <UploadZone
                    label="NCA License"
                    className="flex-grow"
                    name="ncaCard"
                    getValues={getValues}
                    setValue={setValue}
                  />
                </div>
                {/* </div> */}
              </motion.div>
            )}
          </>
        )}
      </CustomMultiStepForm>
    </>
  );
}
