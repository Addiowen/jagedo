'use client';

import { useState, useEffect } from 'react';
import { PinCode, Button } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { routes } from '@/config/routes';

type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const searchParams = useSearchParams();

  const fetchedPhone = searchParams.get('phone');

  const [phoneNumber, setPhoneNumber] = useState(''); // Store the user's phone number
  const [message, setMessage] = useState(''); // Store the message to be sent
  const [response, setResponse] = useState(null); // Store the response from the API
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpStatus, setOtpStatus] = useState<
    'default' | 'correct' | 'incorrect'
  >('default');
  const router = useRouter();

  // Function to generate a 4-digit OTP
  const generateOtp = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4-digit number
  };

  // Function to send SMS with the OTP
  const sendSms = async (otp: string) => {
    const url = 'https://api.africastalking.com/version1/messaging';
    const smsMessage = `Your verification code is ${otp}. 
 `;

    const data: any = {
      to: phoneNumber.startsWith('+') ? phoneNumber : `+${fetchedPhone}`,
      message: smsMessage,
      username: process.env.NEXT_PUBLIC_USERNAME, // Replace with your Africa's Talking username

      from: process.env.NEXT_PUBLIC_SENDER_ID,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      apiKey: process.env.NEXT_PUBLIC_AFRICA_API_KEY,
    };

    try {
      const res = await axios.post(url, new URLSearchParams(data), { headers });
      setResponse(res.data);
      console.log('SMS sent successfully:', res.data);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  // Send the OTP to the user and store it for later validation
  const sendOtpToUser = () => {
    const otp = generateOtp();
    setGeneratedOtp(otp);
    sendSms(otp); // Send the OTP via SMS
  };

  // Call sendOtpToUser when the component mounts
  useEffect(() => {
    if (fetchedPhone) {
      setPhoneNumber(fetchedPhone);
    }
    sendOtpToUser();
  }, []);

  const validateOtp = (otp: string) => {
    if (generatedOtp && otp === generatedOtp) {
      setOtpStatus('correct');
      return true;
    } else {
      setOtpStatus('incorrect');
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    if (validateOtp(data.otp)) {
      // Perform your form submission logic here if OTP is correct
      router.push(routes.signIn);
    } else {
      // Handle incorrect OTP submission if needed
      setOtpStatus('incorrect');
    }
  };

  const handleOtpChange = (value: string) => {
    if (value.length === 4) {
      // Assuming OTP length is 4
      validateOtp(value);
    }
  };

  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-5 lg:space-y-8">
          <PinCode
            variant="outline"
            setValue={(value) => {
              setValue('otp', String(value));
              handleOtpChange(String(value));
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
            onClick={sendOtpToUser} // Resend OTP on button click
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
