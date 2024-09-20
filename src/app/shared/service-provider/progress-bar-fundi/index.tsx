'use client';

// import { useParams } from 'next/navigation';
import {
  PiCheckCircle,
  PiCloudArrowDown,
  PiCloudArrowUp,
} from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import Timeline from './timeline';
import { useState } from 'react';
import axios, { BASE_URL } from '@/lib/axios';
export default async function ProgressBarActive({
  className,
  statusValue,
}: {
  className?: string;
  statusValue: string;
}) {
  const [file1Url, setFile1Url] = useState<string | null>(null);
  const [file2Url, setFile2Url] = useState<string | null>(null);

  const handleFile1Upload = (url: string) => {
    setFile1Url(url);
    console.log('file1:', url);
  };

  const handleFile2Upload = (url: string) => {
    setFile2Url(url);
    console.log('file2:', url);
  };

  const pathname = usePathname();
  const professional = pathname.includes('professional');
  const contractor = pathname.includes('contractor');
  const complete = pathname.includes('completed');

  const timelineData = [
    {
      title: 'Start',
      text: '',
      hightlightedText: '',
      date: 'April 15, 2024',
      time: '05:31 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
      upload: 'document',
      docs: 'doc1',
    },
    {
      title: 'Stop',
      text: '',
      hightlightedText:
        statusValue === 'approved'
          ? 'Approved'
          : statusValue === 'active'
            ? 'Ongoing'
            : 'Waiting Approval',
      date: 'April 16, 2024',
      time: '05:31 am',
      icon: (
        <PiCheckCircle
          className={`h-6 w-6 ${
            statusValue === 'approved'
              ? 'text-green'
              : statusValue === 'active'
                ? 'text-blue'
                : 'text-orange'
          }`}
        />
      ),
      status: statusValue,
      upload: 'document',
      docs: 'doc2',
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
      hightlightedText: statusValue && 'Waiting Approval',
      date: 'May 02, 2023',
      time: '11:00 am',
      icon: statusValue && <PiCheckCircle className="h-6 w-6 text-orange" />,
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
      hightlightedText: statusValue && 'Waiting Approval',
      date: 'May 02, 2023',
      time: '11:00 am',
      icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
      status: 'ongoing',
      upload: (
        <PiCloudArrowUp className="ml-2 h-6 w-6 text-gray-500 group-hover:text-blue-500" />
      ),
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

  // const userDetailsRes = await axios.patch(
  //   `${BASE_URL}/users/${userDetails.id}`,
  //   updateData,
  //   {
  //     headers: {
  //       Authorization:
  //         'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
  //     },
  //   }
  // );

  return (
    <>
      <div className="ml-14 lg:ml-20">
        <div className="-ml-20 mb-4 mt-12 flex flex-col rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl ">
          {/* <div className="text-gray-900 font-semibold sm:text-lg pb-8">Milestone Tracker</div> */}

          <div className="w-full max-w-screen-lg">
            {complete ? (
              <Timeline
                data={
                  professional
                    ? timelineDataProfessionalComplete
                    : contractor
                      ? timelineDataProfessionalComplete
                      : timelineDataComplete
                }
                order="desc"
                handleFileUpload={handleFile1Upload}
              />
            ) : (
              <Timeline
                data={
                  professional
                    ? timelineDataProfessional
                    : contractor
                      ? timelineDataProfessional
                      : timelineData
                }
                order="desc"
                handleFileUpload={handleFile2Upload}
              />
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
