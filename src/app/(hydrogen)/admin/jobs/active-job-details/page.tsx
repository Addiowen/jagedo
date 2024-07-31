'use client';

import ActiveJobDetailsCard from '@/app/shared/admin/details/active-job-details';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { metaObject } from '@/config/site.config';
import { Button, Modal, Progressbar } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import ProgressBarActive from '@/app/shared/admin/progress-bar-admin';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// export const metadata = {
//   ...metaObject(),
// };

type PageProps = {
  className: string;
  // other props as needed
};

export default function JobDetailsPage({ className }: PageProps) {
  const [modalState, setModalState] = useState(false);
  const [approvalModalState, setApprovalModalState] = useState(false);

  const getparams = useSearchParams();
  const jobId = getparams.get('id');

  return (
    <>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-10">
          <p className="text-center text-lg font-semibold">
            Do you confirm completion of this job?
          </p>
          {/* {/ <Button>Yes</Button> /} */}

          <div className="mt-6 flex justify-center">
            <Button onClick={() => setModalState(false)} className="w-32">
              Yes
            </Button>
            {/* {/ <Link href={routes.serviceProvider.contractor.requisitions}> /} */}
            <Button
              variant="outline"
              onClick={() => setModalState(false)}
              className="ml-4 w-32"
            >
              No
            </Button>
            {/* {/ </Link> /} */}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={approvalModalState}
        onClose={() => setApprovalModalState(false)}
      >
        <div className="p-10">
          <p className="text-center text-lg font-semibold">
            Do you approve completion of this job?
          </p>
          {/* {/ <Button>Yes</Button> /} */}

          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setApprovalModalState(false)}
              className="w-32"
            >
              Yes
            </Button>
            {/* {/ <Link href={routes.serviceProvider.contractor.requisitions}> /} */}
            <Button
              variant="outline"
              onClick={() => setApprovalModalState(false)}
              className="ml-4 w-32"
            >
              No
            </Button>
            {/* {/ </Link> /} */}
          </div>
        </div>
      </Modal>

      <div className="flex justify-between">
        <h3 className="mb-4">Job Details</h3>
        <div className="">
          <Button className="mr-4" onClick={() => setApprovalModalState(true)}>
            Approve Job
          </Button>

          <Button onClick={() => setModalState(true)}>Complete Job</Button>
        </div>
      </div>
      <div
        className={cn('xl:gap-15 grid grid-cols-1 lg:grid-cols-1', className)}
      >
        <ProgressBarActive />

        <ActiveJobDetailsCard />

        {/* <Progressbar
          className="mt-6"
          value={75}
          label="75% Ongoing"
          color="info"
          size="xl"
        /> */}

        <div className="flex  justify-center">
          <Link href={routes.admin.active}>
            <Button className="mt-6">Back</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
