'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/commons/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { last } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';

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
    title: <HeaderCell title="% Disbursements " />,
    dataIndex: 'percentage',
    key: 'percentage',
    width: 200,
    render: (percentage: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {percentage}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Milestone Activity" />,
    dataIndex: 'mileStoneActivity',
    key: 'mileStoneActivity',
    width: 200,
    render: (mileStoneActivity: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {mileStoneActivity}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 200,
    render: (amount: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {amount}
      </Text>
    ),
  },
];
