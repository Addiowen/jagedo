import OrganizationsTable from '@/app/shared/admin/dashboard/tables/customers/organization';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Organization Page'),
};

export default function OrganizationPage() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <OrganizationsTable className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
