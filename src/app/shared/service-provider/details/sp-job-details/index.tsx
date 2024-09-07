'use client';

import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import UserDetailsCard from '@/app/shared/custom-user-details-card';
import {
  activeJobDetailsData,
  professionalActiveJobDetailsData,
  contractorActiveJobDetailsData,
} from '@/data/custom-job-details-data';
import { usePathname, useSearchParams } from 'next/navigation';
// import { useState } from 'react';

export default function ActiveJobDetailsCard({
  requestDetails,
}: {
  requestDetails: any;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const jobId = searchParams.get('id');
  const professional = pathname.includes('professional');
  const contractor = pathname.includes('contractor');

  // professionalActiveJobDetailsData

  return (
    <>
      {/* <div className="mb-4">
        <UserDetailsCard />
      </div> */}

      <div className="mb-4">
        {
          <ChunkedGrid
            data={requestDetails}
            dataChunkSize={8}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
            attachementsDetails={requestDetails}
          />
        }
      </div>
    </>
  );
}
