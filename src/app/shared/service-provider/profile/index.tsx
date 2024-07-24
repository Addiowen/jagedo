'use client';

import Image from 'next/image';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import { PiCheckBold, PiPlusBold, PiUserBold } from 'react-icons/pi';
import {
  billingAddressAtom,
  orderNoteAtom,
  shippingAddressAtom,
} from '@/store/checkout';
import OrderViewProducts from '@/app/shared/ecommerce/order/order-products/order-view-products';
import { useCart } from '@/store/quick-cart/cart.context';
import { Title, Text, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { toCurrency } from '@/utils/to-currency';
import { formatDate } from '@/utils/format-date';
import usePrice from '@/hooks/use-price';
import { routes } from '@/config/routes';
import Link from 'next/link';
// import CustomersTable from '../../../dashboard/tables/customers/organization';
import { useRouter } from 'next/navigation';

interface EditFundiFormProps {
  slug?: string;
}

function WidgetCard({
  title,
  slug,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  slug?: string;
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

export default function EditFundiForm({ slug }: EditFundiFormProps) {
  const isApproved = slug === 'approved';

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
                Leslie Alexander
              </Title>
              <Text as="p" className="mb-2 break-all last:mb-0">
                mailto:nevaeh.simmons@example.com
              </Text>
              <Text as="p" className="mb-2 last:mb-0">
                (316) 555-0116
              </Text>
            </div>
          </WidgetCard>

          <Link
            href={''}
            className="inline-flex flex-grow"
          >
            <Button as="span" className="h-[38px] shadow md:h-10">
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="space-y-6 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          <div className="">
            <div className="mb-3.5 @5xl:mb-5">
              <Title as="h3" className="text-base font-semibold @7xl:text-lg">
                Contact Details
              </Title>
            </div>
            <div className=" -mt-2 space-y-2 rounded-xl border border-muted px-4 py-2 @5xl:space-y-7 @5xl:p-7">
              <div className="flex justify-between font-medium">
                Skill <span>Architect</span>
              </div>
              <div className="flex justify-between font-medium">
                First Name <span>Olive</span>
              </div>
              <div className="flex justify-between font-medium">
                Last Name <span>Wangari</span>
              </div>
              <div className="flex justify-between font-medium">
                Email Address <span>olive@gmail.com</span>
              </div>
              <div className="flex justify-between font-medium">
                Phone Number <span>0704032343</span>
              </div>
            </div>
          </div>
          <Button
            as="span"
            className="inline-flex h-[38px]  justify-center  shadow md:h-10"
          >
            {isApproved ? 'Unverify' : 'Verify'}
          </Button>
        </div>
      </div>

      {/* <CustomersTable className="mt-6" /> */}
    </div>
  );
}
