'use client';

import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import ExpenseIcon from '@/components/icons/expenses';
import RevenueUpIcon from '@/components/icons/revenue-up';
import SalesIcon from '@/components/icons/sales';
import ContainersIcon from '@/components/icons/containers';
import ExpressDeliveryIcon from '@/components/icons/express-delivery';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import TrendingUpIcon from '@/components/icons/trending-up';
import TrendingDownIcon from '@/components/icons/trending-down';
import UserColorIcon from '@/components/icons/user-color';
import UserDetails from '@/components/cards/user-details';
import SquareBoxIcon from '@/components/icons/square-box';

const statData = [
  {
    id: '1',
    title: 'Name',
    icon: <UserColorIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-red',
    name: 'newton',
    increased: false,
    percentage: '+4.40',
  },

  {
    id: '2',
    title: 'Type ',
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    name: 'Individual',
    increased: true,
  },
  {
    id: '3',
    title: 'Phone Number',
    // icon: <RevenueUpIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    name: '0249U3424',
    increased: true,
    percentage: '+32.40',
  },
//   {
//     id: '3',
//     graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
//     graphColor: 'text-green',
//     title: 'Gender',
//     name: 'male',
//     increased: true,
//     percentage: '+32.40',
//   },
//   {
//     id: '4',
//     title: 'ID number ',
//     graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
//     graphColor: 'text-green',
//     name: '34345344',
//     increased: true,
//   },
  {
    id: '3',
    title: 'Email Address',
    // icon: <ExpressDeliveryIcon className="h-7 w-7" />,
    graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-red',
    name: 'stiv@gmail.com',
    decreased: true,
    percentage: '5.40',
  },
];

const viewOptions = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'this-week',
    label: 'This Week',
  },
];

export default function UserDetailsCard({
  className,
}: {
  className?: string;
}) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="Customer Details"
      headerClassName="mb-2 "
    >
      <SimpleBar>
        <div className="grid grid-flow-col">
          {statData.map((stat) => (
            <UserDetails
              key={stat.title + stat.id}
              title={stat.title}
              name={stat.name}
              icon={stat.icon}
              className="min-w-[140px] border-0 p-1 @2xl:min-w-[280px] lg:p-1"
              titleClassName="capitalize"
              contentClassName="ps-5"
              iconClassName={cn('@5xl:w-20 @5xl:h-20 h-16 w-16')}
              chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
            ></UserDetails>
          ))}
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}