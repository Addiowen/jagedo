'use client';

import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import CustomerDetailsCard from '@/app/shared/logistics/dashboard/cutomer-details';
import FundiDetailsCard from '@/app/shared/logistics/dashboard/fundi-details';
// import UploadZone from '@/components/ui/file-upload/upload-zone';
// import { routes } from '@/config/routes';
// import { useRouter } from 'next/navigation';
// import { PiTrashDuotone, PiUpload } from 'react-icons/pi';
// import { Badge, Button } from 'rizzui';
import { activeJobDetailsData } from '@/data/job-data';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { Accordion } from 'rizzui';


// const data = [
//   {
//     'Requisition Type': 'Standard',
//     'Requisition Date': '13/04/2024',
//     'Requisition Number': '#REQ63532',
//     Location: 'Kome,Homabay',
//     Status: 'Submitted',
//     'Job description': 'Repair of faulty wiring system',
//   },
//   {
//     'Invoice Number': '#3454',
//     'Payment Status': 'Paid',
//     'Deadline for  availability': '20/04/2024',
//     'Start Date': '22/04/2024',
//     'End Date': '30/04/2024',
//   },
// ];

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
      <h3 className="mb-4">Job Details</h3>
          {/* <div className='mb-4'>
            <CustomerDetailsCard />
          </div> */}
          <div className='mb-4'>
            <ChunkedGrid data={jobId === 'JOB0021'? activeJobDetailsData[0] : activeJobDetailsData[1]} dataChunkSize={8} 
            // className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6' 
            />
          </div>

          <div className='mb-4'>
            <FundiDetailsCard />
          </div>
         
    </>
  );
}
