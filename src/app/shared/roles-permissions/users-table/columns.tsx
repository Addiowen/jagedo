'use client';

import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/commons/delete-popover';
import Link from 'next/link';
import { routes } from '@/config/routes';

// function getStatusBadge(status: User['status']) {
//   switch (status) {
//     case STATUSES.Deactivated:
//       return (
//         <div className="flex items-center">
//           <Badge color="danger" renderAsDot />

//           <Text className="ms-2 font-medium text-red-dark">{status}</Text>
//         </div>
//       );
//     case STATUSES.Active:
//       return (
//         <div className="flex items-center">
//           <Badge color="success" renderAsDot />
//           <Text className="ms-2 font-medium text-green-dark">{status}</Text>
//         </div>
//       );
//     case STATUSES.Pending:
//       return (
//         <div className="flex items-center">
//           <Badge renderAsDot className="bg-gray-400" />
//           <Text className="ms-2 font-medium text-gray-600">{status}</Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <Badge renderAsDot className="bg-gray-400" />
//           <Text className="ms-2 font-medium text-gray-600">{status}</Text>
//         </div>
//       );
//   }
// }

type Columns = {
  data: any;
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  // {
  //   title: (
  //     <div className="flex items-center gap-3 whitespace-nowrap ps-3">
  //       <Checkbox
  //         title={'Select All'}
  //         onChange={handleSelectAll}
  //         checked={checkedItems.length === data.length}
  //         className="cursor-pointer"
  //       />
  //       User ID
  //     </div>
  //   ),
  //   dataIndex: 'checked',
  //   key: 'checked',
  //   width: 30,
  //   render: (_: any, row: User) => (
  //     <div className="inline-flex ps-3">
  //       <Checkbox
  //         className="cursor-pointer"
  //         checked={checkedItems.includes(row.id)}
  //         {...(onChecked && { onChange: () => onChecked(row.id) })}
  //         label={`#${row.id}`}
  //       />
  //     </div>
  //   ),
  // },
  {
    title: <HeaderCell title="Number" />,
    dataIndex: 'no',
    key: 'no',
    width: 50,
    render: (no: number) => no,
  },

  // {
  //   title: <HeaderCell title="Name" />,
  //   dataIndex: 'fullName',
  //   key: 'fullName',
  //   width: 250,
  //   render: (_: string, user: User) => (
  //     <AvatarCard
  //       src={user.avatar}
  //       name={user.fullName}
  //       description={user.email}
  //     />
  //   ),
  // },
  {
    title: <HeaderCell title="First Name" />,
    dataIndex: 'firstname',
    key: 'firstname',
    width: 150,
    render: (firstname: string) => firstname,
  },
  {
    title: <HeaderCell title="Last Name" />,
    dataIndex: 'lastname',
    key: 'lastname',
    width: 150,
    render: (lastname: string) => lastname,
  },

  // {
  //   title: <HeaderCell title="Role" />,
  //   dataIndex: 'role',
  //   key: 'role',
  //   width: 250,
  //   render: (role: string) => role,
  // },

  {
    title: (
      <HeaderCell
        title="Role"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'role'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('role'),
    dataIndex: 'role',
    key: 'role',
    width: 150,
    render: (role: string) => role,
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('date'),
    dataIndex: 'date',
    key: 'date',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },

  {
    title: <HeaderCell title="Phone Number" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 150,
    render: (phone: string) => phone,
  },
  // {
  //   title: <HeaderCell title="Permissions" />,
  //   dataIndex: 'permissions',
  //   key: 'permissions',
  //   width: 200,
  //   render: (permissions: User['permissions'][]) => (
  //     <div className="flex items-center gap-2">
  //       {permissions.map((permission) => (
  //         <Badge
  //           key={permission}
  //           rounded="lg"
  //           variant="outline"
  //           className="border-muted font-normal text-gray-500"
  //         >
  //           {permission}
  //         </Badge>
  //       ))}
  //     </div>
  //   ),
  // },
  // {
  //   title: <HeaderCell title="Status" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 120,
  //   render: (status: User['status']) => getStatusBadge(status),
  // },
  {
    title: <HeaderCell title="Actions" />,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, user: User) => (
      <div className="flex items-center  gap-3 pe-3">
        <Link href={`${routes.admin.editAdminProfile}?id=${user.id}`}>
          <Tooltip
            size="sm"
            content={'Edit User'}
            placement="top"
            color="invert"
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
        </Link>

        <DeletePopover
          title={`Delete this user`}
          description={`Are you sure you want to delete this #${user.id} user?`}
          onDelete={() => onDeleteItem(user.id)}
        />
      </div>
    ),
  },
];
