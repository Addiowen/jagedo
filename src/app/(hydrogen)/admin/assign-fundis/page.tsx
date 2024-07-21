import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button, Text } from 'rizzui';
import PageHeader from '@/app/shared/commons/page-header';
import ReviewsTable from '@/app/shared/ecommerce/review/table';
import { metaObject } from '@/config/site.config';
import AssignServiceProvidersTable from '@/app/shared/admin/dashboard/tables/assign-service-providers';
import CustomTextArea2 from '@/app/shared/account-settings/custom-text-area2';
import toast from 'react-hot-toast';
import { SubmitHandler } from 'react-hook-form';
import { PersonalInfoFormTypes } from '@/utils/validators/personal-info.schema';
import ToastButton from '@/components/buttons/toast-button';

export const metadata = {
  ...metaObject('Assign Service Providers'),
};

const pageHeader = {
  title: 'Assign Service Providers ',
};

// {
//   className,
// }: {
//   className?: string;
// }

export default function AddtoServiceProviders() {
  return (
    <>
      <PageHeader title={pageHeader.title}></PageHeader>
      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <AssignServiceProvidersTable className="relative  @4xl:col-span-2 " />
          <ToastButton AltButton={true} title="Back" />
          <ToastButton
            title="Assign"
            route={routes.admin.dashboard}
            message="Fundis Assigned!"
          />
        </div>
      </div>
    </>
  );
}
