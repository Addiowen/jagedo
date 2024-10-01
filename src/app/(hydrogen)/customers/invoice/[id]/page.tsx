import { PiDownloadSimpleBold } from 'react-icons/pi';
import InvoiceDetails from '@/app/shared/invoice/invoice-details';
import PrintButton from '@/app/shared/commons/print-button';
import PageHeader from '@/app/shared/commons/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import InvoiceComponent from '@/app/shared/custom-invoice-test';
import apiRequest from '@/lib/apiService';

export const metadata = {
  ...metaObject('Invoice'),
};

const pageHeader = {
  title: 'Invoice Details',
  breadcrumb: [
    {
      href: '',
      name: 'Home',
    },
    {
      href: '',
      name: 'Invoice',
    },
    {
      name: 'Details',
    },
  ],
};



export default async function InvoiceDetailsPage({searchParams}:{searchParams:any}) {



  const fetchQuotationDetails = async () => {
    try {
      const userDetails = await apiRequest({
        method: 'GET',
        endpoint: `/messages/${searchParams.messageId}`,
      });
      return userDetails;
    } catch (error) {
      console.error('Failed to fetch quotation details:', error);
      return null;
    }
  };
  
  const quotationDetails = await fetchQuotationDetails();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <PrintButton />
          <Button className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button> */}
        </div>
      </PageHeader>

      {/* <InvoiceDetails /> */}
      <InvoiceComponent quotationDetails={quotationDetails} />
    </>
  );
}
function fetchUserDetails() {
  throw new Error('Function not implemented.');
}

