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
} from 'recharts';
import SimpleBar from 'simplebar-react';
import { formatNumber } from '@/utils/format-number';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
type JobSliderData = {
  name: string;
  total: number;
  fill: string;
  link: string;
};
const initialData: JobSliderData[] = [
  {
    name: 'Requests',
    total: 0,
    fill: '#2B7F75',
    link: routes.serviceProvider.fundi.requisitions,
  },
  {
    name: 'Active Jobs',
    total: 0,
    fill: '#04364A',
    link: routes.serviceProvider.fundi.activeJobs,
  },
  {
    name: 'Completed',
    total: 0,
    fill: '#64CCC5',
    link: routes.serviceProvider.fundi.completedJobs,
  },
  {
    name: 'Reviews',
    total: 0,
    fill: '#702963',
    link: routes.serviceProvider.fundi.reviews,
  },
];
const userRoleData: Record<string, JobSliderData[]> = {
  fundi: [
    {
      name: 'Requests',
      total: 0,
      fill: '#2B7F75',
      link: routes.serviceProvider.fundi.requisitions,
    },
    {
      name: 'Active',
      total: 0,
      fill: '#04364A',
      link: routes.serviceProvider.fundi.activeJobs,
    },
    {
      name: 'Completed',
      total: 0,
      fill: '#64CCC5',
      link: routes.serviceProvider.fundi.completedJobs,
    },
    {
      name: 'Reviews',
      total: 0,
      fill: '#702963',
      link: routes.serviceProvider.fundi.reviews,
    },
  ],
  professional: [
    {
      name: 'Requests',
      total: 0,
      fill: '#2B7F75',
      link: routes.serviceProvider.professional.requisitions,
    },
    {
      name: 'Quotations',
      total: 0,
      fill: '#FFD66B',
      link: routes.serviceProvider.professional.quotations,
    },
    {
      name: 'Active',
      total: 0,
      fill: '#04364A',
      link: routes.serviceProvider.professional.activeJobs,
    },
    {
      name: 'Completed',
      total: 0,
      fill: '#64CCC5',
      link: routes.serviceProvider.professional.completedJobs,
    },
    {
      name: 'Reviews',
      total: 0,
      fill: '#702963',
      link: routes.serviceProvider.professional.reviews,
    },
  ],
  contractor: [
    {
      name: 'Requests',
      total: 0,
      fill: '#2B7F75',
      link: routes.serviceProvider.contractor.requisitions,
    },
    {
      name: 'Quotations',
      total: 0,
      fill: '#FFD66B',
      link: routes.serviceProvider.contractor.quotations,
    },
    {
      name: 'Active',
      total: 0,
      fill: '#04364A',
      link: routes.serviceProvider.contractor.activeJobs,
    },
    {
      name: 'Completed',
      total: 0,
      fill: '#64CCC5',
      link: routes.serviceProvider.contractor.completedJobs,
    },
    {
      name: 'Reviews',
      total: 0,
      fill: '#702963',
      link: routes.serviceProvider.contractor.reviews,
    },
  ],
};
export default function JobSlider({ className }: { className?: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState<JobSliderData[]>(initialData); // State to store the data
  const takerId = session?.user.userId;
  const userRole = session?.user.metadata.role;
  const assetId = session?.user.metadata.assetId;
  console.log(assetId);
  useEffect(() => {
    // Fetch stats from the API
    async function fetchStats() {
      try {
        const response = await axios.get(
          `https://uatapimsz.jagedo.co.ke/transactionCustomerStats?takerId=${assetId}`,
          {
            headers: {
              Authorization:
                'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
            },
          }
        );
        const apiData = response.data.data;
        console.log(session);
        console.log(apiData);
        setData((prevData) =>
          prevData.map((item) => {
            switch (item.name) {
              case 'Requests':
                return { ...item, total: parseInt(apiData.paid_count) };
              case 'Quotations':
                return { ...item, total: parseInt(apiData.quotation_count) };
              case 'Active Jobs':
                return { ...item, total: parseInt(apiData.active_count) };
              case 'Completed':
                return { ...item, total: parseInt(apiData.completed_count) };
              case 'Reviews':
                return { ...item, total: parseInt(apiData.draft_count) };
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
  }, [takerId]);
  useEffect(() => {
    // Update data based on user role
    if (userRole) {
      setData(userRoleData[userRole] || initialData);
    }
  }, [userRole]);
  const handleBarClick = (data: { link: any }) => {
    const { link } = data;
    if (link) {
      router.push(link);
    }
  };
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }
  return (
    <WidgetCard
      title="All Jobs"
      titleClassName="text-gray-800 sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('@container', className)}
    >
      <div className="-mt-2 mb-2 flex items-center @lg:mt-1">
        {/* Placeholder for additional content */}{' '}
      </div>

      <SimpleBar>
        <div className="h-[17rem] w-full pt-1">
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
                className="cursor-pointer"
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
      {' '}
      <rect
        x={x + width - 44}
        y={y + 4}
        width={40}
        height={height - 8}
        rx={radius}
        fill="#ffffff"
      />{' '}
      <text
        y={y + 1 + height / 2}
        x={x + width - 24}
        fill="currentColor"
        className="text-[13px] font-medium text-gray-800 dark:text-gray-200"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(value)}{' '}
      </text>
    </g>
  );
}
