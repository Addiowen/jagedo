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
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios, { BASE_URL } from '@/lib/axios';

// import Link from 'next/link';
import {
  contractorInitialValues,
  contractorProfileSteps,
  category,
  subCategory,
} from '@/app/shared/service-provider/profile/create-profile/contractor/data';
import {
  county,
  subCounty,
} from '@/app/shared/custom-sign-up/fundi-fields/data';

// import { useRouter } from 'next/navigation';
import CategoriesTable from '@/app/shared/service-provider/profile/create-profile/contractor/categories-table';
import { useState } from 'react';
import { counties } from '@/data/counties';
import { routes } from '@/config/routes';
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

export default function EditContractorProfileForm({
  userDetails,
}: {
  userDetails?: any;
}) {
  const router = useRouter();

  const { data: session } = useSession();

  const customerType = session?.user.metadata.type;
  const contractorProfileSchema: ContractorProfileSchema = {
    // accountVerification: userDetails.metadata.accountVerification || '',
    // category: userDetails.metadata.category || '',
    gender: userDetails.metadata.gender || '',
    county: userDetails.metadata.county || '',
    subCounty: userDetails.metadata.subCounty || '',
    estate: userDetails.metadata.estate || '',
    firstName: userDetails.firstname || '',
    lastName: userDetails.lastname || '',
    email: userDetails.email || '',
    phoneNo: userDetails.metadata.phone || '',
    companyName: userDetails.metadata.companyName || '',
    companyNumber: userDetails.metadata.companyNumber || '',
    registrationNumber: userDetails.metadata.registrationNumber || '',
    categoriesTable: userDetails.metadata.categoriesTable || [],
    idNo: '',
  };
  // const router = useRouter()
  console.log('userDetails', userDetails);

  const [subCounty, setSubCounty] = useState<string>(
    userDetails.metadata.subCounty || ''
  );

  const [selectedCounty, setSelectedCounty] = useState<
    keyof typeof counties | ''
  >('');

  const subCountyOptions = selectedCounty
    ? counties[selectedCounty]?.map((subCounty: any) => ({
        label: subCounty,
        value: subCounty.toLowerCase().replace(/\s+/g, '-'),
      }))
    : [];
  // submit handler
  const onSubmit: SubmitHandler<ContractorProfileSchema> = async (data, e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    try {
      // Prepare the data to be sent to the API
      const updateData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,

        metadata: {
          county: data.county,
          gender: data.gender,
          companyName: data.companyName,
          subCounty: data.subCounty,
          estate: data.estate,
          phoneNo: data.phoneNo,
          phone: data.phoneNo,
          companyNumber: data.companyNumber,
          registrationNumber: data.registrationNumber,
          categoriesTable: data.categoriesTable,
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

        // Refresh the session data

        console.log(userDetailsRes, 'user details');
        router.refresh();
        router.push(routes.serviceProvider.contractor.ViewContractorProfile);
        // router.push('/service-provider/fundi/profile');
      }
    } catch (error) {
      console.error('Failed to update user details:', error);
      // Optionally, handle the error (e.g., show a notification)
    }
    console.log(data);

    // router.push()
  };

  const onSubmit1 = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <CustomMultiStepForm<ContractorProfileSchema>
        // validationSchema={contractorProfileSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: contractorProfileSchema,
        }}
        steps={contractorProfileSteps}
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
                    placeholder="Registration Number"
                    label="Registration Number"
                    size="lg"
                    inputClassName="text-sm"
                    {...register('registrationNumber')}
                    error={errors.registrationNumber?.message}
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
                  {/* <Controller
                      control={control}
                      name="category"
                      render={({ field: { value, onChange } }) => (
                        <Select 
                          dropdownClassName="!z-10"
                          inPortal={false}
                          placeholder="Select Contractor"
                          label="Contractor"
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
                    /> */}

                  {/* <label htmlFor="category">Category:</label>
                    <select id="category" {...register('category')} multiple
                      className="block w-full mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {category.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p>{errors.category.message}</p>} */}

                  {/* <Controller
                      control={control}
                      name="subCategory"
                      render={({ field: { value, onChange } }) => (
                        <Select 
                          dropdownClassName="!z-10"
                          inPortal={false}
                          placeholder="Select Class"
                          label="Class*"
                          size="lg"
                          selectClassName="font-medium text-sm"
                          optionClassName=""
                          options={subCategory}
                          onChange={onChange}
                          value={value}
                          className=""
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            subCategory?.find((r) => r.value === selected)?.label ?? ''
                          }
                          error={errors?.subCategory?.message as string}
                        />
                      )}
                    /> */}

                  {/* <Controller
                      name="subCategory"
                      control={control}
                      render={({ field: { onChange, onBlur, value, name, ref } }) => (
                        <MultiSelect
                          options={subCategory} // Options for the multiselect
                          selectedValues={value} // Controlled value
                          onSelect={onChange} // Update the form state on selection
                          onRemove={onChange} // Update the form state on removal
                          displayValue="label" // Property to display
                          // closeDropdownOnSelect={false} // Optional: keep dropdown open after selection
                          ref={ref} // Forward ref to the component
                        />
                      )}
                    /> */}

                  {/* </div> */}

                  {/* <div className="flex"> */}
                  {/* <div> */}
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
