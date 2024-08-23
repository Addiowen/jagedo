'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'unverified':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    case 'approved':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

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
    title: <HeaderCell title="Service Provider" />,
    dataIndex: 'serviceProvider',
    key: 'serviceProvider',
    width: 200,
    render: (serviceProvider: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {serviceProvider}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Name" />,
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
    title: <HeaderCell title="No. of hours" />,
    dataIndex: 'hours',
    key: 'hours',
    width: 80,
    render: (hours: number) => <Text>{hours}</Text>,
  },

  {
    title: <HeaderCell title="Rate/Hr(Kes)" />,
    dataIndex: 'rate',
    key: 'rate',
    width: 120,
    render: (rate: string) => <Text>{rate}</Text>,
  },

  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 120,
    render: (amount: number) => <Text>{amount}</Text>,
  },
];
