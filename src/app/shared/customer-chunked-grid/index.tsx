'use client';

import React, { useEffect, useState } from 'react';
import cn from '@/utils/class-names';
import { PiDownloadSimple } from 'react-icons/pi';
import { Title } from 'rizzui';
import JobDescriptionChunked from '../job-description-chunked';
import { useSearchParams } from 'next/navigation';
import { JobDescription } from '@/data/custom-job-details-data';
import ViewAttachments from '../service-provider/details/request-details/view-attachments';

interface Item {
  [key: string]: string | string[];
}

interface Props {
  data: Item;
  className?: string;
  dataChunkSize: number;
}

interface Data {
  name: string;
  url: string;
}

const CustomerChunkedGrid: React.FC<Props> = ({ data, className, dataChunkSize }) => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  // Function to extract the file name from a URL
  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  // State to hold the structured attachment data
  const [attachments, setAttachments] = useState<Data[]>([]);

  // Retrieve and structure attachment data on component mount
  useEffect(() => {
    // Retrieve the JSON string from session storage
    const data = sessionStorage.getItem('uploadedUrls');

    if (data) {
      try {
        // Parse the JSON string to get the array
        const urls = JSON.parse(data) as string[];

        // Create structured data
        const structuredAttachments = urls.map(url => ({
          name: getFileNameFromUrl(url),
          url: url
        }));

        // Update state with structured data
        setAttachments(structuredAttachments);
      } catch (error) {
        console.error("Failed to parse session storage data", error);
      }
    }
  }, []);

  // Convert the data object to an array of key-value pairs
  const dataArray = Object.entries(data);

  // Helper function to chunk the data into subarrays of a specified size
  const chunkArray = (
    array: [string, string | string[]][],
    chunkSize: number
  ) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Chunk data into subarrays of dataChunkSize
  const chunkedData = chunkArray(dataArray, dataChunkSize);

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-0 p-5 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl lg:p-7 xl:rounded-2xl">
      <div className="pb-4 font-semibold text-gray-900 sm:text-lg">
        Project Details
      </div>

      <JobDescriptionChunked
        data={jobId === '3416' ? JobDescription[0] : JobDescription[1]}
        dataChunkSize={1}
      />

      <div
        className={cn(
          !className &&
            'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2',
          className
        )}
      >
        {chunkedData.map((chunk, columnIndex) => (
          <ul
            key={columnIndex}
            className="grid max-w-full grid-cols-2 justify-between gap-6 gap-x-4 rounded-lg border border-gray-300 bg-gray-0 p-4 py-8 shadow-md"
          >
            {chunk.map(([key, value], itemIndex) => (
              <div key={itemIndex} className="flex items-start">
                <div className="flex w-[calc(100%-44px)] items-center justify-between gap-2 ps-3.5">
                  <div className="">
                    <Title
                      as="h4"
                      className="mb-1 whitespace-nowrap text-sm font-semibold"
                    >
                      {key}
                    </Title>
                    {key === 'Attachments' ? (
                      <div className="flex flex-wrap gap-6 text-gray-500">
                        {(value as string[]).map((imgSrc, imgIndex) => (
                          <a key={imgIndex} href={imgSrc} download>
                            <PiDownloadSimple className="h-5 w-5 text-blue-500" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500">{value}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ))}
      </div>

      <ViewAttachments attachments={attachments} />
      
    </div>
  );
};

export default CustomerChunkedGrid;
