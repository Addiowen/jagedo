import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import { Text } from 'rizzui';
import OtpForm from '@/app/auth/(otp)/otp-4/otp-form';

// Function to mask the phone number
const maskPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  const visiblePart = phoneNumber.slice(-4);
  const maskedPart = phoneNumber.slice(0, -4).replace(/\d/g, '*');
  return `${maskedPart}${visiblePart}`;
};

export default function OtpPage({ searchParams }: { searchParams: any }) {
  const phoneNumber = searchParams.phone;
  const maskedPhoneNumber = maskPhoneNumber(phoneNumber);

  return (
    <AuthWrapperFour title="OTP Verification" className="md:px-14 lg:px-20">
      <Text className="pb-7 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-5">
        OTP has been sent to {maskedPhoneNumber}
      </Text>
      <OtpForm />
    </AuthWrapperFour>
  );
}
