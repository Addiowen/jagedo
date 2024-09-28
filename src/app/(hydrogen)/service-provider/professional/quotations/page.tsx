// import ServiceProviderRequisitionsTable from '@/app/shared/admin/dashboard/tables/service-provider-requisions';
// import SpRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table';
// import ProfessionalQuotationsTable from '@/app/shared/service-provider/tables/sp-quotations-table';
// import ContractorQuotationsTable from '@/app/shared/service-provider/tables/sp-quotations-table/contractor';
// import ContractorRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/contractor';
import ProfessionalQuotationsTable from '@/app/shared/service-provider/tables/sp-quotations-table/professional';
import { metaObject } from '@/config/site.config';
import { BASE_URL } from '@/lib/axios';
import axios from 'axios';
import { Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

const fetchQuotations = async (params: any) => {
  const data = await axios.get(
    `${BASE_URL}/transactions?status=assigned`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
      },
    }
  );
  return data;
};


export default async function QuotationsPage() {

  const quotationData = await fetchQuotations({});
  const quotations = await quotationData.data.results;
  console.log(quotations, 'quotationData');
  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Quotations
      </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 3xl:gap-8">
          <ProfessionalQuotationsTable quotationData={quotations}  className="relative @4xl:col-span-12  @7xl:col-span-8" />
        </div>
      </div>
    </>
  )
  
}
