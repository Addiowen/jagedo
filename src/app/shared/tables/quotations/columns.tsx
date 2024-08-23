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
    case 'recommended':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
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
          <Badge color="success" renderAsDot className="bg-gray-400" />
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
    title: <HeaderCell title="NO." />,
    dataIndex: 'number',
    key: 'number',
    width: 30,
    render: (number: string) => <Text>{number}</Text>,
  },
  {
    title: <HeaderCell title="QTN NO" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (id: string) => <Text>QTN#{id}</Text>,
  },
  {
    title: <HeaderCell title="DATE" className="uppercase" />,
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
    title: <HeaderCell title="REQUEST TYPE" />,
    dataIndex: 'requestType',
    key: 'requestType',
    width: 200,
    render: (requestType: string) => (
      <Text className="text-sm font-semibold  text-gray-900 dark:text-gray-700">
        {requestType}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="COUNTY" />,
    dataIndex: 'county',
    key: 'county',
    width: 100,
    render: (county: string) => (
      <Text className="text-sm  text-gray-900 dark:text-gray-700">
        {county}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="SUB-COUNTY" />,
    dataIndex: 'subCounty',
    key: 'subCounty',
    width: 100,
    render: (subCounty: string) => (
      <Text className="text-sm  text-gray-900 dark:text-gray-700">
        {subCounty}
      </Text>
    ),
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
          {id === '3324' || id === '3336' ? (
              <Link href={{ pathname: routes.customers.analyseQuotations, query: { id } }}>
                <Text className="text-green-500">View</Text>
              </Link>
          ) : (
              <Link href={{ pathname: routes.customers.contractorQuotation, query: { id } }}>
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
