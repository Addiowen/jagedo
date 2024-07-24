'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/commons/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { Dispatch, SetStateAction, useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { last } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';

// const statusOptions = [
//   { label: 'Live', value: 'Live' },
//   { label: 'Closed', value: 'Closed' },
// ];

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  setViewReviewsModalState: Dispatch<SetStateAction<boolean>>;
};

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'ongoing':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
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
  setViewReviewsModalState,
}: Columns) => [
  {
    title: <HeaderCell title="No" />,
    dataIndex: 'number',
    key: 'number',
    width: 10,
    render: (number: string) => <Text>{number}</Text>,
  },

  {
    title: <HeaderCell title="#" />,
    dataIndex: 'id',
    key: 'id',
    width: 10,
    render: (id: string) => <Text>{id}</Text>,
  },

  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 100,
    render: (category: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {category}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Sub-Category" />,
    dataIndex: 'subCategory',
    key: 'subCategory',
    width: 100,
    render: (subCategory: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {subCategory}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Request Type" />,
    dataIndex: 'requestType',
    key: 'requestType',
    width: 100,
    render: (requestType: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {requestType}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Location" />,
    dataIndex: 'location',
    key: 'location',
    width: 100,
    render: (location: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {location}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Job Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 100,
    render: (description: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {description}
      </Text>
    ),
  },

  // {
  //   title: <HeaderCell title="Status" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 120,
  //   render: (value: string) => getStatusBadge(value),
  // },

  {
    title: <HeaderCell title="Review By" />,
    dataIndex: 'reviewBy',
    key: 'reviewBy',
    width: 100,
    render: (reviewBy: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {reviewBy}
      </Text>
    ),
  },

  // {
  //   title: <HeaderCell title="Status" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 80,
  //   render: (status: number) => <Text>{status}</Text>,
  // },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Action" />,
    dataIndex: 'status',
    key: 'action',
    width: 100,
    render: (requestType: string, row: any) => (
      <div className="gap-3 pe-3">
        <Text
          onClick={() => setViewReviewsModalState(true)}
          className="cursor-pointer text-sm text-green-600"
        >
          View Review
        </Text>
      </div>
    ),
  },
];
