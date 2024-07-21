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

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'unverified':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    case 'approved':
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
    title: <HeaderCell title="JOB ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (id: string) => <Text>#{id}</Text>,
  },

  {
    title: <HeaderCell title="First Name" />,
    dataIndex: 'firstName',
    key: 'firstName',
    width: 200,
    render: (firstName: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {firstName}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Last Name" />,
    dataIndex: 'lastName',
    key: 'lastName',
    width: 200,
    render: (lastName: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {lastName}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Phone Number" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 80,
    render: (phone: number) => <Text>{phone}</Text>,
  },
  {
    title: <HeaderCell title="Email" />,
    dataIndex: 'email',
    key: 'email',
    width: 120,
    render: (email: string) => <Text>{email}</Text>,
  },
  {
    title: <HeaderCell title="Gender" />,
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    render: (gender: string) => <Text>{gender}</Text>,
  },

  {
    title: <HeaderCell title="Age" />,
    dataIndex: 'age',
    key: 'age',
    width: 80,
    render: (age: string) => <Text>{age}</Text>,
  },
  {
    title: <HeaderCell title="Location" />,
    dataIndex: 'location',
    key: 'location',
    width: 120,
    render: (location: string) => <Text>{location}</Text>,
  },

  {
    title: <HeaderCell title="Joined Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 230,
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
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: 'action',
    key: 'action',
    width: 180,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'View'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Appointment'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <Link
              href={{
                pathname: routes.admin.editFundiProfile,
                query: {
                  status:
                    row.status.toLowerCase() === 'approved'
                      ? 'approved'
                      : 'unverified',
                },
              }}
            >
              <EyeIcon className="h-4 w-4" />
            </Link>
          </ActionIcon>
        </Tooltip>
        {/* <DeletePopover
          title={`Remove User`}
          description={`Are you sure you want to remove this User?`}
          onDelete={() => onDeleteItem(row.id)}
        /> */}
      </div>
    ),
  },
];
