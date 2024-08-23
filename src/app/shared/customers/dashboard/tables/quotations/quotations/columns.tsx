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

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
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
    render: (id: string) => <Text>#{id}</Text>,
  },

  {
    title: <HeaderCell title="Service Provider" />,
    dataIndex: 'serviceProvider',
    key: 'serviceProvider',
    width: 100,
    render: (serviceProvider: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {serviceProvider}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Location" />,
    dataIndex: 'location',
    key: 'location',
    width: 80,
    render: (location: string) => <Text>{location}</Text>,
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 40,
    render: (amount: string) => <Text>{amount}</Text>,
  },

  {
    title: <HeaderCell title="Qtn Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 100,
    render: (date: Date) => <DateCell date={date} />,
  },

  {
    title: <HeaderCell title="Rating" />,
    dataIndex: 'rating',
    key: 'rating',
    width: 10,
    render: (rating: string) => <Text>{rating}</Text>,
  },
  {
    title: <HeaderCell title="Score" />,
    dataIndex: 'score',
    key: 'score',
    width: 10,
    render: (score: string) => <Text>{score}</Text>,
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
    width: 100,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Button size="sm"> Evaluate</Button>
        <Button size="sm" className="p-2">
          Generate Report
        </Button>
      </div>
    ),
  },
];

function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.value === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      inPortal={false}
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}

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
