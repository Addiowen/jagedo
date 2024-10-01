import PageHeader from '@/app/shared/commons/page-header';

import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import AssignProfessionalsTable from '@/app/shared/admin/dashboard/tables/assign-professionals';
import { categories } from '@/data/product-categories';
import AssignContractorsTable from '@/app/shared/admin/dashboard/tables/assign-contractors';

export const metadata = {
  ...metaObject('Assign Service Providers'),
};

const fetchAssets = async (county: string, serviceProvider: string) => {
  try {
    const fundis = await apiRequest({
      method: 'POST',

      endpoint: `/search`,
      data: {
        query: serviceProvider,
        // customAttributes: {
        //   county: county,
        // },
        page: 1,
        nbResultsPerPage: 40,
      },
    });
    return fundis;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

interface PageProps {
  searchParams: any;
}

export default async function AddtoServiceProviders({
  searchParams,
}: PageProps) {
  const requestId = searchParams.requestId;
  const county = searchParams.county;
  const serviceProviderPath = searchParams.category;

  const countyLower = county.toLowerCase();

  console.log(countyLower, 'countyLower');

  const serviceProviders = await fetchAssets(countyLower, 'Fundi');
  const professionals = await fetchAssets(countyLower, 'Professional');
  const contractors = await fetchAssets(countyLower, 'Contractor');

  console.log(serviceProviders.results[0], 'logged sps');

  const spList =
    serviceProviders?.results.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        userId: item.metadata.userId,
        date: item.metadata?.date || '',
        firstName: item.metadata.firstName,
        lastName: item.metadata?.lastName,
        phone: item.metadata.phone,
        email: item.metadata.email || '',
        category: item.metadata.category,
        skill: item.metadata?.skill || '',
        level: item.metadata.level || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
      };
    }) || [];

  const professionalList =
    professionals?.results.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        userId: item.metadata.userId,
        date: item.metadata?.date || '',
        firstName: item.metadata.firstName,
        lastName: item.metadata?.lastName,
        phone: item.metadata.phone,
        email: item.metadata.email || '',
        category: item.metadata.category,
        profession: item.metadata?.profession || '',
        level: item.metadata.level || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
      };
    }) || [];

  const contractorList =
    contractors?.results.map((item: any, index: number) => {
      return {
        no: index + 1,
        id: item.id || '',
        userId: item.metadata.userId,
        date: item.metadata?.date || '',
        firstName: item.metadata.firstName,
        lastName: item.metadata?.lastName,
        phone: item.metadata.phone,
        email: item.metadata.email || '',
        category: item.metadata.category,
        profession: item.metadata?.profession || '',
        level: item.metadata.level || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
      };
    }) || [];

  console.log(spList, 'spList');

  const pageHeader = {
    title: `REQ ${requestId}`,
  };

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title}></PageHeader>

      {serviceProviderPath === 'fundi' && <FundisTable fundis={spList} />}
      {serviceProviderPath === 'professional' && (
        <AssignProfessionalsTable professionals={professionalList} />
      )}
      {serviceProviderPath === 'contractor' && (
        <AssignContractorsTable contractors={contractorList} />
      )}

      <div className="mt-6">
        {/* <ToastButton
          title="Assign "
          message="Request Assigned!"
          route={routes.admin.dashboard}
        /> */}
      </div>
    </div>
  );
}
