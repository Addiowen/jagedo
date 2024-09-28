import { Text } from 'rizzui';
import { CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';

const ViewTotalsBlock = ({ otherFees }: { otherFees: any }) => {
  const values = CREATE_QUOTATION_VIEW_VALUE;

  return (
    <>
      <div className="b-2 mt-12 grid min-h-10 grid-cols-2 grid-cols-2 gap-0 border-b border-t border-muted dark:border-muted/20">
        <div className="col-span-1 p-2">
          <Text className="text-center font-semibold text-gray-900">
            Total Expenses Cost
          </Text>
        </div>
        <div className="col-span-1 p-2">
          <Text className="text-center text-gray-900 dark:text-gray-0">
            {otherFees.totalExpensesCost}
          </Text>
        </div>
      </div>
      <div className="grid min-h-10 grid-cols-2 grid-cols-2 gap-0">
        <div className="col-span-1 p-2">
          <Text className="text-center font-semibold text-gray-900">
            Grand Total
          </Text>
        </div>
        <div className="col-span-1 p-2">
          <Text className="text-center text-gray-900 dark:text-gray-0">
            {otherFees.grandTotal}
          </Text>
        </div>
      </div>
    </>
  );
};

export default ViewTotalsBlock;
