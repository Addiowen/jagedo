'use client';

import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import UserDetailsCard from '@/app/shared/custom-user-details-card';
import { activeJobDetailsData, professionalActiveJobDetailsData, contractorActiveJobDetailsData } from "@/data/custom-job-details-data";
import { usePathname, useSearchParams } from 'next/navigation';
// import { useState } from 'react';

export default function ActiveJobDetailsCard() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const jobId = searchParams.get('id')
  const professional = pathname.includes('professional')
  const contractor = pathname.includes('contractor')

  return (
    <>
      <div className='mb-4'>
        <UserDetailsCard />
      </div>

      <div className='mb-4'>
        {
          professional? (
            <ChunkedGrid data={jobId === 'JOB0021'? professionalActiveJobDetailsData[0] : professionalActiveJobDetailsData[1]} dataChunkSize={8} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6' />
          ) : contractor? (
            <ChunkedGrid data={jobId === 'JOB0021'? contractorActiveJobDetailsData[0] : contractorActiveJobDetailsData[1]} dataChunkSize={8} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6' />
          ) : (
            <ChunkedGrid data={jobId === 'JOB0021'? activeJobDetailsData[0] : activeJobDetailsData[1]} dataChunkSize={8} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6' />
          )
        }
      </div>
    </>
  );
}
