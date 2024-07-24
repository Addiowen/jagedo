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
};

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
          <Badge className="bg-gray-400" renderAsDot />
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
}: Columns) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: 'id',
    key: 'id',
    width: 10,
    render: (id: string) => <Text>#{id}</Text>,
  },

  {
    title: <HeaderCell title="Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 100,
    render: (date: Date) => <DateCell date={date} />,
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
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 100,
    render: (description: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {description}
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
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
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
    dataIndex: 'requestType',
    key: 'action',
    width: 100,
    render: (requestType: string, row: any) => (
      <div className="gap-3 pe-3">
        
        <Link href={routes.serviceProvider.fundi.viewReview}>
          <Text className="text-sm text-green-600">View Review</Text>
        </Link>
        

        {/* <Tooltip size="sm" content={'View'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Appointment'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <Link href={routes.serviceProvider.confirmAvailability}>
              <EyeIcon className="h-4 w-4" />
            </Link>
          </ActionIcon>
        </Tooltip> */}


        {/* <DeletePopover
          title={`Remove User`}
          description={`Are you sure you want to remove this User?`}
          onDelete={() => onDeleteItem(row.id)}
        /> */}
      </div>
    ),
  },



  // {
  //   // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
  //   title: <HeaderCell title="Actions" />,
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 100,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-3">
  //       <Tooltip size="sm" content={'View'} placement="top" color="invert">
  //         <ActionIcon
  //           as="span"
  //           size="sm"
  //           variant="outline"
  //           aria-label={'View Appointment'}
  //           className="hover:!border-gray-900 hover:text-gray-700"
  //         >
  //           <EyeIcon className="h-4 w-4" />
  //         </ActionIcon>
  //       </Tooltip>
  //       {/* <DeletePopover
  //         title={`Remove User`}
  //         description={`Are you sure you want to remove this User?`}
  //         onDelete={() => onDeleteItem(row.id)}
  //       /> */}
  //     </div>
  //   ),
  // },
];

// function StatusSelect({ selectItem }: { selectItem?: string }) {
//   const selectItemValue = statusOptions.find(
//     (option) => option.value === selectItem
//   );
//   const [value, setValue] = useState(selectItemValue);
//   return (
//     <Select
//       dropdownClassName="!z-10"
//       className="min-w-[140px]"
//       inPortal={false}
//       placeholder="Select Role"
//       options={statusOptions}
//       value={value}
//       onChange={setValue}
//       displayValue={(option: { value: any }) =>
//         renderOptionDisplayValue(option.value as string)
//       }
//     />
//   );
// }

// function renderOptionDisplayValue(value: string) {
//   switch (value) {
//     case 'Closed':
//       return (
//         <div className="flex items-center">
//           <PiPlusCircle className="shrink-0 rotate-45 fill-red-dark text-lg" />
//           <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
//             {value}
//           </Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <PiCheckCircleBold className="shrink-0 fill-green-dark text-lg" />
//           <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
//             {value}
//           </Text>
//         </div>
//       );
//   }
// }
