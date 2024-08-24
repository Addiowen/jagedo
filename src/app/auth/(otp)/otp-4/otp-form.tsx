'use client';

import { PinCode, Button } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios, { BASE_URL, submitFormData } from '@/lib/axios';
import { routes } from '@/config/routes';

type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    await submitFormData(data, `${BASE_URL}/user`);

    router.push(routes.signIn);
  };
  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-5 lg:space-y-8">
          <PinCode
            variant="outline"
            setValue={(value) => setValue('otp', String(value))}
            className="pb-2"
            size="lg"
          />

          <Button
            className="w-full text-base font-medium"
            type="button"
            size="xl"
            variant="outline"
            rounded="lg"
          >
            Resend OTP
          </Button>
          <Button
            className="w-full text-base font-medium"
            type="submit"
            size="xl"
            rounded="lg"
          >
            Verify OTP
          </Button>
        </div>
      )}
    </Form>
  );
}
