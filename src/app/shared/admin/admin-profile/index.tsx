'use client';

import { motion } from 'framer-motion';
import { Input, Loader, Textarea } from 'rizzui';
import {
  adminProfileSchema,
  AdminProfileSchema,
  FundiProfileSchema,
  fundiProfileSchema,
} from '@/utils/validators/custom-profile.schema';
import { SubmitHandler, Controller } from 'react-hook-form';
import CustomMultiStepForm from '@/app/shared/custom-multi-step';
import dynamic from 'next/dynamic';
import UploadZone from '@/components/ui/file-upload/upload-zone';
// import Link from 'next/link';
import {
  fundiInitialValues,
  skill,
  gender,
  level,
  years,
  county,
  subCounty,
  booleanQuestion,
} from '@/app/shared/service-provider/profile/create-profile/fundi/data';
import { useRouter, usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import UploadButtonOutlined from '@/components/buttons/upload-button-outlined';
import { FileInput } from '@/app/shared/commons/custom-file-input';
import FundiEvaluationFormAttachments from './attachments';
import axios, { BASE_URL } from '@/lib/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { adminProfileSteps } from './data';
// import UploadButton from "@/app/shared/commons/upload-button";
const FileUpload = dynamic(() => import('@/app/shared/commons/file-upload'), {
  ssr: false,
});

// dynamic import Select component from rizzui
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

export default function CreateAdminProfileForm({
  userDetails,
}: {
  userDetails: any;
}) {
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();
  const pathname = usePathname();

  const adminInitialValues: AdminProfileSchema = {
    firstName: userDetails.firstname || '',
    gender: userDetails.metadata.gender || '',
    county: userDetails.metadata.county || '',
    subCounty: userDetails.metadata.subCounty || '',
    estate: userDetails.metadata.estate || '',
    lastName: userDetails.lastname || '',
    email: userDetails.email || '',
    phoneNo: userDetails.metadata.phone || '',
    idPic: userDetails.metadata.idPic || '',
  };

  // submit handler
  const onSubmit: SubmitHandler<AdminProfileSchema> = async (data) => {
    setLoading(true); // Set loading to true
    try {
      // Prepare the data to be sent to the API
      const updateData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phoneNo,
        // Add skill, level, years, gender, and questions to the metadata
        metadata: {
          firstName: data.firstName,
          lastName: data.lastName,
          county: data.county,
          subCounty: data.subCounty,
          estate: data.estate,
          phone: data.phoneNo,
          idPic: data.idPic,
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
        console.log(userDetailsRes, 'user details');

        // Refresh and redirect after successful profile update
        router.refresh();
        // Determine the redirection based on the pathname
        if (pathname.includes('admin')) {
          router.push(`${routes.admin.editAdminProfile}?id=${userDetails.id}`);
        } else {
          router.push(
            `${routes.serviceProvider.fundi.editProfile}?id=${userDetails.id}`
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
      <CustomMultiStepForm<AdminProfileSchema>
        loading={loading}
        validationSchema={adminProfileSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: adminInitialValues,
        }}
        steps={adminProfileSteps}
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
          </>
        )}
      </CustomMultiStepForm>
    </>
  );
}
