'use client';

import { motion } from 'framer-motion';
import { Input, Loader } from 'rizzui';
import {
  organizationProfileSchema,
  OrganizationProfileSchema,
} from '@/utils/validators/custom-profile.schema';
import { SubmitHandler, Controller } from 'react-hook-form';
import CustomMultiStepForm from '@/app/shared/custom-multi-step';
import dynamic from 'next/dynamic';
import UploadZone from '@/components/ui/file-upload/upload-zone';
// import Link from 'next/link';
import {
  county,
  subCounty,
} from '@/app/shared/service-provider/profile/create-profile/professional/data';
import { useRouter } from 'next/navigation';
import { organizationProfileSteps } from '../../organization/data';
import apiRequest from '@/lib/apiService';
import axios, { BASE_URL } from '@/lib/axios';
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

export default function CreateFundiProfileFormNew({
  userDetails,
}: {
  userDetails?: any;
}) {
  const router = useRouter();

  const organizationProfileInitialValues: OrganizationProfileSchema = {
    type: userDetails.metadata.type || '',
    orgName: userDetails.metadata.orgName || '',
    county: userDetails.metadata.county || '',
    subCounty: userDetails.metadata.subCounty || '',
    estate: userDetails.metadata.estate || '',
    firstName: userDetails.firstname || '',
    lastName: userDetails.lastname || '',
    email: userDetails.email || '',
    phoneNo: userDetails.metadata.phone || '',
    regNo: '',
    pin: '',
  };

  // submit handler
  const onSubmit: SubmitHandler<OrganizationProfileSchema> = async (data) => {
    try {
      // Prepare the data to be sent to the API
      const updateData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phoneNo,

        metadata: {
          county: data.county,
          orgName: data.orgName,
          subCounty: data.subCounty,
          estate: data.estate,
          phoneNo: data.phoneNo,
          regNo: data.regNo,
          pin: data.pin,
        }, // Add the pin from the form if applicable
      };

      console.log(updateData, 'update data');

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

      // Handle the response or redirect after successful update
      if (userDetailsRes) {
        console.log(userDetailsRes, 'user details');

        window.sessionStorage.setItem('profileCreated', 'true');
        router.push(routes.admin.editFundiProfile);
        // router.push('/service-provider/fundi/profile');
      }
    } catch (error) {
      console.error('Failed to update user details:', error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  return (
    <>
      <CustomMultiStepForm<OrganizationProfileSchema>
        // validationSchema={organizationProfileSchema}x
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: organizationProfileInitialValues,
        }}
        steps={organizationProfileSteps}
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
                  <p className="mt-2">Provide the details below.</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Customer Type"
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
                  <p className="mt-2">Please provide required details</p>
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
                    className="flex-grow [&>label>span]:font-medium"
                  />

                  <Input
                    placeholder="Last Name"
                    label="Last Name"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    className="flex-grow [&>label>span]:font-medium"
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
                    placeholder="Phone  Number"
                    label="Phone  Number"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('phoneNo')}
                    error={errors.phoneNo?.message}
                    className="[&>label>span]:font-medium"
                  />

                  {/* <div className="flex"> */}
                  {/* <div> */}
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
                  <h4 className="text-base font-medium">Contact Person</h4>
                  <p className="mt-2">Please provide required details</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <UploadZone
                    label="PIN No."
                    className="flex-grow"
                    name="pinNo"
                    getValues={getValues}
                    setValue={setValue}
                  />
                  <UploadZone
                    label="Registration No."
                    className="flex-grow"
                    name="pinNo"
                    getValues={getValues}
                    setValue={setValue}
                  />
                </div>
                {/* </div> */}
              </motion.div>
            )}

            {/* {currentStep === 2 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
            
                  <div className="col-span-full @4xl:col-span-4 pb-10">
                    <h4 className="text-base font-medium">Contact Person</h4>
                    <p className="mt-2">Please provide required details</p>
                  </div>

              
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
                                                
                    

                     
                
                    <UploadZone
                        label="Registration Number"
                        className="flex-grow"
                        name="regNo"
                        getValues={getValues}
                        setValue={setValue}
                    />

                                
                  </div>
                </motion.div>
              )}          */}
          </>
        )}
      </CustomMultiStepForm>
    </>
  );
}
