import { orderData } from '@/data/order-data';
import { getWidgetColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

export default function CustomerTable({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title="Customers Register"
      data={orderData}
      // @ts-ignore
      getColumns={getWidgetColumns}
      className={className}
      enablePagination
      noGutter
      searchPlaceholder="Search..."
      variant="elegant"
    />
  );
}
