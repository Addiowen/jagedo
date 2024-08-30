'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cn from '@/utils/class-names';
import { PiDownloadSimple } from 'react-icons/pi';
import { Title } from 'rizzui';
import JobDescriptionChunked from '../job-description-chunked';
import { useSearchParams } from 'next/navigation';
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

const CustomerChunkedGrid: React.FC<Props> = ({
  data,
  className,
  dataChunkSize,
}) => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  const JobDescription: any = data.Description;

  const [attachments, setAttachments] = useState<Data[]>([]);
  const [downloadStatus, setDownloadStatus] = useState<string>('');

  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  // Function to download file from a URL
  const downloadFile = async (url: string) => {
    setDownloadStatus('Downloading...');
    try {
      const response = await axios.get(url, {
        responseType: 'blob', // Important for binary data
      });

      // Extract filename from content-disposition header, if available
      const contentDisposition = response.headers['content-disposition'];
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch
        ? fileNameMatch[1]
        : getFileNameFromUrl(url);

      // Create a temporary anchor element to trigger the download
      const urlObject = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlObject;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject);

      setDownloadStatus('Downloaded');
    } catch (error) {
      console.error('Error downloading file:', error);
      setDownloadStatus('Error downloading');
    }
  };

  useEffect(() => {
    const data = sessionStorage.getItem('uploadedUrls');

    if (data) {
      try {
        const urls = JSON.parse(data) as string[];
        const structuredAttachments = urls.map((url) => ({
          name: getFileNameFromUrl(url),
          url: url,
        }));

        setAttachments(structuredAttachments);
      } catch (error) {
        console.error('Failed to parse session storage data', error);
      }
    }
  }, []);

  const dataArray = Object.entries(data);

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

  const chunkedData = chunkArray(dataArray, dataChunkSize);

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-0 p-5 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl lg:p-7 xl:rounded-2xl">
      <div className="pb-4 font-semibold text-gray-900 sm:text-lg">
        Project Details
      </div>

      {/* <JobDescriptionChunked data={JobDescription} /> */}

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
                          <button
                            key={imgIndex}
                            onClick={() => downloadFile(imgSrc)}
                          >
                            <PiDownloadSimple className="h-5 w-5 text-blue-500" />
                          </button>
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

      {downloadStatus && <p>{downloadStatus}</p>}
      <ViewAttachments attachments={attachments} />
    </div>
  );
};

export default CustomerChunkedGrid;
