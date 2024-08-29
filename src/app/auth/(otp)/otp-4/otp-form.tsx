'use client';

import { useState, useEffect } from 'react';
import { PinCode, Button } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';

type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const postData = JSON.parse(sessionStorage.getItem('postData') || '{}');

  console.log(postData);
  const searchParams = useSearchParams();
  const fetchedPhone = searchParams.get('phone');
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpStatus, setOtpStatus] = useState<
    'default' | 'correct' | 'incorrect'
  >('default');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (fetchedPhone) {
      setPhoneNumber(fetchedPhone);
    }
    sendOtpToUser();
  }, []);

  const generateOtp = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const sendSms = async (otp: string) => {
    const smsMessage = `Your verification code is ${otp}.`;

    try {
      const res = await axios.post('https://uatapimsz.jagedo.co.ke/sendSms', {
        phoneNumber: fetchedPhone,
        message: smsMessage,
      });

      if (res.data.success) {
        setOtpSent(true);
        console.log('SMS sent successfully:', res.data);
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast.error('An error occurred while sending OTP. Please try again.');
    }
  };

  const sendOtpToUser = () => {
    const otp = generateOtp();
    setGeneratedOtp(otp);
    sendSms(otp);
  };

  const createUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
        postData,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const userDetails = response.data;

        const userPhone = userDetails.metadata.phone || fetchedPhone;

        const zohoResponse = await createZohoUser(userDetails);
        if (zohoResponse.success) {
          await patchUserWithZohoId(
            userDetails.id,
            zohoResponse.data.contact.contact_id
          );
          await sendWelcomeSms(userPhone);
          router.push(`${routes.signIn}`);
        } else {
          toast.error('Failed to create Zoho user.');
        }
      } else {
        if (response.status >= 400 && response.status < 500) {
          const errorMessage =
            response.data.message || 'Failed to create user.';
          toast.error(`Failed to create user: ${errorMessage}`);
        } else {
          toast.error('Failed to create user.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the user.');
    }
  };

  const sendWelcomeSms = async (phoneNumber: string) => {
    const welcomeMessage = `Welcome to JaGedo. Thanks for Signing up. Start Exploring your Account now. Need help? We're here for you.`;

    try {
      const res = await axios.post('https://uatapimsz.jagedo.co.ke/sendSms', {
        phoneNumber: phoneNumber,
        message: welcomeMessage,
      });

      if (res.data.success) {
        console.log('Welcome SMS sent successfully:', res.data);
      } else {
        toast.error('Failed to send Welcome SMS.');
      }
    } catch (error) {
      console.error('Error sending Welcome SMS:', error);
      toast.error('An error occurred while sending the Welcome SMS.');
    }
  };

  const createZohoUser = async (userDetails: any) => {
    const zohoPayload = {
      contact_name: `${userDetails.firstname} ${userDetails.lastname}`,
      company_name: `${userDetails.firstname} ${userDetails.lastname}`,
      customer_sub_type: 'individual',
      city: userDetails.metadata.county,
      state: userDetails.metadata.subCounty,
      country: 'Kenya',
      phone: userDetails.phone || fetchedPhone,
      first_name: userDetails.firstname,
      last_name: userDetails.lastname,
      email: userDetails.email,
    };

    try {
      const response = await axios.post(
        'https://uatapimsz.jagedo.co.ke/createZohoUser',
        zohoPayload
      );

      if (response.data.success) {
        return response.data;
      } else {
        toast.error('Failed to create Zoho user.');
        return { success: false };
      }
    } catch (error) {
      console.error('Error creating Zoho user:', error);
      toast.error('An error occurred while creating Zoho user.');
      return { success: false };
    }
  };

  const patchUserWithZohoId = async (userId: string, zohoId: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
        {
          phone: '0723276981',
          metadata: { zohoid: zohoId },
        },
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
          },
        }
      );
    } catch (error) {
      console.error('Error patching user with Zoho ID:', error);
      toast.error('An error occurred while updating user with Zoho ID.');
    }
  };

  const validateOtp = async (otp: string) => {
    if (otpSent && generatedOtp && otp === generatedOtp) {
      setOtpStatus('correct');
      await createUser();
    } else {
      setOtpStatus('incorrect');
      toast.error('Incorrect OTP. Please try again.');
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await validateOtp(data.otp);
  };

  // const handleOtpChange = (value: string) => {
  //   if (value.length === 4) {
  //     validateOtp(value);
  //   }
  // };

  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-5 lg:space-y-8">
          <PinCode
            variant="outline"
            setValue={(value) => {
              setValue('otp', String(value));
              // handleOtpChange(String(value));
            }}
            className={`pb-2 ${otpStatus === 'correct' ? 'border-green-500' : otpStatus === 'incorrect' ? 'border-red-500' : ''}`}
            size="lg"
          />

          <Button
            className="w-full text-base font-medium"
            type="button"
            size="xl"
            variant="outline"
            rounded="lg"
            onClick={sendOtpToUser}
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
