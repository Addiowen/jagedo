import React from 'react';
import cn from '@/utils/class-names';
import {
  PiAcorn,
  PiHammer,
  PiHammerBold,
  PiWrench,
  PiWrenchBold,
} from 'react-icons/pi';
import { Title } from 'rizzui';

interface Item {
  [key: string]: string;
}

interface Props {
  data: Item;
  className?: string;
  dataChunkSize: number;
}

const JobDescriptionChunked: React.FC<Props> = ({
  data,
  className,
  dataChunkSize,
}) => {
  // const filteredData =

  // Convert the data object to an array of key-value pairs
  const dataArray = Object.entries(data);
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
    <div
      className={cn(
        !className &&
          'mb-4 grid  grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1',
        className
      )}
    >
      {chunkedData.map((chunk, columnIndex) => (
        <ul
          key={columnIndex}
          className="grid max-w-full grid-cols-1 justify-between  gap-x-4 rounded-lg border border-gray-300 bg-gray-0 p-4 py-8 shadow-md"
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
              <div className="flex w-[calc(100%-44px)] items-start gap-2 ps-3.5">
                <div className="flex-grow">
                  <Title as="h4" className="mb-1 text-sm font-semibold">
                    {key}
                  </Title>
                  <div className="whitespace-normal break-words text-gray-500">
                    {value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default JobDescriptionChunked;