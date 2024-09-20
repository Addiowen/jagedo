'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { DatePicker } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

export default function SummaryWidget({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [chartData, setChartData] = useState<
    { group: string; number: number }[]
  >([]);

  const handleChange = ([newStartDate, newEndDate]: [
    Date | null,
    Date | null,
  ]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    // Fetch data from the API
    async function fetchUserStats() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/transactionAdminCustomerStats`,
          {
            headers: {
              Authorization: `${process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN}`,
            },
          }
        );
        const apiData = response.data.data;

        // Transform API data into chart data format
        const formattedData = [
          {
            group: 'Fundis',
            number: parseInt(apiData.fundi_count, 10),
          },
          {
            group: 'Professionals',
            number: parseInt(apiData.professional_count, 10),
          },
          {
            group: 'Contractors',
            number: parseInt(apiData.contractor_count, 10),
          },
          {
            group: 'Customers',
            number: parseInt(apiData.customer_count, 10),
          },
        ];

        // Set the formatted data to state
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    }

    fetchUserStats();
  }, []);

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="Summary"
      descriptionClassName="text-gray-500 mt-1.5"
      description={
        <div className="flex items-center gap-2">
          <span>Service Providers and Customers: </span>
          {/* Add DatePicker or other controls if necessary */}
        </div>
      }
    >
      <div className="h-[250px] w-full lg:h-[250px] min-[1780px]:h-[22rem] 3xl:h-60">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            margin={{ top: 20, bottom: 30, left: 25 }}
            barCategoryGap={20}
            data={chartData} // Use dynamic chart data
            className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500  rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
          >
            <XAxis type="number" axisLine={false} tickLine={false} />
            <YAxis
              dataKey="group"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="number" barSize={20} radius={4} fill="#3872FA" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
