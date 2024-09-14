'use client';

import { motion } from 'framer-motion';
import { Input, Loader, Textarea } from 'rizzui';
import {
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
  fundiProfileSteps,
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

export default function CreateFundiProfileForm({
  userDetails,
}: {
  userDetails: any;
}) {
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();
  const pathname = usePathname();

  const fundiInitialValues: FundiProfileSchema = {
    firstName: userDetails.firstname || '',
    county: userDetails.metadata.county || '',
    subCounty: userDetails.metadata.subCounty || '',
    estate: userDetails.metadata.estate || '',
    lastName: userDetails.lastname || '',
    skill: userDetails.metadata.skill || '',
    level: userDetails.metadata.level || '',
    years: userDetails.metadata.years || '',
    gender: userDetails.metadata.gender || '',
    question1: userDetails.metadata.question1 || '',
    question2: userDetails.metadata.question2 || '',
    question3: userDetails.metadata.question3 || '',
    question4: userDetails.metadata.question4 || '',
    resume: userDetails.metadata.resume || '',
    email: userDetails.email || '',
    phoneNo: userDetails.metadata.phone || '',
    idPic: userDetails.metadata.idPic || '',
    certificates: userDetails.metadata.certificates || '',
    ncaCard: userDetails.metadata.ncaCard || '',
  };

  // submit handler
  const onSubmit: SubmitHandler<FundiProfileSchema> = async (data) => {
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
          skill: data.skill,
          level: data.level,
          years: data.years,
          gender: data.gender,
          question1: data.question1,
          question2: data.question2,
          question3: data.question3,
          question4: data.question4,
          idPic: data.idPic,
          certificates: data.certificates,
          ncaCard: data.ncaCard,
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
        console.log(userDetailsRes, 'user details');

        // Send the updated user details as the payload to the external endpoint
        const profileUpdateRes = await axios.post(
          'http://54.221.116.218:4100/sendUserProfileUpdate',
          userDetailsRes.data,
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
            },
          }
        );

        // Log the result of the second request
        console.log(
          'Second request - Profile update response:',
          profileUpdateRes.data
        );
        // Refresh and redirect after successful profile update
        router.refresh();
        // Determine the redirection based on the pathname
        if (pathname.includes('admin')) {
          router.push(`${routes.admin.editFundiProfile}?id=${userDetails.id}`);
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
      <CustomMultiStepForm<FundiProfileSchema>
        loading={loading}
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

            {/* Step 3 */}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Title and description */}
                <div className="col-span-full pb-10 @4xl:col-span-4">
                  <h4 className="text-base font-medium">Evaluation Form</h4>
                  <p className="mt-2">Kindly fill in the details below</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Controller
                    control={control}
                    name="question1"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        dropdownClassName="!z-10"
                        inPortal={false}
                        placeholder="Yes/No"
                        label="Have you done any major works in the construction industry?"
                        size="lg"
                        selectClassName="font-medium text-sm"
                        optionClassName=""
                        options={booleanQuestion}
                        onChange={onChange}
                        value={value}
                        className=""
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          booleanQuestion?.find((r) => r.value === selected)
                            ?.label ?? ''
                        }
                        error={errors?.question1?.message as string}
                      />
                    )}
                  />

                  {/* <Textarea
                      label="Message"
                      value={'state'}
                      maxLength={236}
                      rows={1}
                      size="lg"
                      className=""
                      // onChange={(e) => setState(e.target.value)}
                      // renderCharacterCount={({ characterCount, maxLength }) => (
                      //   <div className="text-right text-sm opacity-70 rtl:text-left">
                      //     {characterCount}/{maxLength}
                      //   </div>
                      // )}
                    /> */}

                  <Input
                    placeholder="E.g., cement, bricks"
                    label="State the materials that you have been using mostly for your jobs"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('question2')}
                    error={errors.question2?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="E.g., plumb bomb, tape measure"
                    label="Name essential equipment that you have been using for your job"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('question3')}
                    error={errors.question3?.message}
                    className="[&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="Answer here"
                    label="How do you always formulate your quotations?"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('question4')}
                    error={errors.question4?.message}
                    className="[&>label>span]:font-medium"
                  />

                  {/* <div className="flex items-center">
                      <p className="font-medium py-auto">Please share with us 3 photos of your previous jobs</p>
                    </div>
                    <UploadButton modalView={<FileUpload />} /> */}
                </div>

                <div className="mt-12">
                  <p className="mb-1 font-medium">
                    Please share with us 3 photos of your previous jobs
                  </p>
                  {/* <FileInput /> */}
                  <FundiEvaluationFormAttachments />
                  {/* <UploadButtonOutlined modalView={<FileUpload />} /> */}

                  {/* <div className="border border-gray-300 border-2 rounded-lg">
                      <div className="w-40 -pt-4 flex">                    
                        <UploadButtonOutlined modalView={<FileUpload />} />
                      </div>
                    </div> */}
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
                  {/* </div> */}

                  {/* <div className="flex"> */}
                  {/* <div> */}
                  <UploadZone
                    label="ID Picture/Passport*"
                    className="flex-grow"
                    name="idFront"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  {/* <UploadZone
                          label="ID Picture/Passport Back:*"
                          className="flex-grow"
                          name="idBack"
                          getValues={getValues}
                          setValue={setValue}
                      /> */}
                  {/* </div> */}

                  <UploadZone
                    label="Certificates*"
                    className="flex-grow"
                    name="certificates"
                    getValues={getValues}
                    setValue={setValue}
                  />

                  {/* <UploadZone
                        label="Resume/CV*"
                        className="flex-grow"
                        name="resume"
                        getValues={getValues}
                        setValue={setValue}
                    /> */}

                  <UploadZone
                    label="NCA Registration Card"
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
