'use client';

import MetricCard from '@/components/cards/metric-card';
import { Modal, Text } from 'rizzui';
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
import { useState } from 'react';

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
  const [showModal, setShowModal] = useState(false);

  const handleTileClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 3xl:gap-6  4xl:gap-9 4xl:gap-x-12',
        className
      )}
    >
      {eComDashboardStatData.map((stat) =>
        stat.id === '1' ? (
          // Wrap only the Fundi card in a Link
          <Link key={stat.title + stat.id} href={stat.link}>
            <CategoriesCard
              metric={stat.metric}
              metricClassName="lg:text-[18px] text-sm"
              icon={stat.icon}
              iconClassName={cn(
                '[&>svg]:w-8 [&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10 w-auto h-auto p-0 bg-transparent -mx-1.5',
                stat.style
              )}
              chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
              className="@container [&>div]:items-center"
            />
          </Link>
        ) : (
          // Other cards trigger the modal
          <div key={stat.title + stat.id} onClick={handleTileClick}>
            <CategoriesCard
              metric={stat.metric}
              metricClassName="lg:text-[18px] text-sm"
              icon={stat.icon}
              iconClassName={cn(
                '[&>svg]:w-8 [&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10 w-auto h-auto p-0 bg-transparent -mx-1.5',
                stat.style
              )}
              chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
              className="@container [&>div]:items-center"
            />
          </div>
        )
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <div className="mx-auto max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
          <h3 className="mb-4 text-2xl font-semibold">Coming Soon</h3>
          <p className="mb-6 text-gray-600">
            This feature is currently under development and will be available
            soon.
          </p>
          <button
            className="mt-4 rounded bg-blue-500 px-6 py-2 font-medium text-white transition-all hover:bg-blue-600"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
