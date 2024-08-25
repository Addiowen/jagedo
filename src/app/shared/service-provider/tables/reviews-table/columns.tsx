'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Badge } from 'rizzui';
import { Dispatch, SetStateAction } from 'react';
import DateCell from '@/components/ui/date-cell';
import Rate from '@/components/ui/rate';
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
  setViewReviewsModalState: Dispatch<SetStateAction<boolean>>
};

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'under review':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'open':
      return (
        <div className="flex items-center">
          <Badge color='success' renderAsDot />
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
    title: <HeaderCell title="Sub-category" />,
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

  // {
  //   title: <HeaderCell title="Status" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 100,
  //   render: (value: string) => getStatusBadge(value),
  // },

  {
    title: <HeaderCell title="Rating" className="uppercase" />,
    dataIndex: 'rating',
    key: 'rating',
    width: 150,
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
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Action" />,
    dataIndex: 'status',
    key: 'action',
    width: 100,
    render: (requestType: string, row: any) => (
        <div className="gap-3 pe-3">        
          <Link href={routes.serviceProvider.fundi.viewReview}>
            <Text /*onClick={() => setViewReviewsModalState(true)}*/ className="text-sm text-green-600 cursor-pointer">
              View
            </Text>
          </Link>
        </div>
      ),
  },
];