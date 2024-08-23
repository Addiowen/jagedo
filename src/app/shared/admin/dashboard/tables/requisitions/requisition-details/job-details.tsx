'use client';

import WidgetCard from '@/components/cards/widget-card';
import { Badge } from 'rizzui';
import { useSearchParams } from 'next/navigation';

const data = [
  {
    Location: 'Kome,Homabay',
  },
  {
    Specifications: 'Skilled Fundi',
  },
];

export default function JobDetails({ className }: { className?: string }) {
  const searchParams = useSearchParams();

  const getManagedByType = (): string | null => {
    return searchParams.get('type');
  };

  const renderManagedByBadge = () => {
    const managedByType = getManagedByType();
    if (managedByType === 'self') {
      return (
        <Badge color="success" variant="flat" rounded="md" size="lg">
          Self
        </Badge>
      );
    } else if (managedByType === 'jagedo') {
      return (
        <Badge color="info" variant="flat" rounded="md" size="lg">
          Jagedo
        </Badge>
      );
    } else {
      return (
        <Badge color="warning" variant="flat" rounded="md" size="lg">
          Unknown
        </Badge>
      );
    }
  };

  return (
    <>
      <div className="grid items-start rounded-xl border border-gray-300 p-2 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-5 @5xl:grid-cols-4">
        <WidgetCard
          rounded="lg"
          className="-ml-4 border-none"
          title="Project Details"
          headerClassName="mb-2"
        ></WidgetCard>
        <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">
              Job Description :
            </span>
            <span className="text-base text-gray-900">Busted Pipe</span>
          </li>
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Managed By :</span>
            <span className="text-base text-gray-900">
              {renderManagedByBadge()}
            </span>
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Job Number :</span>
            #A01283DHS
          </li>
        </ul>
        {data.map((item, index) => (
          <ul key={index} className="mt-3 grid gap-3 @5xl:mt-0">
            {Object.entries(item).map(([key, value]) => (
              <li key={key} className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">{key} :</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
}
