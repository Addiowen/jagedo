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

function getStatusBadge(review: string) {
  switch (review.toLowerCase()) {
    case 'ongoing':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{review}</Text>
        </div>
      );
    case 'complete':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{review}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{review}</Text>
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
  onStatusClick: (status: string) => void;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
  onStatusClick,
}: Columns) => [
  {
    title: <HeaderCell title="No" />,
    dataIndex: 'no',
    key: 'no',
    width: 10,
    render: (no: string) => <Text>{no}</Text>,
  },
  {
    title: <HeaderCell title="JOB ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 10,
    render: (id: string) => <Text>JOB{id}</Text>,
  },

  {
    title: <HeaderCell title="Date" className="uppercase" />,
    dataIndex: 'requisitionDate',
    key: 'requisitionDate',
    width: 100,
    render: (requisitionDate: Date) => <DateCell date={requisitionDate} />,
  },
  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 20,
    render: (category: string) => <Text>{category}</Text>,
  },
  {
    title: <HeaderCell title="Sub Category" />,
    dataIndex: 'subCategory',
    key: 'subCategory',
    width: 80,
    render: (category: string) => <Text>{category}</Text>,
  },
  {
    title: <HeaderCell title="Request Type" />,
    dataIndex: 'reqType',
    key: 'reqType',
    width: 300,
    render: (reqType: string) => <Text>{reqType}</Text>,
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 200,
    render: (description: string) => <Text>{description}</Text>,
  },
  {
    title: <HeaderCell title="Location" />,
    dataIndex: 'location',
    key: 'location',
    width: 100,
    render: (location: string) => <Text>{location}</Text>,
  },

  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: 'id',
    key: 'action',
    width: 10,
    render: (id: string, row: any) => (
      <div className="flex items-center ">
        <Link href={{ pathname: routes.admin.activeJobDetails, query: { id } }}>
          <Text className="text-sm text-green-600">View</Text>
        </Link>

        {/* <DeletePopover
          title={`Remove User`}
          description={`Are you sure you want to remove this User?`}
          onDelete={() => onDeleteItem(row.id)}
        /> */}
      </div>
    ),
  },
];
