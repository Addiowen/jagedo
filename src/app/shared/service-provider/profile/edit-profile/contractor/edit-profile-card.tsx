import Image from 'next/image';
import { Title, Text, Button, Modal } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import Link from 'next/link';

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

  
export default function EditProfileCard() {
    return (
      <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
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
              mailto:olive.wangari@example.com
            </Text>
            <Text as="p" className="mb-2 last:mb-0">
              (316) 555-0116
            </Text>
          </div>
        </WidgetCard>
  
        <Link
          href={routes.serviceProvider.fundi.createProfile}
          className="inline-flex flex-grow"
        >
          <Button as="span" className="h-[38px] shadow md:h-10">
            Edit Profile
          </Button>
        </Link>
      </div>
    )
  }