import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import axios from 'axios';
import {
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
  FaSave,
  FaUpload,
} from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useUrls } from '@/app/context/urlsContext';
import { Button } from 'rizzui';

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'success' | 'failed';
  url?: string;
  editedName: string;
  extension: string;
  isNameValid: boolean;
}

const AdminFileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { urls, addUrl } = useUrls();
  const { data: session } = useSession();

  useEffect(() => {
    const id: string | null = session?.user?.userId || null;
    setUserId(id);
  }, [session]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const maxSize = 10 * 1024 * 1024; // 10 MB

      // Handle file rejections due to size
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            toast.error(`File ${file.name} exceeds the maximum size of 10 MB.`);
          } else {
            toast.error(`Error for ${file.name}: ${error.message}`);
          }
        });
      });

      // Only accept valid files under 10MB
      const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);

      const filesWithProgress = validFiles.map((file) => {
        const fileNameParts = file.name.split('.');
        const extension = fileNameParts.length > 1 ? fileNameParts.pop() : '';
        const baseName = '';

        return {
          file,
          progress: 0,
          status: 'pending' as const,
          editedName: baseName,
          extension: extension ? `.${extension}` : '',
          isNameValid: false,
        };
      });
      setFiles((prevFiles) => [...prevFiles, ...filesWithProgress]);
    },
    []
  );

  const handleEditName = (index: number, newName: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((f, i) =>
        i === index
          ? {
              ...f,
              editedName: newName,
              isNameValid: newName.trim().length > 0,
            }
          : f
      )
    );
  };

  const uploadFile = async (fileWithProgress: FileWithProgress) => {
    try {
      if (!userId) {
        console.error('User ID not found in session storage.');
        toast.error('User ID not found.');
        return;
      }

      const formData = new FormData();
      formData.append(
        'file',
        fileWithProgress.file,
        fileWithProgress.editedName + fileWithProgress.extension
      );
      formData.append('userId', userId);

      const response = await axios.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file === fileWithProgress.file ? { ...f, progress } : f
              )
            );
          }
        },
      });

      const url = response.data.url;

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === fileWithProgress.file
            ? { ...f, progress: 100, status: 'success', url }
            : f
        )
      );

      const adminUploadedUrls = urls.concat([url]);
      addUrl(adminUploadedUrls);
      sessionStorage.setItem(
        'adminUploadedUrls',
        JSON.stringify(adminUploadedUrls)
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file.');
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === fileWithProgress.file ? { ...f, status: 'failed' } : f
        )
      );
    }
  };

  const startUpload = (index: number) => {
    const file = files[index];
    if (file.isNameValid) {
      uploadFile(file);
    } else {
      toast.error('Please provide a valid name for each file.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  return (
    <div className="mx-auto rounded-lg border border-gray-300 bg-gray-100 p-4">
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border-2 border-dashed border-blue-500 bg-white p-8 text-center"
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto mb-2 text-4xl text-blue-500" />
        <p className="mb-2 text-gray-600">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500">Maximum file size 10 MB.</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <table className="w-full table-auto border-collapse border border-gray-400 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">
                  File Name (required)
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Upload Status
                </th>
                <th className="border border-gray-300 px-4 py-2">Progress</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map(
                (
                  {
                    file,
                    progress,
                    status,
                    editedName,
                    extension,
                    isNameValid,
                  },
                  index
                ) => (
                  <tr key={file.name}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) =>
                            handleEditName(index, e.target.value)
                          }
                          placeholder="Enter file name"
                          className={`mr-2 w-full rounded-lg border p-1 ${
                            !isNameValid && status !== 'success'
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } ${status === 'success' ? 'cursor-not-allowed bg-gray-200' : 'focus:border-blue-300 focus:outline-none focus:ring'}`}
                          readOnly={status === 'success'}
                        />
                        <span>{extension}</span>
                        {isNameValid && (
                          <FaSave
                            className={`ml-2 cursor-pointer ${
                              status === 'success'
                                ? 'text-gray-400'
                                : 'text-green-500'
                            }`}
                            title="Save"
                          />
                        )}
                      </div>
                      {!isNameValid && status !== 'success' && (
                        <p className="mt-1 text-sm text-red-500">
                          Name is required
                        </p>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {status === 'success' ? (
                        <FaCheck className="text-green-500" />
                      ) : status === 'failed' ? (
                        'Failed'
                      ) : (
                        'Pending'
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="h-2 bg-gray-200">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="flex items-center border px-4 py-2">
                      <Button
                        onClick={() => startUpload(index)}
                        disabled={!isNameValid || status === 'success'}
                        className={`flex items-center rounded-lg px-4 py-2 text-white ${
                          isNameValid && status !== 'success'
                            ? 'bg-blue-500'
                            : 'cursor-not-allowed bg-gray-300'
                        }`}
                      >
                        <FaUpload className="mr-2" />
                        Upload
                      </Button>
                      <Button
                        onClick={() =>
                          setFiles((prevFiles) =>
                            prevFiles.filter((_, i) => i !== index)
                          )
                        }
                        disabled={status === 'success'}
                        className={`ml-2 flex items-center rounded-lg px-4 py-2 text-white ${
                          status === 'success'
                            ? 'cursor-not-allowed bg-gray-300'
                            : 'bg-red-500'
                        }`}
                      >
                        <FaTimes className="mr-2" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFileUpload;
