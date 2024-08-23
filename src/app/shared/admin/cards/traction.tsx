'use client';

import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import { useElementSize } from '@/hooks/use-element-size';
import Link from 'next/link'; // Import Link from Next.js for navigation
import { routes } from '@/config/routes';

const data = [
  { name: 'Service Providers', value: 11, link: routes.admin.ongoing },
  { name: 'Customers', value: 7, link: routes.admin.active },
];

const valueSum = data.reduce((total, item) => total + item.value, 0);
const calculatePercentage = (part: number, total: number) =>
  ((part / total) * 100).toFixed(2);

const COLORS = ['#36A2EB', '#F3C32C'];
// const COLORS = ['#FA436B', '#4C2889', '#36A2EB', '#F3C32C', '#32CD32'];

export default function TractionCard({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(-1); // Initialize with -1 to remove initial active state
  const [chartRef, { width }] = useElementSize();

  const onPieClick = (entry: any, index: number) => {
    // Redirect to the specified link when a segment is clicked
    if (entry && entry.payload && entry.payload.link) {
      window.location.href = entry.payload.link;
    }
    setActiveIndex(index); // Set active index for styling purposes (optional)
  };

  return (
    <WidgetCard
      rounded="sm"
      title="Traction"
      className={cn('grid', className)}
      headerClassName="mb-4 sm:mb-0"
      ref={chartRef}
    >
      <div className="-mt-20 h-80 w-full max-w-full justify-around gap-4 @sm:pt-3 @7xl:gap-8 md:h-[26rem] 3xl:h-[22rem]">
        <ResponsiveContainer
          width={width - 56}
          height="100%"
          className="mx-auto"
        >
          <PieChart
            margin={{
              top: -20,
            }}
          >
            <Pie
              cx="30%"
              cy="50%"
              dataKey="value"
              innerRadius="30%"
              outerRadius="55%"
              fill="#8884d8"
              paddingAngle={4}
              data={data}
              onClick={onPieClick}
              activeIndex={activeIndex}
              cornerRadius={6}
              label
              className="custom-pie-chart" // Add a custom class for styling purposes
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap justify-center gap-6 @md:grid-cols-4">
          {data.map((item, index) => (
            <div key={item.name} className="grid gap-2">
              <div className="flex items-center">
                <span
                  className="-mt-16 me-2 h-2.5 w-3.5 flex-shrink-0"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <Link href={item.link} className="-mt-16 whitespace-nowrap">
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS to remove the outline */}
      <style>{`
        .custom-pie-chart .recharts-pie-sector:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </WidgetCard>
  );
}
