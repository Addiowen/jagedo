'use client';

// import { useParams } from 'next/navigation';
import { PiCheckCircle, PiCloudArrowDown, PiCloudArrowUp  } from 'react-icons/pi';
import Timeline from './timeline';
import { usePathname } from 'next/navigation';
import { Button } from 'rizzui';
// import { Button, Modal } from 'rizzui';
// import Link from 'next/link';
// import { routes } from '@/config/routes';
// import { useState } from 'react';

// const timelineData = [
//   {
//     title: 'Start',
//     text: '',
//     hightlightedText: '',
//     date: 'April 15, 2024',
//     time: '05:31 am',
//     icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
//     status: 'ongoing',
//   },
//   {
//     title: 'Stop',
//     text: '',
//     hightlightedText: '',
//     date: 'April 16, 2024',
//     time: '05:31 am',
//     icon: '',
//     status: '',
//   },
// ];

// const timelineDataProfessional = [
//   {
//     title: 'Start',
//     text: '',
//     hightlightedText: '',
//     date: 'April 29, 2023',
//     time: '05:31 am',
//     icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
//     status: 'ongoing',
//   },
//   {
//     title: 'Milestone 1',
//     text: 'Wall Escavations',
//     hightlightedText: '',
//     date: 'May 02, 2023',
//     time: '09:00 am',
//     icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
//     status: 'ongoing',
//     // upload: <PiCloudArrowUp className="ml-2 h-6 w-6 text-gray-500 group-hover:text-blue-500" />,
//   },
//   {
//     title: 'Milestone 2',
//     text: 'Reinforcements',
//     hightlightedText: '',
//     date: 'May 02, 2023',
//     time: '11:00 am',
//     icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
//     status: 'ongoing',
//     // upload: <PiCloudArrowUp className="ml-2 h-6 w-6 text-gray-500 group-hover:text-blue-500" />,
//   },
//   // {
//   //   title: 'Milestone 3',
//   //   text: 'Brick Layering',
//   //   hightlightedText: 'Job complete',
//   //   date: 'May 02, 2023',
//   //   time: '11:30 am',
//   //   icon: '',
//   //   status: '',
//   // },
//   {
//     title: 'Stop',
//     text: '',
//     hightlightedText: '',
//     date: 'May 29, 2023',
//     time: '05:31 am',
//     icon: '',
//     status: '',
//   },
// ];


{/* <Button
              variant="text"
              onClick={() => {}}
              className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
            >
              <PiCloudArrowDown className="h-6 w-6 text-gray-500" />
            </Button> */}


export default function ProgressBarActive({
  className,
  statusValue,
}: {
  className?: string;
  statusValue?: string;
}) {

  const pathname = usePathname()
  const professional = pathname.includes('professional')
  const contractor = pathname.includes('contractor')
  const complete = pathname.includes('completed')

  const timelineData = [
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
      hightlightedText: (statusValue && 'Waiting Approval'),
      date: 'April 16, 2024',
      time: '05:31 am',
      icon: (statusValue && <PiCheckCircle className="h-6 w-6 text-orange" />),
      status: statusValue,
    },
  ];

  const timelineDataComplete = [
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
      hightlightedText: '',
      date: 'April 16, 2024',
      time: '05:31 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
    },
  ];

  const timelineDataProfessional = [
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
      // upload: <PiCloudArrowUp className="ml-2 h-6 w-6 text-gray-500 group-hover:text-blue-500" />,
    },
    {
      title: 'Milestone 2',
      text: 'Reinforcements',
      hightlightedText: (statusValue && 'Waiting Approval'),
      date: 'May 02, 2023',
      time: '11:00 am',
      icon: (statusValue && <PiCheckCircle className="h-6 w-6 text-orange" />),
      status: statusValue,
      // upload: <PiCloudArrowUp className="ml-2 h-6 w-6 text-gray-500 group-hover:text-blue-500" />,
    },
    // {
    //   title: 'Milestone 3',
    //   text: 'Brick Layering',
    //   hightlightedText: 'Job complete',
    //   date: 'May 02, 2023',
    //   time: '11:30 am',
    //   icon: '',
    //   status: '',
    // },
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

  const timelineDataProfessionalComplete = [
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
      // upload: <PiCloudArrowUp className="ml-2 h-6 w-6 text-gray-500 group-hover:text-blue-500" />,
    },
    {
      title: 'Milestone 2',
      text: 'Reinforcements',
      hightlightedText: (statusValue && 'Waiting Approval'),
      date: 'May 02, 2023',
      time: '11:00 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
      // upload: <PiCloudArrowUp className="ml-2 h-6 w-6 text-gray-500 group-hover:text-blue-500" />,
    },
    // {
    //   title: 'Milestone 3',
    //   text: 'Brick Layering',
    //   hightlightedText: 'Job complete',
    //   date: 'May 02, 2023',
    //   time: '11:30 am',
    //   icon: '',
    //   status: '',
    // },
    {
      title: 'Stop',
      text: '',
      hightlightedText: '',
      date: 'May 29, 2023',
      time: '05:31 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
    },
  ];


  return (
    <>
      <div className='ml-14 lg:ml-20'>
        {/* <Modal isOpen={modalState} onClose={() => setModalState(false)}>
            <div className='p-10'>
                <p className='text-center text-lg font-semibold'>Do you confirm completion of this job?</p>
                

                <div className='flex justify-center mt-6'>
                  <Button onClick={() => setModalState(false)} className='w-32'>Yes</Button>
                  
                    <Button variant="outline" onClick={() => setModalState(false)} className="w-32 ml-4">
                        No
                    </Button>
                  
                </div>
            </div>
        </Modal> */}

        <div className='flex flex-col mt-12 -ml-20 mb-4 rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl '>
          {/* <div className="text-gray-900 font-semibold sm:text-lg pb-8">Milestone Tracker</div> */}
          
          <div className='w-full max-w-screen-lg'>
            {complete? (
              <Timeline data={
                professional? 
                timelineDataProfessionalComplete 
                : contractor? 
                timelineDataProfessionalComplete 
                : timelineDataComplete
              } order="desc" /> 
            ) : (
              <Timeline data={
                professional? 
                timelineDataProfessional 
                : contractor? 
                timelineDataProfessional 
                : timelineData
              } order="desc" /> 
            )}         
          </div>

          {/* <div className=''>     
                <Button onClick={() => setModalState(true)}>Complete Job</Button>       
          </div> */}
        </div> 
      </div>
    </>
  );
}
