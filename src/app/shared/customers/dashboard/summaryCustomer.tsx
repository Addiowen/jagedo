'use client';

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { number } from 'zod';

const data = [
  {
    group: 'Requisitions',
    number: 8,
  },
  {
    group: 'Quotations',
    number: 5,
  },
  {
    group: 'Active',
    number: 11,
  },
  {
    group: 'Completed',
    number: 17,
  },
  {
    group: 'Reviews',
    number: 4,
  },
];

export default function SummaryWidgetCustomers({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleChange = ([newStartDate, newEndDate]: [
    Date | null,
    Date | null,
  ]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="Summary"
      descriptionClassName="text-gray-500 mt-1.5"
      description={
        <div className="flex items-center gap-2">
          {/* <span>Summary: </span> */}
          {/* <DatePicker
            dateFormat="yyyy"
            placeholderText="Select Year"
            maxDate={new Date()}
            inputProps={{
              variant: 'text',
              inputClassName: 'p-0 pr-1.5 h-auto',
              prefixClassName: 'hidden',
            }}
            popperPlacement="bottom-end"
            className="w-32"
            selected={startDate}
            onChange={handleChange}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            showYearPicker
          /> */}
        </div>
      }
    >
      <div className="h-[250px] w-full lg:h-[250px] min-[1780px]:h-[22rem] 3xl:h-60">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            margin={{ top: 20, bottom: 30, left: 25 }}
            barCategoryGap={20}
            data={data}
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
