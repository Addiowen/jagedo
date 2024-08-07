import { FileInput } from '@/app/shared/commons/custom-file-input';
import UploadZone from '@/components/ui/file-upload/upload-zone';

const AttachmentsBlock = () => {
  return (
    <div className="mb-8 mt-8 rounded-lg border border-muted bg-gray-0 px-2 pb-6 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
      <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
        Add Attachments
      </p>
      {/* <p className="font-medium mb-1">Please share with us 3 photos of your previous jobs</p> */}
      <UploadZone
        label=""
        className="flex-grow"
        name="attachments"
        getValues={() => {}}
        setValue={() => {}}
      />
    </div>
  );
};

export default AttachmentsBlock;
