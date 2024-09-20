'use client';

import { useState } from 'react';
import cn from '@/utils/class-names';
import {
  PiFolderDuotone,
  PiTrolleyDuotone,
  PiDesktopDuotone,
  PiCurrencyCircleDollarDuotone,
} from 'react-icons/pi';
import CategoriesCard from '@/components/cards/categories-card';
import { Modal, Button } from 'rizzui';
import { Text } from 'rizzui';

const orderData = [
  { day: 'Sunday', sale: 4000, cost: 2400 },
  { day: 'Monday', sale: 3000, cost: 1398 },
  { day: 'Tuesday', sale: 2000, cost: 9800 },
  { day: 'Wednesday', sale: 2780, cost: 3908 },
  { day: 'Thursday', sale: 1890, cost: 4800 },
  { day: 'Friday', sale: 2390, cost: 3800 },
  { day: 'Saturday', sale: 3490, cost: 4300 },
];

const eComDashboardStatData = [
  {
    id: '1',
    icon: <PiFolderDuotone className="h-6 w-6 text-blue-500" />,
    title: 'Projects',
    metric: 'My Projects',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
  },
  {
    id: '2',
    icon: <PiDesktopDuotone className="h-6 w-6 text-red-500" />,
    title: 'Workspace',
    metric: 'My Workspace',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
  },
  {
    id: '3',
    icon: <PiCurrencyCircleDollarDuotone className="h-6 w-6 text-green-500" />,
    title: 'Sales Dashboard',
    metric: 'Sales',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
  },
  {
    id: '4',
    icon: <PiTrolleyDuotone className="h-6 w-6 text-yellow-500" />,
    title: 'Shop Dashboard',
    metric: 'Shop App',
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
  },
];

export default function AdminCards({ className }: { className?: string }) {
  const [showModal, setShowModal] = useState(false);

  const handleTileClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 gap-5 3xl:gap-6  4xl:gap-9 4xl:gap-x-12',
          className
        )}
      >
        {eComDashboardStatData.map((stat) => (
          <div key={stat.title + stat.id} onClick={handleTileClick}>
            <CategoriesCard
              metric={stat.metric}
              metricClassName="lg:text-[18px] text-sm"
              icon={stat.icon}
              iconClassName={cn(
                '[&>svg]:w-8 [&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10 w-auto h-auto p-0 bg-transparent -mx-1.5',
                stat.id === '1' &&
                  '[&>svg]:w-7 [&>svg]:h-7 lg:[&>svg]:w-9 lg:[&>svg]:h-9',
                stat.style
              )}
              chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
              className="@container [&>div]:items-center"
            />
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="mx-auto max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
          <h3 className="mb-4 text-2xl font-semibold">Coming Soon</h3>
          <p className="mb-6 text-gray-600">
            This feature is currently under development and will be available
            soon.
          </p>
          <button
            className="mt-4 rounded bg-blue-500 px-6 py-2 font-medium text-white transition-all hover:bg-blue-600"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
