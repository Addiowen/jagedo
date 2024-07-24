'use client';

import { Title, Text } from 'rizzui';
import WidgetCard from '@/components/cards/widget-card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Success', value: 60 },
  { name: 'Pending', value: 40 },
  { name: 'Failed', value: 10 },
];
const COLORS = ['#64ccc5', '#ffd66b', '#D22B2B', '#FFD1D1'];

export default function BidsStatus({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard title={'Bids Status'} rounded="lg" className={className}>
      <div className="flex flex-col items-center gap-6 @sm:flex-row">
        <div className="h-[300px] w-[300px] @sm:w-2/3 @sm:py-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="[&_.recharts-sector:focus]:outline-none">
              <Pie
                data={data}
                innerRadius={40}
                outerRadius={80}
                fill="#6D1A36"
                stroke="rgba(0,0,0,0)"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-6 @sm:w-1/3 @md:grid-cols-1">
          {data.map((item, index) => (
            <div key={item.name} className="text-center">
              <div className="mb-1.5 flex items-center">
                <span
                  className="me-2 h-2 w-2 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <Text as="span" className=" whitespace-nowrap">
                  {item.name}
                </Text>
              </div>
              {/* <Title as="h5">{item.value}</Title> */}
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
