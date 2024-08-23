import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/commons/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function PersonalDetailsForm({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Personal Details"
      description=""
      className={cn(className)}
    >
      <Input
        className="-mt-4"
        label="First Name"
        placeholder="First Name"
        {...register('firstName')}
        error={errors.firstName?.message as string}
      />

      <Input
        className="-mt-4"
        label="Last Name"
        placeholder="Last Name"
        {...register('lastName')}
        error={errors.lastName?.message as string}
      />

      {/* <Input
        type="email"
        placeholder="Email"
        label="Email Address"
        {...register('email')}
        error={errors.email?.message as string}
        className="-mt-4"
      /> */}

      <Input
        className="-mt-4"
        label="Email"
        placeholder="Email"
        {...register('email')}
        error={errors.sku?.message as string}
      />

      <Input
        className="-mt-4"
        label="Phone Number"
        placeholder="Phone Number"
        {...register('phoneNumber')}
        error={errors.sku?.message as string}
      />
      <Input
        className="-mt-4"
        label="Gender"
        placeholder="Gender"
        {...register('gender')}
        error={errors.sku?.message as string}
      />
      {/* <Input
        className="-mt-4"
        label="Contact Person Last Name"
        placeholder="Contact Person Last Name"
        {...register('contactlName')}
        error={errors.sku?.message as string}
      /> */}
      <Input
        className="-mt-4"
        label="County"
        placeholder="County"
        {...register('county')}
        error={errors.sku?.message as string}
      />

      <Input
        className="-mt-4"
        label="Sub County"
        placeholder="Sub County"
        {...register('subCounty')}
        error={errors.sku?.message as string}
      />

      <Input
        className="-mt-4"
        label="Estate"
        placeholder="Estate"
        {...register('estate')}
        error={errors.sku?.message as string}
      />
    </FormGroup>
  );
}
