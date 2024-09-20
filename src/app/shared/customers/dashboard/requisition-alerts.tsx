'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Title, Text, Badge, Loader } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';
import WidgetCard from '@/components/cards/widget-card';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import { useSession } from 'next-auth/react';

dayjs.extend(relativeTime);

interface Message {
  id: string;
  createdDate: string;
  updatedDate: string;
  topicId: string;
  conversationId: string;
  content: string;
  attachments: any[];
  read: boolean;
  senderId: string;
  receiverId: string;
  metadata: Record<string, any>;
  platformData: Record<string, any>;
  livemode: boolean;
}

interface ApiResponse {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nbResultsPerPage: number;
  startCursor: string;
  endCursor: string;
  results: Message[];
}

const RequisitionAlerts = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  const receiverId = session?.user.userId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get<ApiResponse>(
          `${BASE_URL}/messages?page=1&nbResultsPerPage=10&orderBy=createdDate&order=desc&receiverId=${receiverId}`,
          {
            headers: {
              Authorization: 
            },
          }
        );
        setMessages(response.data.results);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [receiverId]);

  const handleOpenModal = (messageContent: string) => {
    setSelectedMessage(messageContent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <Loader variant='spinner'/>
    </div>
    
  );

  return (
    <>
      <WidgetCard
        title=""
        titleClassName="text-gray-800 sm:text-sm font-inter"
        headerClassName="items-center"
        className={cn('@container', className)}
      >
        <div>
          <div className="mb-2 ps-3 pe-3 flex items-center justify-between">
            <Title as="h5" fontWeight="semibold">
              Notifications
            </Title>
            <Link
              href={routes.support.inbox}
              className="hover:underline"
            >
              See all
            </Link>
          </div>

          <div className='flex ps-3 pb-5 pt-2'>
            <div className='flex items-center'>
              <Badge renderAsDot size="md" color="primary" className="scale-90" />
              <Text className="pl-1 font-semibold ms-auto whitespace-nowrap pe-8 text-xs text-blue-500">
                New
              </Text>
            </div>
          </div>

          {/* <div className='flex ps-3 items-center pb-2'>
            <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
              #All Messages
            </Text>
            
          </div> */}

          <SimpleBar className="max-h-[228px] overflow-y-auto">
            <div className="grid grid-cols-1">
              {messages.length === 0 ? (
                <div className="flex justify-center items-center h-full py-4 text-gray-500">
                  <Text>No messages available</Text>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className="group grid ps-3 cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-md py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
                    onClick={() => handleOpenModal(message.content)}
                  >
                    <Text className="w-full truncate pe-7 font-medium text-gray-500">
                      {message.content}
                    </Text>

                    <div className="flex items-center">
                      <Text className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                        {dayjs(message.createdDate).fromNow(true)} ago
                      </Text>
                      <div className="flex-shrink-0">
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
                ))
              )}
            </div>
          </SimpleBar>
        </div>
      </WidgetCard>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-2">Message Details</h2>
            <p>{selectedMessage}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RequisitionAlerts;
