// import ServiceProviderRequisitionsTable from '@/app/shared/admin/dashboard/tables/service-provider-requisions';
// import SpRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import ContractorQuotationsTable from '@/app/shared/service-provider/tables/sp-quotations-table/contractor';
// import ContractorRequisitionsTable from '@/app/shared/service-provider/tables/sp-requisitions-table/contractor';
import { metaObject } from '@/config/site.config';
import { BASE_URL } from '@/lib/axios';
import axios from 'axios';
import { getServerSession } from 'next-auth';
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
  
  const session = await getServerSession(authOptions);


  const userId = session?.user?.metadata?.assetId;

  const quotationData = await fetchQuotations({});
  const quotations = await quotationData.data.results;

  const filteredQuotations = quotations.filter((quotation: { metadata: { professionals: any[]; }; }) => {
    return quotation.metadata?.professionals?.includes(session?.user?.metadata?.assetId);
  });

  console.log(quotations, 'quotationData');


  return (
    <>
      {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
        Quotations
      </Title> */}

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <ContractorQuotationsTable quotationData={quotations} className="relative @4xl:col-span-12  @7xl:col-span-8" />
        </div>
      </div>
    </>
  )
  
}
