'use client';

import WidgetCard from '@/components/cards/widget-card';
import TrendingUpIcon from '@/components/icons/trending-up';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  ComposedChart,
  Cell,
} from 'recharts';
import SimpleBar from 'simplebar-react';
import { formatNumber } from '@/utils/format-number';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const data = [
  {
    name: 'Requests',
    total: 8,
    fill: '#2B7F75',
    link: routes.admin.requisitions,
  },
  {
    name: 'Quotations',
    total: 7,
    fill: '#FFD66B',
    link: routes.admin.quotations,
  },
  {
    name: 'Active Jobs',
    total: 10,
    fill: '#04364A',
    link: routes.admin.active,
  },

  {
    name: 'Completed',
    total: 13,
    fill: '#64CCC5',
    link: routes.admin.completed,
  },
  {
    name: 'Reviews',
    total: 5,
    fill: '#F0CCC5',
    link: routes.admin.reviews,
  },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export default function JobSlider({ className }: { className?: string }) {
  const [activeBar, setActiveBar] = useState<string | null>(null);
  const router = useRouter();

  const handleBarClick = (data: { name: string; link: string }) => {
    setActiveBar(data.name);
    const { link } = data;
    if (link) {
      router.push(link);
    }
  };

  return (
    <WidgetCard
      title="All Jobs"
      titleClassName="text-gray-700 font-bold sm:text-sm "
      headerClassName="items-center"
      className={cn(' @container', className)}
    >
      <div className="mb-2 flex items-center  @lg:mt-1"></div>
      <SimpleBar>
        <div className="-mt-4 h-[17rem] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              data={data}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-300 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-700 [&_path.recharts-rectangle]:!stroke-none"
            >
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                hide={true}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: 13, fontWeight: 500 }}
                width={100}
                className="rtl:-translate-y-24 [&_.recharts-text]:fill-gray-700"
              />
              <Bar
                dataKey="total"
                barSize={28}
                radius={[50, 50, 50, 50]}
                onClick={handleBarClick}
                className="cursor-pointer "
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  position="right"
                  dataKey="total"
                  content={<CustomizedLabel />}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function CustomizedLabel(props: any) {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <rect
        x={x + width - 44}
        y={y + 4}
        width={40}
        height={height - 8}
        rx={radius}
        fill="#ffffff"
      />
      <text
        y={y + 1 + height / 2}
        x={x + width - 24}
        fill="currentColor"
        className="text-[13px] font-medium text-gray-800 dark:text-gray-200"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(value)}
      </text>
    </g>
  );
}
