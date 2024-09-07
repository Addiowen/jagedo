'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/commons/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { Dispatch, SetStateAction, useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { last } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';
import Rate from '@/components/ui/rate';

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
  setViewReviewsModalState: Dispatch<SetStateAction<boolean>>;
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
  setViewReviewsModalState,
  hideRatingColumn,
}: Columns & { hideRatingColumn?: boolean }) => {
  const columns = [
    {
      title: <HeaderCell title="No" />,
      dataIndex: 'number',
      key: 'number',
      width: 10,
      render: (number: string) => <Text>{number}</Text>,
    },
    {
      title: <HeaderCell title="#" />,
      dataIndex: 'id',
      key: 'id',
      width: 10,
      render: (id: string) => <Text>{id}</Text>,
    },
    !hideRatingColumn && {
      title: <HeaderCell title="Rating" />,
      dataIndex: 'ratingId',
      key: 'ratingId',
      width: 100,
      render: (ratingId: string) => (
        <Text className="text-sm text-gray-900 dark:text-gray-700">
          {ratingId}
        </Text>
      ),
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
      title: <HeaderCell title="Sub County" />,
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
      title: <HeaderCell title="Rating" />,
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (rating: number) => (
        <Rate
          size="sm"
          allowHalf={true}
          defaultValue={rating}
          disabled={true}
          tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
        />
      ),
    },
    {
      title: <HeaderCell title="Action" />,
      dataIndex: 'status',
      key: 'action',
      width: 100,
      render: (requestType: string, row: any) => (
        <div className="gap-3 pe-3">
          <Link
            href={{
              pathname: routes.admin.viewReview,
              query: { id: row.ratingId }, // Pass the id in the query
            }}
          >
            <Text className="cursor-pointer text-sm text-green-600">View</Text>
          </Link>
        </div>
      ),
    },
  ];

  // Filter out any false values
  return columns.filter(Boolean);
};
