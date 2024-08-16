'use client';

import ActiveJobDetailsCard from '@/app/shared/service-provider/details/sp-job-details';
import SpActiveJobsTable from '@/app/shared/service-provider/tables/sp-active-jobs-table/professional';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { metaObject } from '@/config/site.config';
import { Button, Modal, Tab, Progressbar } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { routes } from '@/config/routes';
import CustomProgressBar from '@/app/shared/custom-progress-bar';
import { useState } from 'react';
import ActiveJobDetailsAttachments from '@/app/shared/add-attachments';
import ActiveJobDetailsViewAttachments from '@/app/shared/view-attachments';
import ViewAttachmentsBlock from '@/app/shared/create-quotation/view-attachments-block';



  type PageProps = {
    className: string;
    // other props as needed
  };
  
  export default function JobDetailsPage({ className }: PageProps) {
    const [approvalModalState, setApprovalModalState] = useState(false);

    return (
      <>
      <Tab>
        <Tab.List>
          <Tab.ListItem>Progress Tracker</Tab.ListItem>
          <Tab.ListItem>Project Details</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="flex justify-end">
              <Button className="mr-4" onClick={() => setApprovalModalState(true)}>
                Confirm Job Completed
              </Button>
            </div>
            <div className="">
              <ProgressBarActive />
            </div>
            {/* <ActiveJobDetailsViewAttachments /> */}
            <ViewAttachmentsBlock/>
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
          </Tab.Panel>


          <Tab.Panel>
            <div className={cn('xl:gap-15 w-full grid grid-cols-1 lg:grid-cols-1', className)}>
              <div className='col-span-2'>
                <ActiveJobDetailsCard />
        
              <div className="flex  justify-center">
                <Link href={routes.customers.active}>
                  <Button className="mt-6">Back</Button>
                </Link>
              </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </>
    )
    
  }
