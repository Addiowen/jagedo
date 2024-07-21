'use client';

import { useRef } from 'react';
import { Link } from 'react-scroll';
import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { PiArrowDownBold, PiTriangle } from 'react-icons/pi';

const statusColors: {
  [key: string]: string;
} = {
  success: 'text-green',
  pending: 'text-orange',
  canceled: 'text-red',
  ongoing: 'text-blue',
};

export default function Timeline({
  data,
  className,
  showmoreButton = false,
  order = 'asc',
}: {
  data: object[];
  className?: string;
  showmoreButton?: boolean;
  order?: 'asc' | 'desc';
}) {
  const buttonEl = useRef<HTMLDivElement>(null!);
  function handleScrollPosition(e: any) {
    buttonEl.current.scrollLeft = e.target.offsetLeft - 30;
  }

  return (
    <>
    {/* <div className={cn('relative @container flex', className)}>
      {data.map((timeline: any, index: number) => (
        <div className="flex items-center justify-between" key={`timeline-${index}`}>
          <div className="hidden w-[147px] flex-shrink-0 @lg:block">
            
          </div>
          <div
            className={cn(
              'relative flex-grow border-t border-muted py-5 ps-10 before:absolute before:-left-[3px] before:-top-[3px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gray-200 dark:border-gray-700 dark:before:bg-gray-900 rtl:before:-right-[3px]',
              index !== 0 && 'before:hidden',
              index === data.length - 1 &&
                'before:-bottom-[3px] before:top-auto before:block'
            )}
          >
              <span className="absolute -top-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-0 dark:bg-gray-50 rtl:-right-3">
                {timeline.icon ? (
                  timeline.icon
                ) : order === 'asc' ? (
                  <PiTriangle className="h-5 w-5 rotate-180" />
                ) : (
                  <PiTriangle className="h-5 w-5" />
                )}
              </span>
              <Title
                as="h3"
                className={cn(
                  'mb-3 flex items-center text-base font-semibold',
                  timeline.status
                    ? statusColors[timeline.status]
                    : 'text-gray-900'
                )}
              >
                {timeline.title}
              </Title>
          </div>
        </div>
      ))}
    </div> */}

    <div className={cn('relative @container', className)}>
      {data.map((timeline: any, index: number) => (
        <div className="flex items-center" key={`timeline-${index}`}>
          {/* <div className="hidden w-[147px] flex-shrink-0 @lg:block">
            
          </div> */}
          <div
            className={cn(
              'relative flex-grow border-s border-muted py-5 ps-10 before:absolute before:-left-[3px] before:-top-[3px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gray-200 dark:border-gray-700 dark:before:bg-gray-900 rtl:before:-right-[3px]',
              index !== 0 && 'before:hidden',
              index === data.length - 1 &&
                'before:-bottom-[3px] before:top-auto before:block'
            )}
          >
            <span className="absolute -left-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-0 dark:bg-gray-50 rtl:-right-3">
              {timeline.icon ? (
                timeline.icon
              ) : order === 'asc' ? (
                <PiTriangle className="h-5 w-5 rotate-180" />
              ) : (
                <PiTriangle className="h-5 w-5" />
              )}
            </span>
            <Title
              as="h3"
              className={cn(
                'mb-3 flex items-center text-base font-semibold',
                timeline.status
                  ? statusColors[timeline.status]
                  : 'text-gray-900'
              )}
            >
              {timeline.title}
            </Title>
            <div className="relative -ms-10">
              <div className="ps-10">
                <Text className=" text-sm font-normal leading-loose text-gray-500">
                  {timeline.text}
                  <Text as="span" className="block font-medium text-gray-700">
                    {timeline.hightlightedText}
                  </Text>{' '}
                  {`${timeline.date} ${timeline.time}`}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
