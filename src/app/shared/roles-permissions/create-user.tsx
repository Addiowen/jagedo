'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Loader } from 'rizzui';
import {
  CreateAdminInput,
  createAdminSchema,
  CreateUserInput,
  createUserSchema,
} from '@/utils/validators/create-user.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  permissions,
  roles,
  statuses,
} from '@/app/shared/roles-permissions/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AnyCnameRecord } from 'dns';
import { generatePassword } from '@/lib/password-gen';
export default function CreateUser() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateAdminInput> = async (data) => {
    const randomPassword = generatePassword(10);
    const formattedData = {
      displayName: data.firstname,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      description: 'admin',
      password: randomPassword,
      username: data.email,
      phone: data.phone,

      metadata: {
        firstTimePassword: randomPassword,
        role: 'admin',
        email: data.email,
        phone: data.phone,
      },
    };

    console.log(formattedData, ' post data');

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
        formattedData,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
          },
        }
      );
      console.log('Response:', response.data);

      // Reset form and close modal after successful response
      setReset({
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        permissions: '',
        status: '',
      });
      closeModal();

      router.refresh();
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<CreateAdminInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createAdminSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add Administrator
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="First Name"
              placeholder="Enter user's first name"
              {...register('firstname')}
              className="col-span-full"
              error={errors.firstname?.message}
            />

            <Input
              label="Last Name"
              placeholder="Enter user's last name"
              {...register('lastname')}
              className="col-span-full"
              error={errors.lastname?.message}
            />

            <Input
              label="Email"
              placeholder="Enter user's Email Address"
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Phone"
              placeholder="Enter user's Phone Number"
              className="col-span-full"
              {...register('phone')}
              error={errors.phone?.message}
            />

            <Controller
              name="role"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={roles}
                  value={value ?? ''}
                  onChange={onChange}
                  name={name}
                  label="Role"
                  className="col-span-full"
                  error={errors?.role?.message}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    roles.find((option) => option.value === selected)?.label ??
                    selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />

            {/* <Controller
              name="status"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={statuses}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    statuses.find((option) => option.value === selected)
                      ?.label ?? ''
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            /> */}

            {/* <Controller
              name="permissions"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={permissions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Permissions"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    permissions.find((option) => option.value === selected)
                      ?.label ?? ''
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            /> */}

            <div className="col-span-full flex items-center justify-end gap-4">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={closeModal}
                    className="w-full @xl:w-auto"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full @xl:w-auto"
                  >
                    Create User
                  </Button>
                </>
              )}
            </div>
          </>
        );
      }}
    </Form>
  );
}
