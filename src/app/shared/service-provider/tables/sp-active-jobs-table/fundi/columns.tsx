'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge } from 'rizzui';
// import PencilIcon from '@/components/icons/pencil';
// import EyeIcon from '@/components/icons/eye';
// import DeletePopover from '@/app/shared/commons/delete-popover';
// import DateCell from '@/components/ui/date-cell';
// import { useState } from 'react';
// import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
// import { last } from 'lodash';
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
    case 'ongoing':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
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
    title: <HeaderCell title="No." />,
    dataIndex: 'number',
    key: 'number',
    width: 50,
    render: (number: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {number}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Job No." />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (id: string) => (
    // <Text>#{id}</Text>
    <Text className="text-sm text-gray-900 dark:text-gray-700">
      #{id}
    </Text>
  ),
  },

  {
    title: <HeaderCell title="Date" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 100,
    render: (date: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {date}
      </Text>
    ),
  },

  // {
  //   title: <HeaderCell title="Date" className="uppercase" />,
  //   dataIndex: 'date',
  //   key: 'date',
  //   width: 100,
  //   render: (date: Date) => <DateCell date={date} />,
  // },

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
    width: 200,
    render: (requestType: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {requestType}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="County" />,
    dataIndex: 'county',
    key: 'county',
    width: 100,
    render: (county: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {county}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Sub-county" />,
    dataIndex: 'subCounty',
    key: 'subCounty',
    width: 100,
    render: (subCounty: string) => (
      <Text className="text-sm text-gray-900 dark:text-gray-700">
        {subCounty}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 100,
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
    dataIndex: 'id',
    key: 'action',
    width: 150,
    render: (id: string, row: any) => (
      <div className="gap-3 pe-3">
          <Link href={{ pathname: routes.serviceProvider.fundi.jobDetails, query: { id } }}>
            <Text className="text-sm text-green-600">View Job</Text>
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
