'use client'

import ActiveJobDetailsCard from '@/app/shared/service-provider/details/sp-job-details';
import { Button, Modal, Tab } from 'rizzui';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { useState } from 'react';
import ActiveJobDetailsAttachments from '@/app/shared/service-provider/details/sp-job-details/attachments';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// export const metadata = {
//     ...metaObject(),
//   };

  type PageProps = {
    className: string;
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
        
        <div className="flex  justify-center">
              <Button className="mt-6" onClick={handleBackBtn}>Back</Button>
        </div>
      
    </div>
    </>
    )
  }