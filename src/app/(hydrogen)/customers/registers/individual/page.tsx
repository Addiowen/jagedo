import IndividualsTable from '@/app/shared/admin/dashboard/tables/individuals';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Customer Register'),
};

export default function IndividualPage() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <IndividualsTable className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
