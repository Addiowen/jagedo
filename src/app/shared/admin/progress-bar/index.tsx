'use client';

import { useParams } from 'next/navigation';
import { PiCheckCircle, PiCopySimple, PiMoped } from 'react-icons/pi';
import Timeline from './timeline';
import { Button, Modal } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useState } from 'react';

const timelineData = [
  {
    title: 'Milestone 3',
    text: 'Brick Layering',
    hightlightedText: 'Job complete',
    date: 'May 02, 2023',
    time: '11:30 am',
    icon: '',
    status: '',
  },
  {
    title: 'Milestone 2',
    text: 'Reinforcements',
    hightlightedText: '',
    date: 'May 02, 2023',
    time: '11:00 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Milestone 1',
    text: 'Wall Escavations',
    hightlightedText: '',
    date: 'May 02, 2023',
    time: '09:00 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Start',
    text: '',
    hightlightedText: '',
    date: 'April 29, 2023',
    time: '05:31 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
];

export default function ProgressBarActive({
  className,
}: {
  className?: string;
}) {
  const [modalState, setModalState] = useState(false);

  return (
    <>
      <div className="ml-14 lg:ml-28">
        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
          <div className="p-10">
            <p className="text-center text-lg font-semibold">
              Do you confirm completion of this milestone?
            </p>
            {/* {/ <Button>Complete Milestone</Button> /} */}

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
            </div>
          </div>
        </Modal>
        <div className="mb-8">
          {/* {/ <Link href={routes.serviceProvider.fundi.activeJobs}> /} */}
          <Button onClick={() => setModalState(true)}>
            Complete Milestone
          </Button>
        </div>

        <Timeline data={timelineData} order="desc" />
      </div>
    </>
  );
}
