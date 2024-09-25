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
// import UploadZone from '@/components/ui/file-upload/upload-zone';
// import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { organizationProfileSteps } from './data';
import axios, { BASE_URL } from '@/lib/axios';
import { useSession } from 'next-auth/react';
// import UploadButton from '../commons/upload-button';
import UploadButton from '@/app/shared/upload-button/upload-btn';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { counties } from '@/data/counties';
import { county } from '@/app/shared/custom-sign-up/fundi-fields/data';
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

export default function AdminEditOrganizationProfileForm({
  userDetails,
}: {
  userDetails?: any;
}) {
  const [selectedCounty, setSelectedCounty] = useState<
    keyof typeof counties | ''
  >('');

  const [subCounty, setSubCounty] = useState<string>(
    userDetails.metadata.subCounty || ''
  );
  const pathname = usePathname();

  const individualPath = pathname.includes('individual-profile');
  const organizationPath = pathname.includes('organization-profile');

  const subCountyOptions = selectedCounty
    ? counties[selectedCounty]?.map((subCounty: any) => ({
        label: subCounty,
        value: subCounty.toLowerCase().replace(/\s+/g, '-'),
      }))
    : [];

  const router = useRouter();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const customerType = userDetails.metadata.type;

  console.log(userDetails);

  const organizationProfileInitialValues: OrganizationProfileSchema = {
    type: userDetails.metadata.type || '',
    orgName: userDetails.metadata.organizationName || '',
    gender: userDetails.metadata.gender || '',
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
    setLoading(true);
    try {
      // Prepare the data to be sent to the API
      const updateData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,

        metadata: {
          county: data.county,
          gender: data.gender,
          organizationName: data.orgName,
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

        if (individualPath) {
          router.push(
            `${routes.admin.editIndividualCustomerProfile}?id=${userDetails.id}`
          );
        } else if (organizationPath) {
          router.push(
            `${routes.admin.editOrgCustomerProfile}?id=${userDetails.id}`
          );
        }
        toast.success('Profile updated successfully!');
        setLoading(false);
        // router.push('/service-provider/fundi/profile');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to update user details:', error.message);
        toast.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
        toast.error('An unexpected error occurred');
      }
      setLoading(false);
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
        loading={loading}
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
                  {customerType === 'individual' && (
                    <>
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
                        placeholder="Gender"
                        label="Gender"
                        size="lg"
                        inputClassName="text-sm"
                        {...register('gender')}
                        error={errors.gender?.message}
                        className="flex-grow [&>label>span]:font-medium"
                      />
                    </>
                  )}
                  {customerType === 'organization' && (
                    <Input
                      placeholder="Organization Name"
                      label="Organization Name"
                      size="lg"
                      inputClassName="text-sm"
                      {...register('orgName')}
                      error={errors.orgName?.message}
                      className="[&>label>span]:font-medium"
                    />
                  )}

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
                        onChange={(selectedValue) => {
                          onChange(selectedValue);
                          // Update selectedCounty with the corresponding label
                          const selectedCountyLabel = county.find(
                            (county) => county.value === selectedValue
                          )?.label as keyof typeof counties;

                          setSelectedCounty(selectedCountyLabel);

                          // Reset the subCounty value when a different county is selected
                          setValue('subCounty', '');
                          setSubCounty(''); // Clear the local subCounty state as well
                        }}
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
                        options={subCountyOptions}
                        onChange={(selectedOption) => {
                          // Ensure selectedOption is typed properly
                          const selectedValue = (
                            selectedOption as { label: string; value: string }
                          ).value;
                          onChange(selectedValue);
                          setSubCounty(selectedValue); // Update state with the value only
                        }}
                        value={subCounty || value} // Use state or form value
                        error={errors?.subCounty?.message as string}
                        disabled={!selectedCounty}
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
                  <h4 className="text-base font-medium">Additional Details</h4>
                  <p className="mt-2">Provide the required details</p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-4" htmlFor="PIN No.">
                      PIN No.
                    </label>
                    <UploadButton />
                  </div>
                  <div>
                    <label className="mb-4" htmlFor="Registration No.">
                      Registration No.
                    </label>
                    <UploadButton />
                  </div>

                  {/* <UploadZone
                    label="PIN No."
                    className="flex-grow"
                    name="pinNo"
                    getValues={getValues}
                    setValue={setValue}
                  /> */}
                  {/* <UploadZone
                    label="Registration No."
                    className="flex-grow"
                    name="regNo"
                    getValues={getValues}
                    setValue={setValue}
                  /> */}
                </div>
              </motion.div>
            )}
          </>
        )}
      </CustomMultiStepForm>
    </>
  );
}