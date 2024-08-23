import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function RequisitionsPage() {
  return (
    <>
      <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        RFQ Standard 1 - Professional
      </Title>
    </>
  )
  
}
