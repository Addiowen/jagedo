'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cn from '@/utils/class-names';
import { PiDownloadSimple } from 'react-icons/pi';
import { Title } from 'rizzui';
import { useRouter, useSearchParams } from 'next/navigation';
import ViewAttachments from '../service-provider/details/request-details/view-attachments';
import { routes } from '@/config/routes';

interface Item {
  [key: string]: string[];
}

interface Props {
  requestDetails: Item;
  className?: string;
  dataChunkSize: number;
}

interface Data {
  name: string;
  url: string;
}

// import { useNavigate } from 'react-router-dom'; // Import the hook

const CustomerChunkedGrid: React.FC<Props> = ({
  requestDetails,
  className,
  dataChunkSize,
}) => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  const JobDescription: any = requestDetails.Description;
  const router =useRouter()

  const [attachments, setAttachments] = useState<Data[]>([]);
  const [downloadStatus, setDownloadStatus] = useState<string>('');

  const uploadsData = requestDetails.Uploads;
  // const navigate = useNavigate(); // Initialize navigate

  const getFileNameFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const downloadFile = async (url: string) => {
    setDownloadStatus('Downloading...');
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch
        ? fileNameMatch[1]
        : getFileNameFromUrl(url);

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
    try {
      const structuredAttachments = uploadsData.map((url) => ({
        name: getFileNameFromUrl(url),
        url: url,
      }));

      setAttachments(structuredAttachments);
    } catch (error) {
      console.error('Failed to parse session storage data', error);
    }
  }, []);

  const dataArray = Object.entries(requestDetails);

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
  console.log(chunkedData);

  // New function to handle redirect
  const handleInvoiceRedirect = () => {
    router.push(`${routes.customers.downloadInvoice}?id=${requestDetails['Invoice Number']}`);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-0 p-5 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl lg:p-7 xl:rounded-2xl">
      <div className="pb-4 font-semibold text-gray-900 sm:text-lg">
        Project Details
      </div>

      <div
        className={cn(
          !className &&
            'grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1',
          className
        )}
      >
        {chunkedData.map((chunk, columnIndex) => (
          <ul
            key={columnIndex}
            className="grid max-w-full grid-cols-2 justify-between gap-6 gap-x-4 rounded-lg border border-gray-300 bg-gray-0 p-4 py-8 shadow-md"
          >
            {chunk.map(
              ([key, value], itemIndex) =>
                key !== 'Uploads' && (
                  <div
                    key={itemIndex}
                    className={cn(
                      'flex items-start',
                      key === 'Description' && 'col-span-2' // Span the entire width for Description
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-2 ps-3.5">
                      <div className="w-full">
                        <Title
                          as="h4"
                          className="mb-1 whitespace-nowrap text-sm font-semibold"
                        >
                          {key}
                        </Title>
                        {key === 'Download Invoice' ? (
                          <button
                            onClick={handleInvoiceRedirect}
                            className="text-blue-500 hover:underline"
                          >
                            {value}
                          </button>
                        ) : key === 'Description' ? (
                          <div
                            className="max-h-40 w-full overflow-y-auto rounded border border-gray-200 p-2 text-gray-500"
                            style={{ whiteSpace: 'pre-wrap' }} // Preserves line breaks
                          >
                            {Array.isArray(value) ? value.join(' ') : value}
                          </div>
                        ) : (
                          <div className="text-gray-500">{value}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
          </ul>
        ))}
      </div>

      {downloadStatus && <p>{downloadStatus}</p>}
      <ViewAttachments attachments={attachments} />
    </div>
  );
};


export default CustomerChunkedGrid;
