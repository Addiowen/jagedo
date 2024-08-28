import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FaCheck, FaRedo, FaTimes, FaCloudUploadAlt } from 'react-icons/fa';

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'success' | 'failed';
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithProgress = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      status: 'pending' as const,
    }));
    setFiles((prevFiles) => [...prevFiles, ...filesWithProgress]);
  }, []);

  const uploadFile = async (fileWithProgress: FileWithProgress) => {
    try {
      const formData = new FormData();
      formData.append('file', fileWithProgress.file);

      await axios.post('/api/upload-image', formData, {
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

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === fileWithProgress.file
            ? { ...f, progress: 100, status: 'success' }
            : f
        )
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === fileWithProgress.file ? { ...f, status: 'failed' } : f
        )
      );
    }
  };

  const startUpload = () => {
    files.forEach(uploadFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024,
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

      <div className="mt-4 space-y-4">
        {files.map(({ file, progress, status }) => (
          <div
            key={file.name}
            className="rounded-lg border border-gray-300 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800">{file.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              <button
                onClick={() =>
                  status === 'pending'
                    ? setFiles((prevFiles) =>
                        prevFiles.filter((f) => f.file !== file)
                      )
                    : null
                }
                className="text-red-500 hover:text-red-700"
              >
                {status === 'success' ? (
                  <FaCheck className="text-green-500" />
                ) : status === 'failed' ? (
                  <FaRedo />
                ) : (
                  <FaTimes />
                )}
              </button>
            </div>
            <div className="relative h-2 w-full rounded bg-gray-200">
              <div
                className="absolute left-0 top-0 h-2 rounded bg-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={startUpload}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
