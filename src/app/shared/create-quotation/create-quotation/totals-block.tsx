import { QuoteInput } from "./quote-forms/quote-input";
import { Text } from 'rizzui';
import { useFormContext } from 'react-hook-form';

const TotalsBlock = () => {
    const { register } = useFormContext();

    return (  
        <>
        <div className="grid grid-cols-2 b-2 mt-12 min-h-10 grid-cols-2 gap-0 border-b border-t border-muted dark:border-muted/20">
            <div className="col-span-1 p-2">
                <Text className='text-center font-semibold text-gray-900'>Total Expenses Cost</Text>
            </div>
            <div className="col-span-1 p-2">
                <QuoteInput
                inputClassName="[&_input]:text-center"
                placeholder="total"
                {...register(`totalExpensesCost`)}
                />
            </div>    
        </div>
        <div className="grid grid-cols-2 min-h-10 grid-cols-2 gap-0">
            <div className="col-span-1 p-2">
                <Text className='text-center font-semibold text-gray-900'>Grand Total</Text>
            </div>
            <div className="col-span-1 p-2">
                <QuoteInput
                inputClassName="[&_input]:text-center"
                placeholder="total"
                {...register(`grandTotal`)}
                />
            </div>    
        </div>
        </>
    );
}
{/* <div className="group grid grid-cols-2 gap-0 border-b border-muted dark:border-muted/20"> */}
 
export default TotalsBlock;