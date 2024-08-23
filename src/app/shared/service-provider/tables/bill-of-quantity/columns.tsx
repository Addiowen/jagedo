'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge, Input } from 'rizzui';
// import PencilIcon from '@/components/icons/pencil';
// import EyeIcon from '@/components/icons/eye';
// import DeletePopover from '@/app/shared/commons/delete-popover';
// import DateCell from '@/components/ui/date-cell';
// import { useState } from 'react';
// import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
// import { last } from 'lodash';
// import Link from 'next/link';
// import { routes } from '@/config/routes';
import { Controller } from 'react-hook-form';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  control: any;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
  control,
}: Columns) => [
  {
    title: <HeaderCell title="Bill No" />,
    dataIndex: 'billNo',
    key: 'billNo',
    width: 100,
    render: (billNo: string, record: any, rowIndex: number) => (
      // <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
      //   {billNo}
      // </Text>
      // <Input
      //   placeholder='bill number'
      //   // label="First Name"
      //   size="md"
      //   inputClassName="text-sm"
      //   // {...register('firstName')}
      //   // error={errors.firstName?.message}
      //   className="[&>label>span]:font-medium"
      //   variant='text'
      //   value={billNo}
      // />

      <Controller
        name={`billNo-${rowIndex}`}
        control={control}
        defaultValue={billNo}
        render={({ field }) => (
          <Input
            placeholder="Bill No"
            size="md"
            inputClassName="text-sm"
            {...field}
            className="[&>label>span]:font-medium"
          />
        )}
      />
    ),
  },
  {
    title: <HeaderCell title="Works" />,
    dataIndex: 'works',
    key: 'works',
    width: 200,
    render: (works: string, record: any, rowIndex: number) => (
      // <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
      //   {works}
      // </Text>
      <Controller
        name={`works-${rowIndex}`}
        control={control}
        defaultValue={works}
        render={({ field }) => (
          <Input
            placeholder="Works"
            size="md"
            inputClassName="text-sm"
            {...field}
            className="[&>label>span]:font-medium"
          />
        )}
      />
    ),
  },

  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 200,
    render: (amount: string, record: any, rowIndex: number) => (
      // <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
      //   {amount}
      // </Text>
      <Controller
        name={`amount-${rowIndex}`}
        control={control}
        defaultValue={amount}
        render={({ field }) => (
          <Input
            placeholder="Amount"
            size="md"
            inputClassName="text-sm"
            {...field}
            className="[&>label>span]:font-medium"
          />
        )}
      />
    ),
  },
];
