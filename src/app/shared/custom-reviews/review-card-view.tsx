import Image from 'next/image';
import dayjs from 'dayjs';
import { PiStar, PiStarFill } from 'react-icons/pi';
import { Title, Text, Tooltip } from 'rizzui';

type ReviewCardProps = {
  reviewer: {
    avatar?: string;
    name: string;
  };
  date: Date;
  message: string;
  role: string;
  attachment?: string[];
  className?: string;
};

function calculatePercentage(total: number, value: number) {
  const percentage = (value / total) * 100;
  return percentage.toFixed(2);
}

// slider
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
              <div className="flex items-center">
                  <span className="font-medium text-lg text-gray-900">{value}</span> &nbsp;
                  <span>/{total}</span>
              </div>
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

// review card
export default function ReviewCard({
  reviewer,
  date,
  message,
  attachment,
  role,
}: ReviewCardProps) {
  return (
    <div className="py-8 last-of-type:pb-0 first-of-type:pt-0 @md:flex @md:items-start border-b last-of-type:border-b-0">
      <div className="shrink-0 @md:w-40 @md:pe-4">
        <Title
          as="h6"
          className="pb-1.5 text-base font-semibold text-gray-900 @md:font-medium"
        >
          {reviewer.name} ({role})
        </Title>
        <Text className="text-xs text-gray-500 @md:text-sm">
          {dayjs(date).format('DD MMM, YYYY')}
        </Text>
      </div>

      <div className="w-full pt-6 @md:pt-1">
        {/* <div className="-mx-0.5 mb-2.5 flex">
          {[...new Array(5)].map((_, index) => {
            return index < 3 ? (
              <PiStarFill className="w-4 fill-orange text-orange" key={index} />
            ) : (
              <PiStar className="w-4 fill-gray-300 text-gray-500" key={index} />
            );
          })}
        </div> */}

        <Slider title="Average" total={5} value={3} /> 

        <Text className="leading-[1.85] pt-2">{message}</Text>

        {attachment && attachment.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] gap-3 pt-2.5">
            {attachment?.map((item: string, index: number) => (
              <div
                key={`review-key-${index}`}
                className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded bg-gray-100"
              >
                <Image
                  fill
                  priority
                  src={item}
                  alt="Review attachment"
                  sizes="(max-width: 768px) 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
