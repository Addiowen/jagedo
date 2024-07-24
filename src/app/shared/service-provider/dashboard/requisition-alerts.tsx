'use client';

import Link from 'next/link';
import { RefObject, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Title, Text, Popover, Avatar, Badge } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';
import { requisitionAlertData } from '@/data/custom-alerts';
import WidgetCard from '@/components/cards/widget-card';

dayjs.extend(relativeTime);

export default function RequisitionAlerts(
{ className }: { className?: string }
) {
  
  return (
    <WidgetCard
      title=""
      titleClassName="text-gray-800 sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('@container', className)}
    >
      <div /*className="w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right"*/>
        {/* the title bar */}

        <div className="mb-2 ps-3 pe-3 flex items-center justify-between">
          <Title as="h5" fontWeight="semibold">
            Requisition Alert
          </Title>
          <Link
            href={routes.support.inbox}
            // onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            See all
          </Link>
        </div>

        {/* the nav */}
        <div className='flex ps-3 pb-5 pt-2'>
          <div className='flex items-center'>
            <Badge renderAsDot size="md" color="primary" className="scale-90" />
              <Text className="pl-1 font-semibold ms-auto whitespace-nowrap pe-8 text-xs text-blue-500">
                All
              </Text>
          </div>
          <div className='flex items-center'>
            <Badge renderAsDot size="md" className="scale-90 bg-gray-300" />
              <Text className="pl-1 font-semibold ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                Jobs
              </Text>
          </div>
          <div className='flex items-center'>
            <Badge renderAsDot size="md" className="scale-90 bg-gray-300" />
              <Text className="pl-1 font-semibold ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                Order
              </Text>
          </div>
        </div>

        {/* the mini title section */}
        <div className='flex ps-3 items-center pb-2'>
          <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
            #New Category Add
          </Text>
          <Text className="ms-auto whitespace-nowrap pe-8 mr-1 text-xs text-gray-500">
            last week
          </Text>
        </div>

        {/* the message list */}
        <SimpleBar className="max-h-[228px]">
          <div className="grid grid-cols-1">
            {requisitionAlertData.map((item) => (
              <div
                key={item.name + item.id}
                className="group grid ps-3 cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-md py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
              >
                {/* <div className={cn('relative', item.avatar.length > 1 && 'me-1')}>
                  <Avatar
                    src={item.avatar[0]}
                    name={item.name}
                    className={cn(
                      item.avatar.length > 1 &&
                        'relative -end-1 -top-0.5 !h-9 !w-9'
                    )}
                  />
                  {item.avatar.length > 1 && (
                    <Avatar
                      src={item.avatar[1]}
                      name={item.name}
                      className="absolute -bottom-1 end-1.5 !h-9 !w-9 border-2 border-gray-0 dark:border-gray-100"
                    />
                  )}
                </div> */}
                {/* <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center"> */}
                  {/* <div className="w-full"> */}
                    {/* <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
                      {item.name}
                    </Text> */}

                    <Text className="w-full truncate pe-7 font-medium text-gray-500">
                        {item.message}
                      </Text>

                    <div className="flex items-center">
                      {/* <Text className="w-10/12 truncate pe-7 font-medium text-gray-500">
                        {item.message}
                      </Text> */}
                      <Text className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                        {dayjs(item.sendTime).fromNow(true)} ago
                      </Text>
                      <div className="flex-shrink-0">
                            {item.unRead ? (
                            <Badge
                                renderAsDot
                                size="lg"
                                color="primary"
                                className="scale-90"
                            />
                            ) : (
                            <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                                <PiCheck className="h-auto w-[9px]" />
                            </span>
                            )}
                        </div>
                    </div>
                  {/* </div> */}
                  {/* <div className="ms-auto flex-shrink-0">
                    {item.unRead ? (
                      <Badge
                        renderAsDot
                        size="lg"
                        color="primary"
                        className="scale-90"
                      />
                    ) : (
                      <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                        <PiCheck className="h-auto w-[9px]" />
                      </span>
                    )}
                  </div> */}
                {/* </div> */}
                
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>
    </WidgetCard>
  );
}
