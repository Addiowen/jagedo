import { Tooltip } from 'rizzui';
import WidgetCard from '@/components/cards/widget-card';
import cn from '@/utils/class-names';
import { PiStar, PiStarFill } from 'react-icons/pi';

function calculatePercentage(total: number, value: number) {
    const percentage = (value / total) * 100;
    return percentage.toFixed(2);
  }

function Slider({
    title,
    total,
    value,
  }: {
    title: string;
    total: number;
    value: number;
  }) {
    const percentage = calculatePercentage(total, value);
    return (
      <div className="group">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="font-medium text-gray-900">{title}</p>
          {/* <div className="flex items-center">
            <span className="font-medium text-gray-900">${value}</span> &nbsp;
            <span>/${total}</span>
          </div> */}
        </div>
        <div className="relative h-2.5 w-full rounded-lg bg-gray-100">
            {/* the fill */}
          <div
            style={{ width: `${percentage}%` }}
            className="h-full rounded-lg bg-[#1477EB]"
          />
          <div className="absolute left-0 top-1/2 flex h-0 w-full -translate-y-1/2 items-center bg-black/50">
            <div className="max-auto relative w-full">
              <Tooltip
                className="dark:bg-gray-200 dark:text-gray-900"
                placement="top"
                content={<span>{percentage}%</span>}
              >
                <span
                  style={{ left: `${percentage}%` }}
                  className="absolute top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full border-[5.5px] border-gray-0  bg-[#1477EB] opacity-0 shadow-md duration-100 group-hover:scale-100 group-hover:opacity-100 dark:border-muted"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default function ReviewSlider({ className }: { className?: string }) {
    return (
      <WidgetCard
        title="Client Review"
        headerClassName="flex @[30rem]:flex-row flex-col"
        actionClassName="ps-0 mb-4 @[30rem]:mb-4"
        titleClassName="text-gray-800 sm:text-lg font-inter mb-2.5 @[30rem]:mb-2"
        className={cn('', className)}
        // action={
        //   <div className="flex items-center gap-1 @[30rem]:gap-2">
        //     <span className="text-lg font-semibold text-gray-900 @[30rem]:text-xl">
        //       $7,590
        //     </span>
        //     <span className="text-gray-500">out of</span>
        //     <span className="text-lg font-semibold text-gray-900 @[30rem]:text-xl">
        //       $10,000
        //     </span>
        //   </div>
        // }
      >
        <>
        {/* rating stars */}
        <div className='flex justify-between mb-4 items-center'>
            <div className="-mx-0.5 flex">
            {[...new Array(5)].map((_, index) => {
                return index < 4 ? (
                <PiStarFill className="w-6 h-6 fill-orange text-orange" key={index} />
                ) : (
                <PiStar className="w-6 h-6 fill-gray-300 text-gray-500" key={index} />
                );
            })}
            </div>
            <div className='flex items-center'>
                <span className='text-2xl ml-3 font-bold text-gray-700'>4.0 </span>
                <span className='text-gray-500 ml-2'>out of 5 stars</span>
            </div>
        </div>

        {/* sliders */}
        <div className=" space-y-3.5">
          <Slider title="Excellent" total={5} value={4} />
          <Slider title="Good" total={5} value={3} />
          <Slider title="Average" total={5} value={2} />
          <Slider title="Average-below" total={5} value={1.5} />
          <Slider title="Poor" total={5} value={1} />
        </div>
        </>
      </WidgetCard>
    );
  }
  