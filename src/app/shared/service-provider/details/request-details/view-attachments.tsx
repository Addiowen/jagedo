import { Button, Text } from 'rizzui';
import { PiCloudArrowDown } from 'react-icons/pi';
import axios from 'axios'; // Import axios for HTTP requests

interface Attachment {
  name: string;
  url: string;
}

interface ViewAttachmentsProps {
  attachments: Attachment[];
}

const ViewAttachments: React.FC<ViewAttachmentsProps> = ({ attachments }) => {
  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob', // Important for binary data
      });

      // Create a URL for the Blob data
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', name); // Set the download attribute with the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM

      // Revoke the Blob URL after the download
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="relative mb-4 mt-4 rounded-lg border border-muted bg-gray-0 px-2 pb-10 pt-6 shadow-md dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
      <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
        Attachments
      </p>

      {/* Table Header */}
      <div className="grid grid-cols-3 gap-0 border-b border-muted dark:border-muted/20 p-2">
        <div className="col-span-1 text-center font-semibold text-gray-900">#</div>
        <div className="col-span-1 text-center font-semibold text-gray-900">Attachment Name</div>
        <div className="col-span-1 text-center font-semibold text-gray-900">Download</div>
      </div>

      {/* Table Body */}
      {attachments.map((attachment, index) => (
        <div
          key={index}
          className="grid grid-cols-3 gap-0 border-b border-muted dark:border-muted/20"
        >
          <div className="col-span-1 p-2 text-center">{index + 1}</div>
          <div className="col-span-1 p-2 text-center">
            <Text className="font-semibold text-gray-900">{attachment.name}</Text>
          </div>
          <Button
            variant="text"
            onClick={() => handleDownload(attachment.url, attachment.name)}
            className="group col-span-1 p-2 text-sm font-bold leading-loose text-gray-500"
          >
            <PiCloudArrowDown className="h-6 w-6 text-gray-500 group-hover:text-blue-500" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ViewAttachments;
