import React from 'react';
import cn from '@/utils/class-names';
import { Input, Title } from 'rizzui';
import Image from 'next/image';

interface Item {
  [key: string]: string;
}

interface Props {
  data: Item;
  className?: string;
  dataChunkSize: number;
  editMode: boolean;
}

const ProfileChunkedGrid: React.FC<Props> = ({
  data,
  className,
  dataChunkSize,
  editMode,
}) => {
  // Convert the data object to an array of key-value pairs
  const dataArray = Object.entries(data);

  // Helper function to chunk the data into subarrays of a specified size
  const chunkArray = (array: [string, string][], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Chunk data into subarrays of `dataChunkSize`
  const chunkedData = chunkArray(dataArray, dataChunkSize);

  // Helper function to check if the value is an image URL
  const isImageUrl = (value: string) => {
    return /\.(jpeg|jpg|gif|png|webp)$/i.test(value);
  };

  return (
    <div className="rounded-lg bg-gray-0 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
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
            className="grid max-w-full grid-cols-2 justify-between gap-6 gap-x-4 rounded-lg bg-gray-0"
          >
            {chunk.map(([key, value], itemIndex) => (
              <div key={itemIndex} className="flex items-center">
                <div className="flex w-[calc(100%-44px)] items-center justify-between gap-2">
                  {editMode ? (
                    <div>
                      <Title
                        as="h4"
                        className="mb-1 whitespace-nowrap text-sm font-semibold"
                      >
                        {key}
                      </Title>
                      <Input
                        placeholder="Value"
                        size="md"
                        inputClassName="text-sm"
                        defaultValue={value}
                        className="[&>label>span]:font-medium"
                      />
                    </div>
                  ) : (
                    <div>
                      <Title
                        as="h4"
                        className="mb-1 whitespace-nowrap text-sm font-semibold"
                      >
                        {key}
                      </Title>
                      {isImageUrl(value) ? (
                        <img
                          src={value}
                          alt={key}
                          className="rounded-lg object-cover"
                          sizes="(max-width: 768px) 100vw"
                        />
                      ) : (
                        <div className="text-gray-500">{value}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProfileChunkedGrid;
