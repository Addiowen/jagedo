'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button, Input, Text, Loader } from 'rizzui'; // Import Loader from rizzui
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import {
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from '@/utils/validators/forget-password.schema';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = async (data) => {
    setLoading(true); // Set loading to true when request starts
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/password/reset/request`,
        {
          username: data.email,
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
          <Text>
            Reset link sent to this email:{' '}
            <Text as="b" className="font-semibold">
              {data.email}
            </Text>
          </Text>
        );
        setReset(initialValues); // Reset the form fields

        router.push(routes.auth.passwordReset);
      } else {
        toast.error('Failed to send reset link. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please check the email and try again.');
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
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