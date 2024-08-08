import { QuoteInput } from '@/app/shared/create-quotation/create-quotation/quote-forms/quote-input';
import { Button, Text } from 'rizzui';
// import { useFormContext } from 'react-hook-form';
import { PiCloudArrowDown } from 'react-icons/pi';

const ViewAttachmentsBlock = () => {
  // const { register } = useFormContext();

  return (
    <>
      <div className="relative mb-8 mt-8 rounded-lg border border-muted bg-gray-0 px-2 pb-10 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
        <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
          Attachments
        </p>
        <div className="b-2 mt-12 grid min-h-10 grid-cols-2 grid-cols-2 gap-0 border-b border-t border-muted dark:border-muted/20">
          <div className="col-span-1 p-2">
            <Text className="text-center font-semibold text-gray-900">
              Attachment 1
            </Text>
          </div>
          {/* <div className="col-span-1 p-2">
                    <QuoteInput
                    inputClassName="[&_input]:text-center"
                    placeholder="total"
                    {...register(`totalExpensesCost`)}
                    />
                </div>    */}

          <Button
            variant="text"
            // variant='outline'
            onClick={() => {}}
            className="group col-span-1 p-2 text-sm font-bold leading-loose text-gray-500"
          >
            <PiCloudArrowDown className="h-6 w-6 text-gray-500 group-hover:text-blue-500" />
          </Button>
        </div>
        <div className="b-2 grid min-h-10 grid-cols-2 grid-cols-2 gap-0 border-b border-muted dark:border-muted/20">
          <div className="col-span-1 p-2">
            <Text className="text-center font-semibold text-gray-900">
              Attachment 2
            </Text>
          </div>

          <Button
            variant="text"
            // variant='outline'
            onClick={() => {}}
            className="group col-span-1 p-2 text-sm font-bold leading-loose text-gray-500"
          >
            <PiCloudArrowDown className="h-6 w-6 text-gray-500 group-hover:text-blue-500" />
          </Button>
        </div>
      </div>
    </>
  );
};
//  <div className="group grid grid-cols-2 gap-0 border-b border-muted dark:border-muted/20">

export default ViewAttachmentsBlock;
