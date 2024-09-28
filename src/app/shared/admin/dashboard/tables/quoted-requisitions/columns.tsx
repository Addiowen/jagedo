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
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium ">{status}</Text>
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
    title: <HeaderCell title="NO" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: number) => <Text>{number}</Text>,
  },
  {
    title: <HeaderCell title="RFQ #" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (id: string) => <Text>RFQ#{id}</Text>,
  },

  {
    title: <HeaderCell title="Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 60,
    render: (date: Date) => <DateCell date={date} />,
  },

  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 50,
    render: (category: string) => (
      <Text className="text-sm  text-gray-900 dark:text-gray-700">
        {category}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Sub Category" />,
    dataIndex: 'subCategory',
    key: 'subCategory',
    width: 150,
    render: (subCategory: string) => (
      <Text className="text-sm  text-gray-900 dark:text-gray-700">
        {subCategory}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Req Type" />,
    dataIndex: 'requestType',
    key: 'requestType',
    width: 150,
    render: (requestType: string) => (
      <Text className="text-sm  text-gray-900 dark:text-gray-700">
        {requestType}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="County" />,
    dataIndex: 'county',
    key: 'county',
    width: 50,
    render: (county: string) => <Text>{county}</Text>,
  },

  {
    title: <HeaderCell title="Sub County" />,
    dataIndex: 'subCounty',
    key: 'subCounty',
    width: 50,
    render: (subCounty: string) => <Text>{subCounty}</Text>,
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
        <Link
          href={{ pathname: routes.admin.analyzeQuotations, query: { id } }}
        >
          <Text className="text-green-500">Analyse</Text>
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
