import { FileInput } from "@/app/shared/commons/custom-file-input";

const AttachmentsBlock = () => {
    return (  
        <div className="mt-8 mb-8 px-2 pt-6 pb-6 border border-muted rounded-lg sm:rounded-sm lg:rounded-xl xl:rounded-2xl bg-gray-0 dark:bg-gray-50">
            <p className='mb-4 ps-4 text-lg text-gray-900 font-semibold'>Add Attachments</p>
            {/* <p className="font-medium mb-1">Please share with us 3 photos of your previous jobs</p> */}
            <FileInput />
        </div>
    );
}
 
export default AttachmentsBlock;