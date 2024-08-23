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

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'complete':
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
    title: <HeaderCell title="Item" className="uppercase" />,
    dataIndex: 'item',
    key: 'item',
    width: 50,
    render: (item: string) => <Text>{item}</Text>,
  },

  {
    title: <HeaderCell title="Service Provider." />,
    dataIndex: 'serviceProvider',
    key: 'serviceProvider',
    width: 150,
    render: (serviceProvider: string) => <Text>{serviceProvider}</Text>,
  },

  {
    title: <HeaderCell title="Fee" />,
    dataIndex: 'fee',
    key: 'fee',
    width: 50,
    render: (fee: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {fee}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Expenses" />,
    dataIndex: 'expenses',
    key: 'expenses',
    width: 100,
    render: (expenses: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {expenses}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 80,
    render: (amount: string) => <Text>{amount}</Text>,
  },

  {
    title: <HeaderCell title="Discount Commission" />,
    dataIndex: 'discount',
    key: 'discount',
    width: 80,
    render: (discount: string) => <Text>{discount}</Text>,
  },

  {
    title: <HeaderCell title="Payable Client" />,
    dataIndex: 'payableClient',
    key: 'payableClient',
    width: 120,
    render: (payableClient: string) => <Text>{payableClient}</Text>,
  },
  {
    title: <HeaderCell title="Withholding Tax" />,
    dataIndex: 'tax',
    key: 'tax',
    width: 120,
    render: (tax: string) => <Text>{tax}</Text>,
  },
  {
    title: <HeaderCell title="Payable to SP" />,
    dataIndex: 'payabletoSP',
    key: 'payabletoSP',
    width: 120,
    render: (tax: string) => <Text>{tax}</Text>,
  },
  {
    title: <HeaderCell title="Comments" />,
    dataIndex: 'comments',
    key: 'comments',
    width: 120,
    render: (comments: string) => <Text>{comments}</Text>,
  },
];

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Closed':
      return (
        <div className="flex items-center">
          <PiPlusCircle className="shrink-0 rotate-45 fill-red-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-green-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}
