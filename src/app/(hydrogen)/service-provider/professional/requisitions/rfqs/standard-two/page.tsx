import dynamic from 'next/dynamic';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';
import UploadButton from '@/app/shared/commons/upload-button';
import PageHeader from '@/app/shared/commons/page-header';
import ProfessionalCreateQuotationComponent from '@/app/shared/service-provider/create-quotation/professional';
const FileUpload = dynamic(() => import('@/app/shared/commons/file-upload'), {
    ssr: false,
  });

export const metadata = {
  ...metaObject(),
};

const pageHeader = {
  title: 'Create Quotation',
  breadcrumb: [
    {
      href: '#',
      name: 'Home',
    },
    {
      href: '#',
      name: 'Quotations',
    },
    // {
    //   name: 'List',
    // },
  ],
};

export default function RfqStandardTwoPage() {
  return (
    <>
      {/* <div className='flex justify-between items-center'>
        <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
          Create Quotation
        </Title>
        <div className='w-32'>
          <UploadButton modalView={<FileUpload />} />
        </div>
      </div> */}
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <UploadButton modalView={<FileUpload />} /> */}
      </PageHeader>

      <ProfessionalCreateQuotationComponent />
    </>
  )
  
}
