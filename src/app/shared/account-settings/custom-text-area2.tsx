'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Loader, Text, Input } from 'rizzui';
import { useRouter } from 'next/navigation';
import FormGroup from '@/app/shared/commons/form-group';
import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import WidgetCard from '@/components/cards/widget-card';
import { routes } from '@/config/routes';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

export default function CustomTextArea2({ className }: { className?: string }) {
  const router = useRouter();
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Added to Service Providers!</Text>);

    router.push(routes.admin.dashboard);

    // toast.success(<Text as="b">Successfully added!</Text>);
    // console.log('Profile settings data ->', {
    //   ...data,
    // });
  };

  return (
    <Form
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
            <FormFooter altBtnText="Cancel" submitBtnText="Assign" />
          </>
        );
      }}
    </Form>
  );
}
