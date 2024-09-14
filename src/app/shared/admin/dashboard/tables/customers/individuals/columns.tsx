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
import { routes } from '@/config/routes';
import Link from 'next/link';

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
    title: <HeaderCell title="Number " />,
    dataIndex: 'no',
    key: 'no',
    width: 90,
    render: (no: number) => <Text>{no}</Text>,
  },

  {
    title: <HeaderCell title="First Name" />,
    dataIndex: 'firstName',
    key: 'firstName',
    width: 100,
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
    width: 100,
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
    width: 50,
    render: (email: string) => <Text>{email}</Text>,
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
    width: 120,
    render: (subCounty: string) => <Text>{subCounty}</Text>,
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: 'action',
    key: 'action',
    width: 50,
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
                pathname: routes.admin.editIndividualCustomerProfile,
                query: { id: row.id },
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
