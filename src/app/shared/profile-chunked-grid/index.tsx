import React from "react";
import cn from '@/utils/class-names';
// import { PiAcorn, PiHammer, PiHammerBold, PiWrench, PiWrenchBold } from "react-icons/pi";
import { Input, Title } from "rizzui";

interface Item {
  [key: string]: string;
}

interface Props {
  data: Item;
  className?: string;
  dataChunkSize: number;
  editMode: boolean;
}

const ProfileChunkedGrid: React.FC<Props> = ({ data, className, dataChunkSize, editMode }) => {

  // const filteredData = 

    // Convert the data object to an array of key-value pairs
  const dataArray = Object.entries(data);
  console.log(dataArray)

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
    <div className="rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">
        {/* <div className="text-gray-900 font-semibold sm:text-lg pb-4">Project Details</div> */}

        <div className={cn(
            !className && "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6",
            className
        )}
        >
        {chunkedData.map((chunk, columnIndex) => (
            <ul key={columnIndex} className="grid grid-cols-2 gap-6 gap-x-4 justify-between max-w-full rounded-lg bg-gray-0">
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
            <div className="flex w-[calc(100%-44px)] items-center justify-between gap-2">
              {editMode? (
                <div>
                  <Title as="h4" className="mb-1 text-sm font-semibold whitespace-nowrap">
                    {key}
                  </Title>
                  <Input
                    placeholder="Gender"
                    size="md"
                    inputClassName="text-sm"
                    defaultValue={value}
                    // {...register('email')}
                    // error={errors.email?.message}
                    className="[&>label>span]:font-medium"
                  />
                </div>
              ) : (
                <div className="">
                  <Title as="h4" className="mb-1 text-sm font-semibold whitespace-nowrap">
                    {key}
                  </Title>
                  <div className="text-gray-500">
                    {value}
                  </div>
                </div>
              )}
              {/* <div className="">
                <Title as="h4" className="mb-1 text-sm font-semibold whitespace-nowrap">
                  {key}
                </Title>
                <div className="text-gray-500">
                  {value}
                </div>
              </div> */}

              
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
    </div>
  );
};

export default ProfileChunkedGrid;
