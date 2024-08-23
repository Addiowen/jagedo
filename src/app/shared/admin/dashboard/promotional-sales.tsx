'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';
import Link from 'next/link';
import { routes } from '@/config/routes';

const data = [
  {
    name: 'Requisitions',
    sales: 31,
    fill: '#FF0000',
    link: routes.admin.requisitions, // Add links for each segment
  },
  {
    name: 'Quotations',
    sales: 26,
    fill: '#E1306C',
    link: routes.admin.quotations,
  },
  {
    name: 'Completed Jobs',
    sales: 15,
    fill: '#1DA1F2',
    link: routes.admin.quotations,
  },
];

export default function PromotionalSales({
  className,
}: {
  className?: string;
}) {
  const isMobile = useMedia('(max-width: 300px)', true);
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <WidgetCard
      title={'Jobs'}
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="MMM, yyyy"
          placeholderText="Select Month"
          showMonthYearPicker
          popperPlacement="bottom-end"
          inputProps={{
            variant: 'text',
            inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
          }}
          className="w-36"
        />
      }
      className={cn('@container', className)}
    >
      <div className="-mt-20 h-96 w-full  pb-4 @sm:h-96 @xl:pb-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="[&_.recharts-default-legend]:flex [&_.recharts-default-legend]:flex-wrap [&_.recharts-default-legend]:justify-center @xl:[&_.recharts-default-legend]:flex-col [&_.recharts-legend-wrapper]:!static [&_.recharts-legend-wrapper]:!-mt-[22px] [&_.recharts-legend-wrapper]:!leading-[22px] @xs:[&_.recharts-legend-wrapper]:!mt-0 @xl:[&_.recharts-legend-wrapper]:!absolute @xl:[&_.recharts-legend-wrapper]:!end-0 @xl:[&_.recharts-legend-wrapper]:!start-auto @xl:[&_.recharts-legend-wrapper]:!top-1/2 @xl:[&_.recharts-legend-wrapper]:!-translate-y-1/2 @xl:[&_.recharts-legend-wrapper]:!translate-x-0 @xl:[&_.recharts-legend-wrapper]:!leading-9"
        >
          <RadialBarChart
            innerRadius="20%"
            outerRadius="80%"
            barSize={isMobile ? 16 : 24}
            data={data}
            className="rtl:[&_.recharts-legend-item>svg]:ml-1"
          >
            <RadialBar
              label={{ fill: '#ffffff', position: 'insideStart' }}
              background
              dataKey="sales"
              className="[&_.recharts-radial-bar-background-sector]:fill-gray-100"
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="top" />
            {data.map((entry, index) => (
              <Link key={index} href={entry.link}>
                <a>
                  <RadialBar
                    dataKey="sales"
                    startAngle={90 + index * 120}
                    endAngle={90 + (index + 1) * 120}
                    fill={entry.fill}
                  />
                </a>
              </Link>
            ))}
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
