import ConfirmAvailability from '@/app/shared/service-provider/confirm-availability/confirm-availability';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function RFQEmergencyFundiPage() {
  return (
    <>
        <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
            View Job
        </Title>
    
    <ConfirmAvailability />
    </>
  )
  
}
