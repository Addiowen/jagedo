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
    case 'unreviewed':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{review}</Text>
        </div>
      );
    case 'reviewed':
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
    title: <HeaderCell title="NUMBER" />,
    dataIndex: 'number',
    key: 'number',
    width: 10,
    render: (number: string) => <Text>{number}</Text>,
  },

  {
    title: <HeaderCell title="JOB NO" />,
    dataIndex: 'id',
    key: 'id',
    width: 10,
    render: (id: string) => <Text>#{id}</Text>,
  },

  {
    title: <HeaderCell title="Category" className="uppercase" />,
    dataIndex: 'category',
    key: 'category',
    width: 20,
    render: (category: string) => <Text>{category}</Text>,
  },
  {
    title: <HeaderCell title="Sub Category" className="uppercase" />,
    dataIndex: 'subCategory',
    key: 'subCategory',
    width: 50,
    render: (subCategory: string) => <Text>{subCategory}</Text>,
  },
  {
    title: <HeaderCell title="Request Type" className="uppercase" />,
    dataIndex: 'requestType',
    key: 'requestType',
    width: 250,
    render: (requestType: string) => <Text>{requestType}</Text>,
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
    width: 50,
    render: (value: string) => getStatusBadge(value),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: 'id',
    key: 'action',
    width: 50,
    render: (id: string, row: any) => (
      <div className="flex items-center ">
        <Link
          href={{ pathname: routes.admin.completedJobDetails, query: { id } }}
        >
          <Text className="text-sm text-green-600">View</Text>
        </Link>
      </div>
    ),
  },
];
