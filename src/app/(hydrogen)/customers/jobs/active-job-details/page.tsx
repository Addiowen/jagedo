'use client';

import ActiveJobDetailsCard from '@/app/shared/service-provider/details/sp-job-details';
import SpActiveJobsTable from '@/app/shared/service-provider/tables/sp-active-jobs-table/professional';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { metaObject } from '@/config/site.config';
import { Button, Modal, Progressbar } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { routes } from '@/config/routes';
import CustomProgressBar from '@/app/shared/custom-progress-bar';
import { useState } from 'react';

// export const metadata = {
//     ...metaObject(),
//   };

  type PageProps = {
    className: string;
    // other props as needed
  };
  
  export default function JobDetailsPage({ className }: PageProps) {
    const [approvalModalState, setApprovalModalState] = useState(false);

    return (
      <>
       <Modal isOpen={approvalModalState} onClose={() => setApprovalModalState(false)}>
        <div className="p-10">
          <p className="text-center text-lg font-semibold">
            Do you confirm completion of this job?
          </p>

          <div className="mt-6 flex justify-center">
            <Button onClick={() => setApprovalModalState(false)} className="w-32">
              Yes
            </Button>
            <Button
              variant="outline"
              onClick={() => setApprovalModalState(false)}
              className="ml-4 w-32"
            >
              No
            </Button>
          
        </div>
        </div>
      </Modal>
        <div className="flex justify-between">
        <h3 className="mb-4">Job Details</h3>
        <div className="">
          <Button className="mr-4" onClick={() => setApprovalModalState(true)}>
            Approve Job
          </Button>

        </div>
      </div>
      <div className="">
        <ProgressBarActive />
      </div>
      <div className={cn('xl:gap-15 w-full grid grid-cols-1 lg:grid-cols-1', className)}>
      <div className='col-span-2'>
        <ActiveJobDetailsCard />
        {/* <CustomProgressBar /> */}
        
        <div className="flex  justify-center">
          <Link href={routes.customers.active}>
              <Button className="mt-6">Back</Button>
          </Link>
        </div>
      </div>
    </div>
    </>
    )
    
  }
