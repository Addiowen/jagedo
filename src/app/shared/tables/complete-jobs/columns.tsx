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

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'add a review':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'reviewed':
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
    title: <HeaderCell title="NUMBER" />,
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (id: string) => <Text>#JB{id}</Text>,
  },
  {
    title: <HeaderCell title="Completed Date" className="uppercase" />,
    dataIndex: 'completedDate',
    key: 'completedDate',
    width: 150,
    render: (completedDate: Date) => <DateCell date={completedDate} />,
  },
  {
    title: <HeaderCell title="Requisition Date" className="uppercase" />,
    dataIndex: 'reqDate',
    key: 'reqDate',
    width: 150,
    render: (reqDate: Date) => <DateCell date={reqDate} />,
  },

  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 100,
    render: (description: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {description}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Specification" />,
    dataIndex: 'specification',
    key: 'specification',
    width: 100,
    render: (specification: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {specification}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Assigned Fundi" />,
    dataIndex: 'fundi',
    key: 'fundi',
    width: 100,
    render: (fundi: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {fundi}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Add a review" />,
    dataIndex: 'review',
    key: 'review',
    width: 120,
    render: (value: string) => getStatusBadge(value),
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
