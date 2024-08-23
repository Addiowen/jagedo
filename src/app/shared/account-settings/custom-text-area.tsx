'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Loader, Text, Input } from 'rizzui';
import FormGroup from '@/app/shared/commons/form-group';
import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import WidgetCard from '@/components/cards/widget-card';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

export default function CustomTextArea({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getManagedByType = (): string | null => {
    return searchParams.get('type');
  };

  const managedByType = getManagedByType();

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = () => {
    router.push(`${routes.admin.createRFQ}?type=${managedByType}`);

    // console.log('Profile settings data ->', {
    //   // ...data,
    // });
  };

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      headerClassName="mb-2 @2xl:mb-5"
    >
      <Form
        // <PersonalInfoFormTypes>
        //   validationSchema={personalInfoFormSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues,
        }}
      >
        {({ control, formState: { errors } }) => {
          return (
            <>
              <div className="mb-5  gap-3 divide-y divide-dashed divide-gray-200 @2xl:gap-5 @3xl:gap-5">
                <FormGroup title="Notes" className="pt-2  @3xl:grid-cols-12 ">
                  <Controller
                    control={control}
                    name="bio"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </FormGroup>
              </div>

              <FormFooter
                // isLoading={isLoading}
                altBtnText="Cancel"
                submitBtnText="Generate RFQ"
              />
            </>
          );
        }}
      </Form>
    </WidgetCard>
  );
}
