'use client';

import ChunkedGrid from '@/app/shared/custom-chunked-grid';
import UserDetailsCard from '@/app/shared/custom-user-details-card';
import {
  activeJobDetailsData,
  professionalActiveJobDetailsData,
  contractorActiveJobDetailsData,
} from '@/data/custom-job-details-data';
import { usePathname, useSearchParams } from 'next/navigation';
import CustomerChunkedGrid from '../../customer-chunked-grid';
// import { useState } from 'react';

export default function ActiveJobDetailsCard({
  transactionDetails,
}: {
  transactionDetails: any;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const jobId = searchParams.get('id');
  const professional = pathname.includes('professional');
  const contractor = pathname.includes('contractor');

  const professionalActiveJobDetailsData = {
    Category: transactionDetails.assetSnapshot.name || '',
    Profession: transactionDetails.metadata.skill || '',
    'Request Type': transactionDetails.metadata.packageType || '',
    'Managed By': transactionDetails.metadata.managed || '',
    County: transactionDetails.metadata.county || '',
    'Sub-County': transactionDetails.metadata.subCounty || '',
    'Estate/Village': transactionDetails.metadata.village || '',
    'Request Date': transactionDetails.metadata.date || '',
    Status:
      transactionDetails.statusHistory.length > 0
        ? transactionDetails.statusHistory[0].status
        : '',
    'Start Date': transactionDetails.startDate
      ? new Date(transactionDetails.startDate).toISOString().split('T')[0]
      : '',
    'End Date': transactionDetails.endDate
      ? new Date(transactionDetails.endDate).toISOString().split('T')[0]
      : '',
    'Invoice Number': transactionDetails.id || '',
    'Payment Status':
      transactionDetails.statusHistory.length > 1
        ? transactionDetails.statusHistory[1].status
        : '',
    Amount: transactionDetails.metadata.amount
      ? transactionDetails.metadata.amount.toString()
      : '',
  };
  console.log(transactionDetails);

  return (
    <>
      <div className="mb-4">
        {/* <UserDetailsCard /> */}
      </div>

      <div className="mb-4">
        {
          <CustomerChunkedGrid
            data={professionalActiveJobDetailsData}
            requestDetails={professionalActiveJobDetailsData}
            dataChunkSize={8}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          />
        }
      </div>
    </>
  );
}
