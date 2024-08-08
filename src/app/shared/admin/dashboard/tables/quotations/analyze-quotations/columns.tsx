'use client';

import { HeaderCell } from '@/components/ui/table';
import {
  Text,
  Checkbox,
  ActionIcon,
  Tooltip,
  Select,
  Button,
  Badge,
} from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/commons/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { last } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';
import Rate from '@/components/ui/rate';
import { useSearchParams } from 'next/navigation';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'unreviewed':
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

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  jobId: string | null;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
  jobId,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          aria-label={'ID'}
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="QTN NO." />,
    dataIndex: 'id',
    key: 'id',
    width: 20,
    render: (id: string) => <Text>QTN#{id}</Text>,
  },

  {
    title: <HeaderCell title="Service Provider" />,
    dataIndex: 'serviceProvider',
    key: 'serviceProvider',
    width: 100,
    render: (serviceProvider: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {serviceProvider}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Location" />,
    dataIndex: 'location',
    key: 'location',
    width: 80,
    render: (location: string) => <Text>{location}</Text>,
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 40,
    render: (amount: string) => <Text>{amount}</Text>,
  },

  {
    title: <HeaderCell title="Qtn Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 100,
    render: (date: Date) => <DateCell date={date} />,
  },

  {
    title: <HeaderCell title="Rating" />,
    dataIndex: 'rating',
    key: 'rating',
    width: 10,
    render: (rating: number) => (
      <Rate
        size="sm"
        allowHalf={true}
        defaultValue={rating}
        disabled={true}
        tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
      />
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: 'id',
    key: 'action',
    width: 100,
    render: (id: string, row: any) => (
      <div className="flex items-center justify-center gap-3 pe-3">
        <Link href={{ pathname: routes.admin.rfq, query: { jobId: id } }}>
          <Text className="text-green-500">View</Text>
        </Link>
      </div>
    ),
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
