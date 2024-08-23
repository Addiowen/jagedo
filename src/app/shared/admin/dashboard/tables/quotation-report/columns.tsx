'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select } from 'rizzui';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="ITEM" />,
    dataIndex: 'item',
    key: 'item',
    width: 90,
    render: (item: string) => <Text>{item}</Text>,
  },

  {
    title: <HeaderCell title="Professional Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (name: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (phone: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {phone}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Level" />,
    dataIndex: 'level',
    key: 'level',
    width: 100,
    render: (level: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {level}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Rating" />,
    dataIndex: 'rating',
    key: 'rating',
    width: 200,
    render: (rating: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {rating}
      </Text>
    ),
  },

  // {
  //   title: <HeaderCell title="Category" />,
  //   dataIndex: 'category',
  //   key: 'category',
  //   width: 260,
  //   render: (category: string[]) => {
  //     let print = category?.slice(0, 2);
  //     let more = category.length - category.slice(0, 2).length;
  //     return (
  //       <div className="flex h-auto flex-wrap gap-2">
  //         {print.map((item: string, index: number) => (
  //           <span
  //             key={index}
  //             className="rounded-full bg-gray-100 px-2 py-1 text-xs"
  //           >
  //             {item}
  //           </span>
  //         ))}
  //         <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
  //           +{more}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
];
