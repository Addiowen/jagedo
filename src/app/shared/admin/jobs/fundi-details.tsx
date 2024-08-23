'use client';

import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import ExpenseIcon from '@/components/icons/expenses';

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
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    title: 'Sub Category',
    name: 'Mason',
    increased: true,
    percentage: '+32.40',
  },
  {
    id: '3',
    title: 'phone Number',
    // icon: <RevenueUpIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    name: '074933424',
    increased: true,
    percentage: '+32.40',
  },
  {
    id: '4',
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    title: 'Email Address',
    name: 'steve@email.com',
    increased: true,
    percentage: '+32.40',
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

export default function FundiDetailsCard({
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
      title="Fundi Details"
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
              className="min-w-[240px] border-0 p-1 @2xl:min-w-[280px] lg:p-1"
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
