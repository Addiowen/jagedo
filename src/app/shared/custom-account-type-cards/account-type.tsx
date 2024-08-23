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
} from 'react-icons/pi';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import CategoriesCard from '@/components/cards/categories-card';
import { title } from 'process';
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

const revenueData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 2800,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 3500,
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

const eComDashboardStatData = [
  {
      id: '1',
      icon: <PiUserCircleDuotone className="h-6 w-6" />,
      title: 'Customer card',
      metric: 'Customer',
      increased: true,
      decreased: false,
      percentage: '+32.40',
      style: 'text-[#3872FA]',
      fill: '#3872FA',
      chart: orderData,
      link: '/signup/customer',
      },
  {
    id: '2',
    icon: <PiWrenchDuotone className="h-6 w-6" />,
    title: 'Fundi card',
    metric: 'Fundi',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    link: '/signup/fundi',
  },
  {
    id: '3',
    icon: <PiUserCircleDuotone className="h-6 w-6" />,
    title: 'Professional card',
    metric: 'Professional',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    link: '/signup/professional',
  },
  {
    id: '4',
    icon: <PiBriefcaseDuotone className="h-6 w-6" />,
    title: 'Contractor card',
    metric: 'Contractor',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    link: '/signup/contractor',
  },
//   {
//     id: '4',
//     icon: <PiTrolleyDuotone className="h-6 w-6" />,
//     title: 'Shop now card',
//     metric: 'Shop Now',
//     percentage: '+32.40',
//     style: 'text-[#3872FA]',
//     fill: '#3872FA',
//     chart: orderData,
//   },
];

export default function AccountType({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 md:grid-cols-2 3xl:gap-6  4xl:gap-9 4xl:gap-x-12',
        className
      )}
    >
      {eComDashboardStatData.map((stat) => (
        <Link key={stat.title + stat.id} href={stat.link}>
          <CategoriesCard
            metric={stat.metric}
            metricClassName="lg:text-[18px] text-sm" // Adjust metric text size
            icon={stat.icon}
            iconClassName={cn(
              '[&>svg]:w-8 [&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10 w-auto h-auto p-0 bg-transparent -mx-1.5', // Adjust icon size
              stat.id === '1' &&
                '[&>svg]:w-7 [&>svg]:h-7 lg:[&>svg]:w-9 lg:[&>svg]:h-9',
              stat.style
            )}
            chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
            className="@container [&>div]:items-center"
          />
        </Link>
      ))}
    </div>
  );
}
