import IndividualsTable from '@/app/shared/admin/dashboard/tables/customers/individuals';
import StepProgressBar from '@/components/steps';
import { routes } from '@/config/routes';

import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Customer Register'),
};

export default function IndividualPage() {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const currentStep = 2; // For example, the current step is the third one

  return (
    <div className="@container">
      <StepProgressBar steps={steps} currentStep={1} />
      <div className="mb-6 flex flex-col @lg:flex-row @lg:justify-end">
        <Link
          href={routes.admin.createIndividualProfile}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Customer
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <IndividualsTable className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
