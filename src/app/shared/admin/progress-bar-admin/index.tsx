'use client';

import { useParams, useSearchParams } from 'next/navigation';
import {
  PiCheckCircle,
  PiCloudArrowUp,
  PiCopySimple,
  PiMoped,
} from 'react-icons/pi';
import { Button, Modal } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useState } from 'react';
import Timeline from '../../commons/timeline';

const timelineData = [
  {
    title: 'Start',
    text: '',
    hightlightedText: '',
    date: 'April 29, 2023',
    time: '05:31 am',
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
    title: 'Milestone 2',
    text: 'Reinforcements',
    hightlightedText: '',
    date: 'May 02, 2023',
    time: '11:00 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },

  {
    title: 'Stop',
    text: '',
    hightlightedText: '',
    date: 'May 29, 2023',
    time: '05:31 am',
    icon: '',
    status: '',
  },
];

export default function ProgressBarActive({
  className,
  statusValue,
}: {
  className?: string;
  statusValue: string;
}) {
  const [modalState, setModalState] = useState(false);
  const searchParams = useSearchParams();

  const fundiTimelineData = [
    {
      title: 'Start',
      text: '',
      hightlightedText: '',
      date: 'April 15, 2024',
      time: '05:31 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
    },
    {
      title: 'Stop',
      text: '',
      hightlightedText:
        statusValue === 'approved' ||
        statusValue === 'reviewed' ||
        statusValue === 'partially reviewed'
          ? 'Approved'
          : statusValue === 'active'
            ? 'Ongoing'
            : 'Waiting Approval',
      date: 'April 16, 2024',
      time: '05:31 am',
      icon: (
        <PiCheckCircle
          className={`h-6 w-6 ${
            statusValue === 'approved' || statusValue === 'reviewed'
              ? 'text-green'
              : statusValue === 'active'
                ? 'text-blue'
                : 'text-orange'
          }`}
        />
      ),
      status: statusValue,
    },
  ];

  const jobId = searchParams.get('id');

  return (
    <>
      <div className="ml-14 lg:ml-20">
        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
          <div className="p-10">
            <p className="text-center text-lg font-semibold">
              Do you confirm completion of this job?
            </p>

            <div className="mt-6 flex justify-center">
              <Button onClick={() => setModalState(false)} className="w-32">
                Yes
              </Button>
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

        <div className="-ml-20 mb-4 mt-12 flex flex-col rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl ">
          <div className="w-full max-w-screen-lg">
            <Timeline data={fundiTimelineData} order="desc" />
          </div>

          {/* <div className=''>     
                <Button onClick={() => setModalState(true)}>Complete Job</Button>       
          </div> */}
        </div>
      </div>
    </>
  );
}
