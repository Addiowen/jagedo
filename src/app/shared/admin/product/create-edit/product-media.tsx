import { Controller, useFormContext } from 'react-hook-form';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import FormGroup from '@/app/shared/commons/form-group';
import cn from '@/utils/class-names';
import QuillEditor from '@/components/ui/quill-editor';
import { Select } from 'rizzui';
import { categoryOption } from './form-utils';

interface ProductMediaProps {
  className?: string;
}

export default function RequiredDetails({ className }: ProductMediaProps) {
  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Required Details"
      description="Upload your product image gallery here"
      className={cn(className)}
    >
      <Controller
        name="Category"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Category"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.value}
            inPortal={false}
          />
        )}
      />

      <Controller
        name="subcategory"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Sub Category"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.value}
            inPortal={false}
          />
        )}
      />
      <UploadZone
        label="PIN Number*"
        className="flex-grow"
        name="pinNumber"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="Company Profile*"
        className="flex-grow"
        name="companyProfile"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="Business Registration Number*"
        className="flex-grow"
        name="registration"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="Portfolio*"
        className="flex-grow"
        name="portfolio"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="NCA Licence*"
        className="col-span-full"
        name="licence"
        getValues={getValues}
        setValue={setValue}
      />
    </FormGroup>
  );
}
