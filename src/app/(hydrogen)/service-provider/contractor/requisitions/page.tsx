// import ServiceProviderRequisitionsTable from '@/app/shared/admin/dashboard/tables/service-provider-requisions';
// import SpRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table';
import ContractorRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/contractor';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function RequisitionsPage() {
  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Requests
      </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <ContractorRequisitionsTable className="relative @4xl:col-span-12  @7xl:col-span-8" />
        </div>
      </div>
    </>
  )
  
}
