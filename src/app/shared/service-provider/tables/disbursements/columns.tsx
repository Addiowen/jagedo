'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge, Input } from 'rizzui';
// import PencilIcon from '@/components/icons/pencil';
// import EyeIcon from '@/components/icons/eye';
// import DeletePopover from '@/app/shared/commons/delete-popover';
// import DateCell from '@/components/ui/date-cell';
// import { useState } from 'react';
// import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
// import { last } from 'lodash';
// import Link from 'next/link';
// import { routes } from '@/config/routes';
import { Controller } from 'react-hook-form';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  control: any;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
  control,
}: Columns) => [
  {
    title: <HeaderCell title="% Disbursements " />,
    dataIndex: 'percentage',
    key: 'percentage',
    width: 200,
    render: (percentage: string, record: any, rowIndex: number) => (
      // <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
      //   {percentage}
      // </Text>
      <Controller
        name={`percentage-${rowIndex}`}
        control={control}
        defaultValue={percentage}
        render={({ field }) => (
          <Input
            placeholder="Percentage"
            size="md"
            inputClassName="text-sm"
            {...field}
            className="[&>label>span]:font-medium"
          />
        )}
      />
    ),
  },
  {
    title: <HeaderCell title="Milestone Activity" />,
    dataIndex: 'milestoneActivity',
    key: 'milestoneActivity',
    width: 200,
    render: (milestoneActivity: string, record: any, rowIndex: number) => (
      // <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
      //   {mileStoneActivity}
      // </Text>
      <Controller
        name={`milestoneActivity-${rowIndex}`}
        control={control}
        defaultValue={milestoneActivity}
        render={({ field }) => (
          <Input
            placeholder="Milestone Activity"
            size="md"
            inputClassName="text-sm"
            {...field}
            className="[&>label>span]:font-medium"
          />
        )}
      />
    ),
  },

  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 200,
    render: (amount: string, record: any, rowIndex: number) => (
      // <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
      //   {amount}
      // </Text>
      <Controller
        name={`amount-${rowIndex}`}
        control={control}
        defaultValue={amount}
        render={({ field }) => (
          <Input
            placeholder="Amount"
            size="md"
            inputClassName="text-sm"
            {...field}
            className="[&>label>span]:font-medium"
          />
        )}
      />

    ),
  },
];
