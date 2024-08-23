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
        label="Company Name"
        placeholder="Company Name"
        {...register('title')}
        error={errors.title?.message as string}
      />

      <Input
        className="-mt-4"
        label="Company Email"
        placeholder="Company Email"
        {...register('companyEmail')}
        error={errors.sku?.message as string}
      />

      <Input
        className="-mt-4"
        label="Company Number"
        placeholder="Company Number"
        {...register('companyNumber')}
        error={errors.sku?.message as string}
      />
      <Input
        className="-mt-4"
        label="Contact Person First Name"
        placeholder="Contact Person First Name"
        {...register('contactfName')}
        error={errors.sku?.message as string}
      />
      <Input
        className="-mt-4"
        label="Contact Person Last Name"
        placeholder="Contact Person Last Name"
        {...register('contactlName')}
        error={errors.sku?.message as string}
      />
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
