'use client';

import Image from 'next/image';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import {
  PiArrowDownBold,
  PiCheckBold,
  PiPlusBold,
  PiUserBold,
} from 'react-icons/pi';
import {
  billingAddressAtom,
  orderNoteAtom,
  shippingAddressAtom,
} from '@/store/checkout';
import { useCart } from '@/store/quick-cart/cart.context';
import { Title, Text, Button } from 'rizzui';
import cn from '@/utils/class-names';
import usePrice from '@/hooks/use-price';
import { routes } from '@/config/routes';
import Link from 'next/link';
import CustomersTable from '../../../dashboard/tables/customers/organization';
import ProfessionalHistoryTable from '../../../dashboard/tables/history-tables/professional';
import ChunkedGrid from '@/app/shared/commons/custom-chunked-grid';
import { completeJobDetailsData } from '@/data/job-data';
import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';

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

export default function EditProfessionalForm() {
  const { items, total, totalItems } = useCart();
  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );
  const { price: totalPrice } = usePrice({
    amount: total,
  });

  return (
    <div className="@container">
      <div className="items-start pt-5 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="-mt-9 space-y-7 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            className="mb-7.5 @5xl:mb-5"
            title="Professional Details"
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
                Leslie Alexander
              </Title>
              <Text as="p" className="mb-2 break-all last:mb-0">
                nevaeh.simmons@example.com
              </Text>
              <Text as="p" className="mb-2 last:mb-0">
                (316) 555-0116
              </Text>
            </div>
          </WidgetCard>

          <Link
            href={routes.eCommerce.createProduct}
            className="inline-flex flex-grow"
          >
            <Button as="span" className="h-[38px] shadow md:h-10">
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="space-y-6 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          <div className="">
            {/* <div className="mb-3.5 @5xl:mb-5">
              <Title as="h3" className="text-base font-semibold @7xl:text-lg">
                Contact Details
              </Title>
            </div> */}

            <div className="mb-4 mt-4">
              <ProfileChunkedGrid
                data={completeJobDetailsData[1]}
                dataChunkSize={16}
                className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"
                editMode={false}
              />
            </div>

            <div className="grid grid-cols-2  rounded-xl border border-muted px-4 py-2 @5xl:gap-7 @5xl:p-7">
              {/* <!-- Column 1 --> */}
              <div className="space-y-4">
                <div className="mb-2">
                  <h4 className="text-base font-semibold underline">
                    Personal Details
                  </h4>
                </div>

                <div className="flex font-medium">
                  <span className="w-1/2">Skill</span>
                  <span className="w-1/2">Architect</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">First Name</span>
                  <span className="w-1/2">Olive</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">Last Name</span>
                  <span className="w-1/2">Wangari</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">Email Address</span>
                  <span className="w-1/2">wangari@email.com</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">Phone Number</span>
                  <span className="w-1/2">0712334755</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">National Id</span>
                  <span className="w-1/2">37489329</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">County</span>
                  <span className="w-1/2">Nairobi</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">Sub County</span>
                  <span className="w-1/2">Dagoretti North</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">Estate</span>
                  <span className="w-1/2">Kawangware</span>
                </div>
              </div>
              {/* <!-- Column 2 --> */}
              <div className="space-y-4">
                <div className="mb-2">
                  <h4 className="text-base font-semibold underline">
                    Account Details
                  </h4>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">Gender</span>
                  <span className="w-1/2">Female</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2">Registered as*</span>
                  <span className="w-1/2">Contractor</span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2"> Level/Class *</span>
                  <span className="w-1/2">Graduate</span>
                </div>
                <div className="mb-2">
                  <h4 className="text-base font-semibold underline">Uploads</h4>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2"> Front *</span>
                  <span className="flex w-1/2 items-center">
                    Olive ID 2.pdf
                    <span>
                      <PiArrowDownBold className="ml-2" />
                    </span>
                  </span>
                </div>
                <div className="flex font-medium">
                  <span className="w-1/2"> Back *</span>
                  <span className="flex w-1/2 items-center">
                    Olive ID 1.pdf
                    <span>
                      <PiArrowDownBold className="ml-2" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfessionalHistoryTable className="mt-6" />
    </div>
  );
}
