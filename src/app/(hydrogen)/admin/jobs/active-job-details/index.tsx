'use client';

import ActiveJobDetailsCard from '@/app/shared/admin/details/active-job-details';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { Button, Modal, Progressbar } from 'rizzui';
import cn from '@/utils/class-names';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// export const metadata = {
//   ...metaObject(),
// };

type PageProps = {
  className: string;
  requestDetails: any;
  // other props as needed
};

export default function ActiveJobDetails({
  className,
  requestDetails,
}: PageProps) {
  const [modalState, setModalState] = useState(false);
  const [approvalModalState, setApprovalModalState] = useState(false);

  const getparams = useSearchParams();
  const jobId = getparams.get('id');

  return (
    <>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-10">
          <p className="text-center text-lg font-semibold">
            Do you confirm completion of this milestone?
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
            Do you approve completion of this milestone?
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
        <h3 className="mb-4">{`JOB #${jobId?.toLocaleUpperCase()}`}</h3>
        <div className="">
          <Button className="mr-4" onClick={() => setApprovalModalState(true)}>
            Approve Completion
          </Button>

          <Button onClick={() => setModalState(true)}>
            Complete Milestone
          </Button>
        </div>
      </div>
      <div
        className={cn('xl:gap-15 grid grid-cols-1 lg:grid-cols-1', className)}
      >
        <ActiveJobDetailsCard requestDetails={requestDetails} />
      </div>
    </>
  );
}
