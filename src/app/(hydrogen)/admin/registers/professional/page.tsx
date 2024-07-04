import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import ProfessionalTable from '@/app/shared/admin/dashboard/tables/professional';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Professional Register'),
};

export default function ProfessionalPage() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <ProfessionalTable className="relative  @4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}