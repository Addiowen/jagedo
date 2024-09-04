'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Title, Text, Badge, Avatar, Popover } from 'rizzui';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';
import { BASE_URL } from '@/lib/axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

dayjs.extend(relativeTime);

interface Message {
  id: string;
  createdDate: string;
  content: string;
  read: boolean;
  senderId: string;
  receiverId: string;
}

interface ApiResponse {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nbResultsPerPage: number;
  startCursor: string;
  endCursor: string;
  results: Message[];
}

function MessagesList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data: session } = useSession();
        if (session) {
          const userId = session?.user.userId;

          const response = await axios.get<ApiResponse>(
            `${BASE_URL}/messages?page=1&nbResultsPerPage=10&orderBy=createdDate&order=desc&receiverId=${userId}`,
            {
              headers: {
                Authorization: 'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
              },
            }
          );

          setMessages(response.data.results);
        } else {
          console.error('No session data found in session storage.');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-2 flex items-center justify-between ps-6">
        <Title as="h5" fontWeight="semibold">
          Messages
        </Title>
        <Link
          href="/messages" // Update the link as needed
          onClick={() => setIsOpen(false)}
          className="hover:underline"
        >
          View all
        </Link>
      </div>
      <SimpleBar className="max-h-[406px]">
        <div className="grid grid-cols-1 ps-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-md px-2 py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
            >
              <div className="relative">
                <Avatar
                  src={message.senderId} // You may need to adjust this based on how avatars are handled
                  name={message.senderId}
                  className="h-9 w-9"
                />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
                    {message.senderId}
                  </Text>
                  <div className="flex">
                    <Text className="w-10/12 truncate pe-7 text-xs text-gray-500">
                      {message.content}
                    </Text>
                    <Text className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                      {dayjs(message.createdDate).fromNow(true)}
                    </Text>
                  </div>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {message.read ? (
                    <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                      <PiCheck className="h-auto w-[9px]" />
                    </span>
                  ) : (
                    <Badge
                      renderAsDot
                      size="lg"
                      color="primary"
                      className="scale-90"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}

export default function MessagesDropdown({
  children,
}: {
  children: JSX.Element & { ref?: React.RefObject<any> };
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] pb-6 pe-6 ps-0 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex">
        <MessagesList setIsOpen={setIsOpen} />
      </Popover.Content>
    </Popover>
  );
}
