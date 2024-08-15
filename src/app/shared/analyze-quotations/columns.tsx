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
    title: <HeaderCell title="QTN NO." />,
    dataIndex: 'id',
    key: 'id',
    width: 20,
    render: (id: string) => <Text>QTN#{id}</Text>,
  },
  {
    title: <HeaderCell title="Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 100,
    render: (date: Date) => <DateCell date={date} />,
  },
  {
    title: <HeaderCell title="CATEGORY" />,
    dataIndex: 'category',
    key: 'category',
    width: 100,
    render: (category: string) => (
      <Text className="text-sm  text-gray-900 dark:text-gray-700">
        {category}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="SUB-CATEGORY" />,
    dataIndex: 'subCategory',
    key: 'subCategory',
    width: 100,
    render: (subCategory: string) => (
      <Text className="text-sm  text-gray-900 dark:text-gray-700">
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
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 40,
    render: (amount: string) => <Text>{amount}</Text>,
  },

  {
    title: <HeaderCell title="Professional name" />,
    dataIndex: 'professionalName',
    key: 'professionalName',
    width: 100,
    render: (professionalName: string) => {
      const maskName = (name: string) => {
        return name
          .split(' ')
          .map((word) => {
            if (word.length <= 1) return word;
            return `${word[0]}${'x'.repeat(word.length - 1)}`;
          })
          .join(' ');
      };
  
      return (
        <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
          {maskName(professionalName)}
        </Text>
      );
    },
  },

  {
    title: <HeaderCell title="Phone Number" />,
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 80,
    render: (phoneNumber: string) => {
      const maskNumber = (number: string) => {
        if (number.length <= 4) return number;
        return `${number.slice(0, 4)}${'x'.repeat(number.length - 4)}`;
      };
  
      return (
        <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
          {maskNumber(phoneNumber)}
        </Text>
      );
    },
  },

  {
    title: <HeaderCell title="Email Address" />,
    dataIndex: 'emailAddress',
    key: 'emailAddress',
    width: 10,
    render: (emailAddress: string) => {
      const maskEmail = (email: string) => {
        const [localPart, domain] = email.split('@');
        if (localPart.length <= 1) return email;
        return `${localPart[0]}${'x'.repeat(localPart.length - 1)}@${domain}`;
      };
  
      return (
        <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
          {maskEmail(emailAddress)}
        </Text>
      );
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-3 pe-3">
        <Link href={routes.customers.createQuotation}>
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
