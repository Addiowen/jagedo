import { Controller, useFormContext } from 'react-hook-form';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import FormGroup from '@/app/shared/commons/form-group';
import cn from '@/utils/class-names';
import QuillEditor from '@/components/ui/quill-editor';
import { Select } from 'rizzui';
// import { categoryOption } from './form-utils';
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
        name="skill"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Skill"
            error={errors?.skill?.message as string}
            getOptionValue={(option) => option.value}
            inPortal={false}
          />
        )}
      />

      <Controller
        name="level"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Level/Class"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.value}
            inPortal={false}
          />
        )}
      />

      <Controller
        name="years"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Years of experience"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.value}
            inPortal={false}
          />
        )}
      />

      <UploadZone
        label="Certificates*"
        className="flex-grow"
        name="certificates"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="ID Picture/Passport Front:*"
        className="flex-grow"
        name="idFront"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="ID Picture/Passport Back:*"
        className="flex-grow"
        name="idBack"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="Resume/CV*"
        className="flex-grow"
        name="resume"
        getValues={getValues}
        setValue={setValue}
      />

      <UploadZone
        label="NCA Registration Card*"
        className="col-span-full"
        name="licence"
        getValues={getValues}
        setValue={setValue}
      />
    </FormGroup>
  );
}
