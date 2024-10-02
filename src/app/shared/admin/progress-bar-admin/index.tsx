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

export default function ProgressBarActive({
  className,
  category,
  totalAmount,
  statusValue,
}: {
  totalAmount: number;
  category?: string;
  className?: string;
  statusValue: string;
}) {
  const [modalState, setModalState] = useState(false);
  const searchParams = useSearchParams();

  let timelineData: any = [];
  if (category === 'professional') {
    const getTimelineData = (amount: number) => {
      // Determine the number of milestones based on the amount
      let milestones = 0;
      if (amount < 1000000) {
        milestones = 2;
      } else if (amount >= 1000000 && amount <= 6000000) {
        milestones = 3;
      } else if (amount > 6000000) {
        milestones = 4;
      }

      // Start with the initial data
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
      ];

      // Dynamically add the milestones
      for (let i = 1; i <= milestones; i++) {
        timelineData.push({
          title: `Milestone ${i}`,
          text: '',
          hightlightedText: '',
          date: `May 0${i + 1}, 2023`, // Adjust dates as per your logic
          time: `${9 + i}:00 am`,
          icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
          status: 'ongoing',
        });
      }

      // Add the stop point
      timelineData.push({
        title: 'Stop',
        text: '',
        hightlightedText: '',
        date: 'May 29, 2023',
        time: '05:31 am',
        icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
        status: 'ongoing',
      });

      return timelineData;
    };

    timelineData = getTimelineData(totalAmount);
  } else if (category === 'fundi') {
    timelineData = [
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
  }

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
            <Timeline data={timelineData} order="desc" />
          </div>

          {/* <div className=''>     
                <Button onClick={() => setModalState(true)}>Complete Job</Button>       
          </div> */}
        </div>
      </div>
    </>
  );
}
