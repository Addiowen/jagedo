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
  const fetchedEmail = searchParams.get('email');

  const fetchedOtp = searchParams.get('otp');
  const fetchedFirstname = searchParams.get('firstname');
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpStatus, setOtpStatus] = useState<
    'default' | 'correct' | 'incorrect'
  >('default');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (fetchedPhone && !otpSent) {
      setPhoneNumber(fetchedPhone);
      sendOtp();
    }
  }, [fetchedPhone]); // Ensure otpSent state is considered

  const sendOtp = () => {
    if (!otpSent) {
      // Add this check
      if (fetchedOtp === 'sms') {
        sendOtpSms();
      } else if (fetchedOtp === 'email') {
        sendEmailOtp();
      }
    }
  };

  const sendEmailOtp = async () => {
    const otp = generateOtp(); // Generate the OTP
    setGeneratedOtp(otp); // Store the generated OTP
    console.log(generatedOtp, 'generated otp');

    const emailBody = {
      html: `<html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333333;
              margin: 0;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .content {
              font-size: 16px;
              line-height: 1.5;
            }
            .otp-code {
              font-weight: bold;
              font-size: 18px;
              color: #007BFF;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #777777;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="content">
              <p>Dear ${fetchedFirstname},</p>
              <p>Please use the following One-Time Password (OTP) to verify your account. This code is valid for 2 minutes:</p>
              <p class="otp-code">${otp}</p>
              <p>Please do not share this code with anyone.</p>
              <p>If you did not request this code, please ignore this email and contact our support team immediately.</p>
            </div>
            <div class="footer">
              &copy; 2024 JaGedo. All rights reserved.
            </div>
          </div>
        </body>
      </html>`,
      text: `Dear ${fetchedFirstname},\n\nPlease use the following One-Time Password (OTP) to verify your account. This code is valid for 2 minutes:\n\nOTP Code: ${otp}\n\nPlease do not share this code with anyone.\n\nIf you did not request this code, please ignore this email and contact our support team immediately.`,
      from: `"JaGedo" <notifications@jagedo.co.ke>`,
      to: fetchedEmail,
      subject: 'Your Jagedo OTP Code',
      replyTo: 'notifications@jagedo.co.ke',
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/emails/send`,
        emailBody,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
          },
        }
      );

      if (res.data.success) {
        setOtpSent(true);
        toast.success('Email sent successfully.');
        console.log('Email sent successfully:', res.data);
      } else {
        toast.error('Failed to send OTP via email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email OTP:', error);
      toast.error(
        'An error occurred while sending OTP via email. Please try again.'
      );
    }
  };

  const generateOtp = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const sendOtpSms = async () => {
    const otp = generateOtp();
    setGeneratedOtp(otp);
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

  // const sendOtpToUser = () => {
  //   const otp = generateOtp();
  //   setGeneratedOtp(otp);
  //   sendSms(otp);
  // };

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
          sessionStorage.clear();
          router.push(`${routes.signIn}`);
        } else {
          sessionStorage.clear();
          toast.error('Failed to create Zoho user.');
        }
      } else {
        sessionStorage.clear();
        if (response.status >= 400 && response.status < 500) {
          const errorMessage =
            response.data.message || 'Failed to create user.';
          toast.error(`Failed to create user: ${errorMessage}`);
        } else {
          sessionStorage.clear();
          toast.error('Failed to create user.');
        }
      }
    } catch (error) {
      sessionStorage.clear();
      console.error('Error:', error);
      toast.error('An error occurred while creating the user.');
    }
  };

  // Function to send the Welcome SMS
  const sendWelcomeSms = async (phoneNumber: string) => {
    const welcomeMessage = `Welcome to JaGedo. Thanks for Signing up. Start Exploring your Account now. Need help? We're here for you.`;

    try {
      const res = await axios.post('https://uatapimsz.jagedo.co.ke/sendSms', {
        phoneNumber: phoneNumber,
        message: welcomeMessage,
      });

      if (res.data.success) {
        console.log('Welcome SMS sent successfully:', res.data);
        await sendWelcomeEmail(); // Call the function to send the welcome email after SMS
      } else {
        toast.error('Failed to send Welcome SMS.');
      }
    } catch (error) {
      console.error('Error sending Welcome SMS:', error);
      toast.error('An error occurred while sending the Welcome SMS.');
    }
  };

  // Function to send the Welcome Email
  const sendWelcomeEmail = async () => {
    const emailBody = {
      html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333333;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .content {
            font-size: 16px;
            line-height: 1.5;
          }
          .button {
            display: inline-block;
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="content">
            <p>Dear ${fetchedFirstname},</p>
            <p>Your account with JaGedo has been successfully created. You can now log in to create your profile and access our services.</p>
            <p><a href="https://uat.jagedo.co.ke/signin" class="button">Login Here</a></p>
            <p>If you have any questions or need assistance, contact our support team for help.</p>
            <p>Thank you for choosing JaGedo.</p>
          </div>
          <div class="footer">
            &copy; 2024 JaGedo. All rights reserved.
          </div>
        </div>
      </body>
    </html>`,
      text: `Dear ${fetchedFirstname},\n\nYour account with JaGedo has been successfully created. You can now log in to create your profile and access our services.\n\nLogin Here: https://uat.jagedo.co.ke/signin\n\nIf you have any questions or need assistance, contact our support team for help.\n\nThank you for choosing JaGedo.`,
      from: `"JaGedo" <notifications@jagedo.co.ke>`,
      to: fetchedEmail,
      subject: 'Welcome to Jagedo',
      replyTo: 'notifications@jagedo.co.ke',
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/emails/send`,
        emailBody,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
          },
        }
      );

      if (res.data.success) {
        console.log('Welcome email sent successfully:', res.data);
        toast.success('Welcome email sent successfully.');
      } else {
        toast.error('Failed to send Welcome email.');
      }
    } catch (error) {
      console.error('Error sending Welcome email:', error);
      toast.error('An error occurred while sending the Welcome email.');
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
    console.log(otp, 'otp');
    console.log(generatedOtp);

    if (otp === generatedOtp) {
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
            onClick={() => {
              setOtpSent(false); // Reset otpSent state
              sendOtp();
            }}
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
