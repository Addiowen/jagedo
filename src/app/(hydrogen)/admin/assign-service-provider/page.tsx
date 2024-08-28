import PageHeader from '@/app/shared/commons/page-header';

import FundisTable from '@/app/shared/admin/dashboard/tables/fundi';
import { metaObject } from '@/config/site.config';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Assign Service Providers'),
};

const fetchTransactions = async () => {
  try {
    const fundis = await apiRequest({
      method: 'GET',
      endpoint: `/assets`,
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
  const requestId = searchParams.id;

  const fundis = await fetchTransactions();
  console.log(fundis.results, 'the fundis');

  const fundilist =
    fundis?.results.map((item: any, index: number) => {
      console.log('Index:', index); // Log the index
      return {
        no: index + 1,
        id: item.id || '',
        date: item.metadata?.date || '',
        firstName: item.metadata.firstName,
        lastName: item.metadata?.lastName,
        phone: item.metadata.phone,
        category: 'Fundi',
        skill: item.metadata?.subCategory || '',
        county: item.metadata?.county || '',
        subCounty: item.metadata?.subCounty || '',
        status: 'paid' || '',
      };
    }) || [];

  const pageHeader = {
    title: 'REQ',
  };

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title}></PageHeader>
      <FundisTable fundis={fundilist} />

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
