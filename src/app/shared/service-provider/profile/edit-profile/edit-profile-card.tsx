'use client';

import Image from 'next/image';
import { Title, Text, Button, Modal, Badge } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Rate from '@/components/ui/rate';
import { PiCheckCircle } from 'react-icons/pi';

function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Title>
      <div
        className={cn(
          'rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl',
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface Props {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setModalState: Dispatch<SetStateAction<boolean>>;
  userDetails: any;
  isApproved: string;
}

export default function EditProfileCard({
  editMode,
  setEditMode,
  setModalState,
  userDetails,
  isApproved,
}: Props) {
  return (
    <div className="min-w-[250px] space-y-7 pt-8 @container @5xl:col-span-1 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-1">
      <WidgetCard
        className="mb-7.5 @5xl:mb-5"
        title="User Details"
        childrenWrapperClass="py-5 @5xl:py-8 flex"
      >
        <div className="relative aspect-square h-16 w-16 shrink-0 @5xl:h-20 @5xl:w-20">
          <Image
            fill
            alt="avatar"
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 100vw"
            src="/user1.png"
          />
        </div>


        <div className="ps-4 @5xl:ps-6">
          <div className="flex w-full items-center justify-between">
            <div className="mr-4">
              <Title
                as="h3"
                className="mb-2.5 text-base font-semibold @7xl:text-lg"
              >
                {userDetails.firstname} {userDetails.lastname}
              </Title>
            </div>

            <div className="-mt-2.5 flex flex-row items-center">
              {isApproved === 'approved' && (
                <>
                  <Text className="text-green-600">Approved</Text>
                  <PiCheckCircle
                    size="lg"
                    className="ml-2 h-5 w-5 text-green-600"
                  />
                </>
              )}
            </div>
          </div>

          <Text as="p" className="mb-2 break-all last:mb-0">
            {userDetails.email}
          </Text>
          <Text as="p" className="mb-2 last:mb-0">
            {userDetails.metadata?.phone}
          </Text>
          {/* <Rate value={3.5} allowHalf={true} disabled={true} /> */}
        </div>
      </WidgetCard>

      {/* {!editMode ? (
        <Button
          onClick={() => {
            setEditMode(true);
          }}
          as="span"
          className="mr-6 h-[38px] cursor-pointer shadow md:h-10"
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          onClick={() => {
            setEditMode(false);
            setModalState(true);
          }}
          as="span"
          className="mr-6 h-[38px]  cursor-pointer shadow md:h-10"
        >
          Save Changes
        </Button>
      )} */}
    </div>
  );
}
