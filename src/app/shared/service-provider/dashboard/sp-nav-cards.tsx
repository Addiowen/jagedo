'use client';

import MetricCard from '@/components/cards/metric-card';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import {
  PiCaretDoubleUpDuotone,
  PiCaretDoubleDownDuotone,
  PiGiftDuotone,
  PiBankDuotone,
  PiChartPieSliceDuotone,
  PiEnvelopeDuotone,
  PiBasketDuotone,
  PiShoppingBagDuotone,
  PiWrenchDuotone,
  PiFolderDuotone,
  PiTrolleyDuotone,
  PiMoneyDuotone,
  PiUserSquareDuotone,
  PiUserCircleDuotone,
  PiBriefcaseDuotone,
  PiCurrencyCircleDollarDuotone,
  PiFolderOpenDuotone,
  PiMonitorDuotone,
} from 'react-icons/pi';
// import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import CategoriesCard from '@/components/cards/categories-card';
// import { title } from 'process';
import { routes } from '@/config/routes';
import Link from 'next/link';

const orderData = [
  {
    day: 'Sunday',
    sale: 4000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const spDashboardNavCardData = [
  {
    id: '1',
    icon: <PiMonitorDuotone className="h-6 w-6" />,
    title: 'My Workspace',
    metric: 'My Workspace',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    linkTo: '#',
  },
  {
    id: '2',
    icon: <PiTrolleyDuotone className="h-6 w-6 text-yellow-500" />,
    title: 'Shop App',
    metric: 'Shop App',
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    linkTo: '#',
  },
  {
    id: '3',
    icon: <PiFolderOpenDuotone className="h-6 w-6 text-orange-500" />,
    title: 'My Projects',
    metric: 'My Projects',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    linkTo: '#',
  },
  {
    id: '4',
    icon: <PiCurrencyCircleDollarDuotone className="h-6 w-6 text-green-500" />,
    title: 'Sales',
    metric: 'Sales',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    linkTo: '#',
  },
];

export default function SpNavCards({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 3xl:gap-6  4xl:gap-9 4xl:gap-x-12',
        className
      )}
    >
      {spDashboardNavCardData.map((data) => (
        <Link key={data.title + data.id} href={data.linkTo}>
          <CategoriesCard
            metric={data.metric}
            metricClassName="lg:text-[18px] text-sm" // Adjust metric text size
            icon={data.icon}
            iconClassName={cn(
              '[&>svg]:w-8 [&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10 w-auto h-auto p-0 bg-transparent -mx-1.5', // Adjust icon size
              data.id === '1' &&
                '[&>svg]:w-7 [&>svg]:h-7 lg:[&>svg]:w-9 lg:[&>svg]:h-9',
              data.style
            )}
            chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
            className="@container [&>div]:items-center"
          />
        </Link>
      ))}
    </div>
  );
}
