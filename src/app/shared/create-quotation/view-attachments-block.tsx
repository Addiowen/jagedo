import { Button, Text } from 'rizzui';
import { PiCloudArrowDown } from "react-icons/pi";

const ViewAttachmentsBlock = () => {
    const attachments = [
        { name: 'Attachment 1', downloadLink: '#' },
        { name: 'Attachment 2', downloadLink: '#' },
        { name: 'Attachment 3', downloadLink: '#' }
    ];

    return (  
        <>
        <div className="relative mt-8 mb-8 px-4 pt-6 pb-10 border border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <p className="mb-6 text-xl text-gray-900 dark:text-gray-100 font-semibold">Attachments</p>

            {/* Table Header */}
            <div className="grid grid-cols-3 gap-0 border-b border-gray-300 dark:border-gray-600">
                <Text className="text-center py-2 font-semibold text-gray-700 dark:text-gray-200">#</Text>
                <Text className="text-center py-2 font-semibold text-gray-700 dark:text-gray-200">Document Name</Text>
                <Text className="text-center py-2 font-semibold text-gray-700 dark:text-gray-200">Download</Text>
            </div>

            {/* Table Rows */}
            {attachments.map((attachment, index) => (
                <div key={index} className="grid grid-cols-3 gap-0 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="col-span-1 py-3">
                        <Text className="text-center font-medium text-gray-900 dark:text-gray-100">{index + 1}</Text>
                    </div>
                    <div className="col-span-1 py-3">
                        <Text className="text-center font-medium text-gray-900 dark:text-gray-100">{attachment.name}</Text>
                    </div>
                    <div className="col-span-1 py-3 flex justify-center">
                        <Button
                            variant="text"
                            onClick={() => { window.location.href = attachment.downloadLink; }}
                            className="text-sm font-bold leading-loose text-blue-500 hover:text-blue-600 group"
                        >
                            <PiCloudArrowDown className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-transform transform group-hover:scale-110" /> 
                        </Button>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default ViewAttachmentsBlock;
