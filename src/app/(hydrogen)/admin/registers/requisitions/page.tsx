import AdminRequisitionsTable from '@/app/shared/admin/dashboard/tables/requisitions/admin-requisitions';
import FundiReviewsTable from '@/app/shared/admin/dashboard/tables/review-table';
import DropDownComponent from '@/components/dropdown/dropdown';
import { metaObject } from '@/config/site.config';
import { PiDownloadBold } from 'react-icons/pi';
import { Button, Dropdown } from 'rizzui';

export const metadata = {
  ...metaObject('Admin Req'),
};

export default function AdminRequisitionsPage() {
  return (
    <div className="@container">
      <div className="mb-6 flex justify-end">
        <DropDownComponent />
      </div>
      <div className="grid grid-cols-1  @4xl:grid-cols-2  3xl:gap-8">
        <AdminRequisitionsTable className="relative  @4xl:col-span-2 " />
      </div>
    </div>
  );
}
