import dynamic from 'next/dynamic';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';
// import UploadButton from '@/app/shared/commons/upload-button';
import UploadButtonOutlined from './buttons/upload-button-outlined';
// import FileUpload from '@/app/shared/commons/file-upload';
const FileUpload = dynamic(() => import('@/app/shared/commons/file-upload'), {
    ssr: false,
  });

interface FormFooterProps {
  className?: string;
//   altBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  handleAltBtn?: () => void;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function CustomFormFooter({
  isLoading,
//   altBtnText = 'Save as Draft',
  submitBtnText = 'Submit',
  className,
  handleAltBtn,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50',
        className,
        negMargin
      )}
    >
      {/* <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={handleAltBtn}
      >
        {altBtnText}
      </Button> */}
      {/* <UploadButton modalView={<FileUpload />} /> */}
      <UploadButtonOutlined modalView={<FileUpload />} />
      
      <Button type="submit" isLoading={isLoading} className="w-full @xl:w-auto">
        {submitBtnText}
      </Button>
    </div>
  );
}
