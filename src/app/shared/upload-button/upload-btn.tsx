import { useState } from 'react';
import axios from 'axios';
import { FaPaperclip, FaCheckCircle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface UploadButtonProps {
  labelText: string;
  htmlFor: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ labelText, htmlFor }) => {
  const [fileName, setFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');
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
      formData.append('userId', 'YOUR_USER_ID'); // Replace with actual user ID

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

      setFileUrl(response.data.url); // Store the URL of the uploaded file
      setUploadSuccessful(true);
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
    setFileUrl('');
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
    <div className="flex flex-col items-center bg-white border rounded-lg p-4 shadow-md w-full max-w-md mx-auto">
      <div className="flex flex-col items-center w-full mb-4">
        <label
          htmlFor={htmlFor}
          className={`flex items-center space-x-2 cursor-pointer px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition ${uploadSuccessful ? 'pointer-events-none' : ''}`}
          style={{ width: '100%' }}
        >
          <FaPaperclip className="text-gray-600" />
          <span className="text-gray-600 truncate">{fileName || `Attach a ${labelText}`}</span>
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
        <div className="flex flex-col items-center w-full">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-500 transition mb-2 w-full"
            onClick={uploadFileToS3}
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="relative inline-flex items-center">
                <span>Uploading...</span>
                <span className="absolute top-0 right-0 h-full w-1.5 bg-gray-200"></span>
              </span>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      )}

      {uploadSuccessful && fileUrl && (
        <div className="flex flex-col items-center space-y-2 mt-2">
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
