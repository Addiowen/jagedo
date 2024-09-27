import PageHeader from '@/app/shared/commons/page-header';

import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';
import AssignProfessionalsTable from '@/app/shared/admin/dashboard/tables/assign-professionals';

export const metadata = {
  ...metaObject('Assign Service Providers'),
};

const fetchFundiAssets = async (county: string) => {
  try {
    const fundis = await apiRequest({
      method: 'POST',

      endpoint: `/search`,
      data: {
        query: 'Fundi',
        customAttributes: {
          county: county,
        },
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

const fetchProfessionalAssets = async () => {
  try {
    const fundis = await apiRequest({
      method: 'POST',

      endpoint: `/search`,
      data: {
        query: 'Professional',
        // customAttributes: {
        //   county: county,
        // },
        page: 1,
        nbResultsPerPage: 40,
      },
    });
    return fundis;
  } catch (error) {
    console.error('Failed to fetch professionals:', error);
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

  const countyLower = county.toLowerCase();

  console.log(countyLower, 'countyLower');

  const serviceProviders = await fetchFundiAssets(countyLower);
  const professionals = await fetchProfessionalAssets();

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

  console.log(spList, 'spList');

  const pageHeader = {
    title: `REQ ${requestId}`,
  };

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title}></PageHeader>
      {/* <FundisTable fundis={spList} />   */}
      <AssignProfessionalsTable professionals={professionalList} />

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
