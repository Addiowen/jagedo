'use client'

import Image from 'next/image';
import { Title, Text, Button, Modal } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Rate from '@/components/ui/rate';

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
}

export default function EditProfileCard({ editMode, setEditMode, setModalState }: Props) {
    return (
      <div className="space-y-7 pt-8 @container @5xl:col-span-1 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-1">
        <WidgetCard
          className="mb-7.5 @5xl:mb-5"
          title="Fundi Details"
          childrenWrapperClass="py-5 @5xl:py-8 flex"
        >
          <div className="relative aspect-square h-16 w-16 shrink-0 @5xl:h-20 @5xl:w-20">
            <Image
              fill
              alt="avatar"
              className="object-cover"
              sizes="(max-width: 768px) 100vw"
              src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatar.png"
            />
          </div>
  
          <div className="ps-4 @5xl:ps-6">
            <Title
              as="h3"
              className="mb-2.5 text-base font-semibold @7xl:text-lg"
            >
              Olive Wangari
            </Title>
            <Text as="p" className="mb-2 break-all last:mb-0">
              olive.wangari@example.com
            </Text>
            <Text as="p" className="mb-2 last:mb-0">
              (316) 555-0116
            </Text>
            <Rate value={3.5} allowHalf={true} disabled={true} />
          </div>
        </WidgetCard>
  
        {/* <Link
          href={'#'}
          className="inline-flex flex-grow"
        > */}
          {/* <Button onClick={() => setEditMode(true)} as="span" className="h-[38px] shadow md:h-10">
            Edit Profile
          </Button> */}
        {/* </Link> */}

        {!editMode? (
          <Button onClick={() => {
            setEditMode(true)
          }} 
          as="span" 
          className="h-[38px] shadow md:h-10 cursor-pointer">
                Edit Profile
          </Button>
        ) : (
          <Button onClick={() => {
            setEditMode(false)
            setModalState(true)
          }} 
          as="span" 
          className="h-[38px] shadow md:h-10 cursor-pointer">
                Save Changes
          </Button>
        )}
      </div>
    )
  }