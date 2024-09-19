'use client';

import MetricCard from '@/components/cards/metric-card';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import {
  PiHammer,
  PiBriefcase,
  PiHardHat,
  PiStorefront,
  PiTrolleyDuotone,
} from 'react-icons/pi';
import CategoriesCard from '@/components/cards/categories-card';
import { routes } from '@/config/routes';
import Link from 'next/link';

const eComDashboardStatData = [
  {
    id: '1',
    icon: <PiHammer className="h-6 w-6 text-purple-500" />,
    title: 'Fundi card',
    metric: 'Fundi',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    link: `${routes.customers.generateInvoiceFundi}?metric=Fundi`, // Link for Fundi card with query parameter
  },
  {
    id: '2',
    icon: <PiBriefcase className="h-6 w-6 " />,
    title: 'Professional card',
    metric: 'Professional',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    link: routes.comingSoon,
    // link: `${routes.customers.generateInvoiceProfessional}?metric=Professional`,
  },
  {
    id: '3',
    icon: <PiHardHat className="h-6 w-6 text-red-500" />,
    title: 'Contractor card',
    metric: 'Contractor',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    link: routes.comingSoon,
    // link: `${routes.customers.generateInvoiceContractor}?metric=Contractor`,
  },
  {
    id: '4',
    icon: <PiTrolleyDuotone className="h-6 w-6 text-yellow-500" />,
    title: 'Shop now card',
    metric: 'Shop App',
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    link: routes.comingSoon, // Link for Shop Now card with query parameter
  },
];

export default function SpType({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 3xl:gap-6  4xl:gap-9 4xl:gap-x-12',
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
