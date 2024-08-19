'use client';

import ViewAttachmentsBlock from '@/app/shared/create-quotation/view-attachments-block';
import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import CustomerDetailsCard from '@/app/shared/logistics/dashboard/cutomer-details';
import FundiDetailsCard from '@/app/shared/logistics/dashboard/fundi-details';
import ActiveJobDetailsViewAttachments from '@/app/shared/view-attachments';
import { activeJobDetailsData } from '@/data/job-data';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { Accordion } from 'rizzui';


export default function ActiveJobDetailsCard() {
  // const router = useRouter();
  const searchParams = useSearchParams()

  const jobId = searchParams.get('id')

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  // const handleClick = () => {
  //   router.push(routes.serviceProvider.fundi.activeJobs);
  // };

  return (
    <>
      <h3 className="mb-4">{`JOB#${jobId}`}</h3>
          {/* <div className='mb-4'>
            <CustomerDetailsCard />
          </div> */}
          <div className='mb-4'>
            <ChunkedGrid data={jobId === 'JOB0021'? activeJobDetailsData[0] : activeJobDetailsData[1]} dataChunkSize={8} 
            // className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6' 
            />
            {/* <ActiveJobDetailsViewAttachments /> */}
            <ViewAttachmentsBlock/>
          </div>

          <div className='mb-4'>
            <FundiDetailsCard />
          </div>
         
    </>
  );
}
