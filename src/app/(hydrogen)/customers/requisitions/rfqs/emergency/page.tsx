'use client';
import ConfirmAvailability from '@/app/shared/service-provider/confirm-availability/confirm-availability';
import { metaObject } from '@/config/site.config';
import { useSearchParams } from 'next/navigation';
import { Title } from 'rizzui';

// export const metadata = {
//   ...metaObject(),
// };

export default function RFQEmergencyFundiPage() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('id');
  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        {`REQ#${requestId}`}
      </Title>

      <ConfirmAvailability />
    </>
  );
}
