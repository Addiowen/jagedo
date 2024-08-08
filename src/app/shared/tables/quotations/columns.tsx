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

import EyeIcon from '@/components/icons/eye';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'under review':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'open':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-red-600">{status}</Text>
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
  jobId
}: Columns) => [

  {
    title: <HeaderCell title="JOB NO" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (id: string) => <Text>RFQ#{id}</Text>,
  },

  {
    title: <HeaderCell title="RFQ type" />,
    dataIndex: 'rfqType',
    key: 'rfqType',
    width: 250,
    render: (rfqType: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {rfqType}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 50,
    render: (category: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {category}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Sub Category" />,
    dataIndex: 'subCategory',
    key: 'subCategory',
    width: 50,
    render: (subCategory: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {subCategory}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 150,
    render: (description: string) => <Text>{description}</Text>,
  },

  {
    title: <HeaderCell title="Location" />,
    dataIndex: 'location',
    key: 'location',
    width: 50,
    render: (location: string) => <Text>{location}</Text>,
  },

  {
    title: <HeaderCell title="Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 60,
    render: (date: Date) => <DateCell date={date} />,
  },

  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },

  {
    title: <HeaderCell title="Actions" />,
    dataIndex: 'id',
    key: 'action',
    width: 10,
    render: (id: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
          {jobId === '3324' || jobId === '3336' ? (
              <Link href={{ pathname: routes.customers.analyseQuotations, query: { id } }}>
                <Text className="text-green-500">View</Text>
              </Link>
          ) : (
              <Link href={{ pathname: routes.customers.analyseQuotations, query: { id } }}>
                <Text className="text-green-500">View</Text>
              </Link>
          )}

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
