'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button, Input, Loader, Password, Text } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { ForgetPasswordSchema } from '@/utils/validators/forget-password.schema';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/utils/validators/reset-password.schema';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const initialValues = {
  resetToken: '',
  password: '',
  confirmPassword: '',
};

export default function ResetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    const { password, resetToken } = data;

    setLoading(true); // Set loading to true when request starts
    try {
      const response = await axios.post(
        'https://uatapi.jagedo.co.ke/password/reset/confirm',
        {
          resetToken,
          newPassword: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN, // If you need to pass an authorization token
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          <Text>Password reset successfully redirecting... : </Text>
        );
        setReset(initialValues);

        router.push(routes.signIn);
      } else {
        toast.error('Failed to send reset link. Please try again.');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }

    console.log(password, resetToken);

    setReset(initialValues);
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              label="Reset Token"
              placeholder="Enter your Reset Token"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('resetToken')}
              error={errors.resetToken?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Pasword"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              disabled={loading} // Disable button while loading
            >
              {loading ? <Loader /> : 'Reset Password'}{' '}
              {/* Show loader if loading */}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.auth.signIn4}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
