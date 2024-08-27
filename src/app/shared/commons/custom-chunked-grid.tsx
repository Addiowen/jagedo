"use client";

import React from 'react';
import cn from '@/utils/class-names';
import {
  PiAcorn,
  PiAtDuotone,
  PiDownloadSimple,
  PiHammer,
  PiHammerBold,
  PiWrench,
  PiWrenchBold,
} from 'react-icons/pi';
import { Title } from 'rizzui';
import JobDescriptionChunked from './job-description-chunked';
import { useSearchParams } from 'next/navigation';
import ActiveJobDetailsAttachments from '../admin/add-attachments';
import ViewAttachmentsBlock from '@/components/view-attachments-block';

export interface Item {
  'Request Type': string;
  'Request Date': string;
  'Request Number'?: string;
  'Job Description'?: string;
  County: string;
  'Sub-County': string;
  'Estate/Village'?: string;
  Status?: string;
  Category: string;
  Profession?: string;
  Skill?: string;
  Contractor?: string;
  'Managed By'?: string;

  'Sub-Category'?: string;
  'Deadline for availability'?: string;
  'Invoice Number'?: string;
  'Payment Status': string;
  Rate?: string;
  'Start Date': string;
  'End Date': string;
  Attachments?: string[];
}

interface Props {
  data: Item;
  className?: string;
  dataChunkSize: number;
}

const ChunkedGrid: React.FC<Props> = ({ data, className, dataChunkSize }) => {
  const searchParams = useSearchParams();

  const jobId = searchParams.get('id');

  const { Attachments, 'Job Description': jobDescription, ...restData } = data;

  // Convert the data object to an array of key-value pairs
  const dataArray = Object.entries(restData);
  console.log(dataArray);

  // Helper function to chunk the data into subarrays of a specified size
  const chunkArray = (array: [string, string][], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Chunk data into subarrays of 4
  const chunkedData = chunkArray(dataArray, dataChunkSize);

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-0 p-5 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl lg:p-7 xl:rounded-2xl">
      <div className="pb-4 font-semibold text-gray-900 sm:text-lg">
        Project Details
      </div>

      {jobDescription && (
        <div className="mb-6 rounded-lg border border-gray-300 bg-gray-0 p-4 py-8 shadow-md">
          <Title as="h4" className="mb-4 text-sm font-semibold text-gray-900">
            Job Description
          </Title>
          <div className="text-gray-500">{jobDescription}</div>
        </div>
      )}

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
              // <li key={itemIndex} className="flex items-start justify-between mb-4 last:mb-0">
              // <span className="font-semibold text-gray-900 mr-2">{key}:</span>
              // <span className="text-end">{value}</span>
              // </li>
              <div key={itemIndex} className="flex items-center">
                {/* <div
              className={cn(
                'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded',
                'bg-gray-100'
                // item.fill,
                // item.color
              )}
            >
              <PiHammerBold className="w-4 h-4" />
            </div> */}
                <div className="flex w-[calc(100%-44px)] items-center justify-between gap-2 ps-3.5">
                  <div className="">
                    <Title
                      as="h4"
                      className="mb-1 whitespace-nowrap text-sm font-semibold"
                    >
                      {key}
                    </Title>
                    {key === 'Attachments' ? (
                      <div className=" flex flex-wrap gap-6 text-gray-500">
                        {(value as unknown as string[]).map(
                          (imgSrc, imgIndex) => (
                            <a key={imgIndex} href={imgSrc} download>
                              <PiDownloadSimple className="h-5 w-5 text-blue-500" />
                            </a>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500">{value}</div>
                    )}
                  </div>
                  {/* <div
                as="span"
                className="font-lexend text-gray-900 dark:text-gray-700"
              >
                {item.price}
              </div> */}
                </div>
              </div>
            ))}
          </ul>
        ))}
      </div>

      {/* {Attachments && Attachments.length > 0 && (
        <div className="mb-6 mt-6 rounded-lg border border-gray-300 bg-gray-0 p-4 py-8 shadow-md">
          <Title as="h4" className="mb-4 text-sm font-semibold text-gray-900">
            Attachments
          </Title>
          <div className="flex flex-wrap gap-6 text-gray-500">
            {Attachments.map((imgSrc, imgIndex) => (
              <a key={imgIndex} href={imgSrc} download>
                <PiDownloadSimple className="h-5 w-5 text-blue-500" />
              </a>
            ))}
          </div>
        </div>
      )} */}

      <ViewAttachmentsBlock />
    </div>
  );
};

export default ChunkedGrid;
