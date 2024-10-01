import { useState } from 'react';
import axios from 'axios';
import { FaPaperclip, FaCheckCircle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface UploadButtonProps {
  labelText: string;
  htmlFor: string;
  userId: string;
  onUploadSuccess: (url: string) => void; // Callback to report the uploaded URL
}

const UploadButton: React.FC<UploadButtonProps> = ({
  labelText,
  htmlFor,
  userId,
  onUploadSuccess,
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>(''); // Store file URL for download
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean>(false);
  const [downloadStatus, setDownloadStatus] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setSelectedFile(file);
      setUploadSuccessful(false);
    }
  };

  const uploadFileToS3 = async () => {
    if (!selectedFile) {
      toast.error('No file selected.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('userId', userId); // Replace with actual user ID

      const response = await axios.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progressPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercentage);
          }
        },
      });

      const uploadedUrl = response.data.url;
      setFileUrl(uploadedUrl); // Store the URL for the uploaded file
      setUploadSuccessful(true);
      // onUploadSuccess(uploadedUrl); // Call the parent handler with the file URL
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileDelete = () => {
    setFileName('');
    setSelectedFile(null);
    setUploadSuccessful(false);
    setFileUrl(''); // Reset file URL
  };

  const downloadFile = async (url: string) => {
    if (!url) {
      toast.error('No file URL available for download.');
      return;
    }

    setDownloadStatus('Checking URL...');
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const downloadedFileName = fileNameMatch
        ? fileNameMatch[1]
        : fileName || 'downloaded-file';

      const urlObject = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlObject;
      link.setAttribute('download', downloadedFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject);

      setDownloadStatus('Downloaded');
    } catch (error) {
      console.error('Error downloading file:', error);
      setDownloadStatus('Error downloading');
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-lg border bg-white p-4 shadow-md">
      <div className="mb-4 flex w-full flex-col items-center">
        <label
          htmlFor={htmlFor}
          className={`flex cursor-pointer items-center space-x-2 rounded-lg border bg-gray-100 px-4 py-2 transition hover:bg-gray-200 ${uploadSuccessful ? 'pointer-events-none' : ''}`}
          style={{ width: '100%' }}
        >
          <FaPaperclip className="text-gray-600" />
          <span className="truncate text-gray-600">
            {fileName || `Attach a ${labelText}`}
          </span>
          {selectedFile && !uploadSuccessful && (
            <button
              type="button"
              onClick={handleFileDelete}
              className="ml-2 text-red-500 hover:text-red-700"
              aria-label="Remove file"
            >
              <FaTimes />
            </button>
          )}
        </label>
        <input
          id={htmlFor}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploadSuccessful}
        />
      </div>

      {!uploadSuccessful && (
        <div className="flex w-full flex-col items-center">
          <button
            className="mb-2 w-full rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
            onClick={uploadFileToS3}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}

      {uploadSuccessful && fileUrl && (
        <div className="mt-2 flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <button
              onClick={() => downloadFile(fileUrl)}
              className="text-blue-600 hover:underline"
              aria-label="Download file"
              type="button"
            >
              Download File
            </button>
          </div>
          {downloadStatus && <p className="text-gray-500">{downloadStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default UploadButton;
