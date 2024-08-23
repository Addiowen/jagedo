import Image from 'next/image';
import dayjs from 'dayjs';
import { PiStar, PiStarFill } from 'react-icons/pi';
import { Title, Text, Tooltip } from 'rizzui';

type ReviewCardProps = {
  customer: {
    avatar?: string;
    name: string;
  };
  date: Date;
  message: string;
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
          <span className="text-lg font-medium text-gray-900">{value}</span>{' '}
          &nbsp;
          <span>/{total}</span>
        </div>
      </div>
      <div className="relative h-2.5 w-full rounded-lg bg-gray-100">
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
  customer,
  date,
  message,
  attachment,
  className,
}: ReviewCardProps) {
  return (
    <div className={`py-6 @md:flex @md:items-start ${className}`}>
      <div className="shrink-0 @md:w-40 @md:pe-4">
        <Title
          as="h6"
          className="pb-1.5 text-base font-semibold text-gray-900 @md:font-medium"
        >
          {customer.name}
        </Title>
        <Text className="text-xs text-gray-500 @md:text-sm">
          {dayjs(date).format('DD MMM, YYYY')}
        </Text>
      </div>

      <div className="w-full pt-6 @md:pt-1">
        <Slider title="Average" total={5} value={3} />

        <Text className="pt-2 leading-[1.85]">{message}</Text>

        {attachment && attachment.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] gap-3 pt-2.5">
            {attachment.map((item: string, index: number) => (
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
