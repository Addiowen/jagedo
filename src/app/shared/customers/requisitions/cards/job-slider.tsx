'use client';

import WidgetCard from '@/components/cards/widget-card';
import cn from '@/utils/class-names';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  ComposedChart,
} from 'recharts';
import SimpleBar from 'simplebar-react';
import { formatNumber } from '@/utils/format-number';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const initialData = [
  {
    name: 'Requests',
    total: 0,
    fill: '#2B7F75',
    link: routes.customers.requisitions,
  },
  {
    name: 'Quotations',
    total: 0,
    fill: '#FFD66B',
    link: routes.customers.quotations,
  },
  {
    name: 'Active',
    total: 0,
    fill: '#04364A',
    link: routes.customers.active,
  },
  {
    name: 'Completed',
    total: 0,
    fill: '#64CCC5',
    link: routes.customers.complete,
  },
  {
    name: 'Reviews',
    total: 0,
    fill: '#FFC0CB',
    link: routes.customers.reviews,
  },
];

export default function JobSlider({ className }: { className?: string }) {
  const { data: session } = useSession();

  const takerId = session?.user.userId;
  console.log(takerId, 'this is taker id');
  const [data, setData] = useState(initialData); // State to store the data

  useEffect(() => {
    // Fetch stats from the API
    async function fetchStats() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/transactionCustomerStats?takerId=${takerId}`,
          {
            headers: {
              Authorization:
                
            },
          }
        );

        const apiData = response.data.data;

        console.log(apiData);

        // Use functional update for setData to always work with the latest data state
        setData((prevData) =>
          prevData.map((item) => {
            switch (item.name) {
              case 'Requests':
                return {
                  ...item,
                  total:
                    parseInt(apiData.paid_count, 10) +
                    parseInt(apiData.draft_count, 10) +
                    parseInt(apiData.assigned_count, 10),
                };
              case 'Quotations':
                return { ...item, total: parseInt(apiData.quotation_count) };
              case 'Active':
                return { ...item, total: parseInt(apiData.active_count) };
              case 'Completed':
                return { ...item, total: parseInt(apiData.completed_count) };
              case 'Reviews':
                return {
                  ...item,
                  total: parseInt(apiData.reviewed_count) || 0,
                };
              default:
                return item;
            }
          })
        );
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    if (takerId) {
      fetchStats();
    }
  }, [takerId]); // Make sure takerId is available before fetching the data

  const router = useRouter();

  const handleBarClick = (data: { link: any }) => {
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
      <div className="-mt-2 mb-2 flex items-center  @lg:mt-1"></div>
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
                className="rtl:-translate-x-24 [&_.recharts-text]:fill-gray-700"
              />
              <Bar
                dataKey="total"
                barSize={28}
                radius={[50, 50, 50, 50]}
                onClick={handleBarClick}
                minPointSize={60}
              >
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
