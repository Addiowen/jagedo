'use client'

import ActiveJobDetailsCard from '@/app/shared/service-provider/details/sp-job-details';
// import { metaObject } from '@/config/site.config';
import { Button, Modal, Progressbar, Tab } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { routes } from '@/config/routes';
import { useState } from 'react';
import ActiveJobDetailsAttachments from '@/app/shared/service-provider/details/sp-job-details/attachments';
// import ToastButton from '@/components/buttons/toast-button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// export const metadata = {
//     ...metaObject(),
//   };

  type PageProps = {
    className: string;
    // other props as needed
  };
  
  export default function JobDetailsPage({ className }: PageProps) {
    const [modalState, setModalState] = useState(false);
    const [status, setStatus] = useState('')
    const router = useRouter()

    const handleBackBtn = () => router.back()
    const handleCompleteMilestone = () => {
      toast.success(<p>Request Submitted... Waiting Approval.</p>)
      setStatus('pending')
      setModalState(false)
    }

    return (
      <>
      <div className='flex justify-between'>
      <h3 className="mb-4">JOB0021</h3>
      <div className=''>     
            <Button onClick={() => setModalState(true)}>Complete Milestone</Button>       
      </div>
      </div>
      
      
      <div className={cn('xl:gap-15 grid grid-cols-1 lg:grid-cols-1', className)}>
        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
              <div className='p-10'>
                  <p className='text-center text-lg font-semibold'>Do you confirm completion of this milestone?</p>

                  <div className='flex justify-center mt-6'>
                    {/* <ToastButton 
                    /> */}
                    <Button 
                      onClick={handleCompleteMilestone} 
                      className='w-32'
                    >
                        Yes
                    </Button>
                      <Button variant="outline" onClick={() => setModalState(false)} className="w-32 ml-4">
                          No
                      </Button>
                  </div>
              </div>
          </Modal>

        
          <Tab>
            <Tab.List>
                <Tab.ListItem>Progress Tracker</Tab.ListItem>
                <Tab.ListItem>Project Details</Tab.ListItem>
            </Tab.List>

            <Tab.Panels>
                <Tab.Panel>
                  <ProgressBarActive statusValue={status} />
                  <ActiveJobDetailsAttachments />
                </Tab.Panel>
                <Tab.Panel>
                  <ActiveJobDetailsCard />
                </Tab.Panel>
            </Tab.Panels>
        </Tab>


        {/* <ProgressBarActive statusValue={status} />
        <ActiveJobDetailsAttachments /> */}
        {/* <ActiveJobDetailsCard /> */}
        
        <div className="flex  justify-center">
          {/* <Link href={routes.serviceProvider.fundi.activeJobs}> */}
              <Button className="mt-6" onClick={handleBackBtn}>Back</Button>
          {/* </Link> */}
        </div>
      
    </div>
    </>
    )
  }