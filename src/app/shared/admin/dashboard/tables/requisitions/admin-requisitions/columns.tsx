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
    dataIndex: 'number',
    key: 'number',
    width: 30,
    render: (number: string) => <Text>{number}</Text>,
  },
  {
    title: <HeaderCell title="REQ NO" />,
    dataIndex: 'id',
    key: 'id',
    width: 10,
    render: (id: string) => <Text>REQ#{`${id.slice(0, 5)}...`}</Text>,
  },
  {
    title: <HeaderCell title="DATE" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 150,
    render: (date: Date) => <DateCell date={date} />,
  },

  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 20,
    render: (category: string) => <Text className="w-5">{category}</Text>,
  },
  {
    title: <HeaderCell title="Sub Category" />,
    dataIndex: 'subCategory',
    key: 'subCategory',
    width: 20,
    render: (subCategory: string) => <Text>{subCategory}</Text>,
  },
  {
    title: <HeaderCell title="Request Type" />,
    dataIndex: 'requestType',
    key: 'requestType',
    width: 250,
    render: (requestType: string) => (
      <Text className="font-semibold">{requestType}</Text>
    ),
  },
  // {
  //   title: <HeaderCell title="Description" />,
  //   dataIndex: 'description',
  //   key: 'description',
  //   width: 200,
  //   render: (description: string) => <Text>{description}</Text>,
  // },
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
    title: <HeaderCell title="Actions" />,
    dataIndex: 'id',
    key: 'action',
    width: 50,
    render: (id: string, row: any) => {
      return (
        <div className="flex items-center justify-center gap-3 ">
          <Link
            href={{ pathname: routes.admin.requisitionDetails, query: { id } }}
          >
            <EyeIcon className="h-4 w-4" />
          </Link>

          {/* DeletePopover code */}
        </div>
      );
    },
  },
];
