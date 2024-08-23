import { Text } from 'rizzui';
import { CREATE_QUOTATION_VIEW_VALUE } from '@/utils/create-quotation.schema';

const ViewTotalsBlock = () => {
    const values = CREATE_QUOTATION_VIEW_VALUE

    return (  
        <>
        <div className="grid grid-cols-2 b-2 mt-12 min-h-10 grid-cols-2 gap-0 border-b border-t border-muted dark:border-muted/20">
            <div className="col-span-1 p-2">
                <Text className='text-center font-semibold text-gray-900'>Total Expenses Cost</Text>
            </div>
            <div className="col-span-1 p-2">
                <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.totalExpensesCost }</Text>
            </div>    
        </div>
        <div className="grid grid-cols-2 min-h-10 grid-cols-2 gap-0">
            <div className="col-span-1 p-2">
                <Text className='text-center font-semibold text-gray-900'>Grand Total</Text>
            </div>
            <div className="col-span-1 p-2">
                <Text className='text-center text-gray-900 dark:text-gray-0'>{ values.grandTotal }</Text>
            </div>    
        </div>
        </>
    );
}
 
export default ViewTotalsBlock;