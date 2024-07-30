'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge, Input } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/commons/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { last } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { QuoteInput } from '../quote-forms/quote-input';
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
};

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'open':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'closed':
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
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
  register,
  control,
}: Columns) => [
  {
    title: <HeaderCell title="Item" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },
  {
    title: <HeaderCell title="Professional Name" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },

  {
    title: <HeaderCell title="Professional Fees" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },

  {
    title: <HeaderCell title="Expenses" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },

  {
    title: <HeaderCell title="Total Amount" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },

  {
    title: <HeaderCell title="Withholding Tax" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },

  {
    title: <HeaderCell title="Payable By Client" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },

  {
    title: <HeaderCell title="JaGedo Commission" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
    ),
  },

  {
    title: <HeaderCell title="Payable To Service Provider" />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string, record: any, rowIndex: number) => (
      <QuoteInput
        type="number"
        placeholder="1"
        defaultValue={0}
        inputClassName="[&_input]:text-center"
        {...register(`thirdTable.${rowIndex}.professionalFees`, {
          valueAsNumber: true,
        })}
      />
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


      // <Controller
      //   name={`professionalFees-${rowIndex}`}
      //   control={control}
      //   defaultValue={number}
      //   render={({ field }) => (
      //     <Input
      //       placeholder="1"
      //       size="md"
      //       inputClassName="text-sm"
      //       type='number'
      //       {...field}
      //       className="[&>label>span]:font-medium"
      //     />
      //   )}
      // />

            // <Input
      //   placeholder="1"
      //   size="md"
      //   inputClassName="text-sm"
      //   type='number'
      //   className="[&>label>span]:font-medium"
      //   {...register(`thirdTable.${rowIndex}.professionalFees`, {
      //     valueAsNumber: true,
      //   })}
      // />