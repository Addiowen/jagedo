import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FaCheck, FaRedo, FaTimes, FaCloudUploadAlt, FaEdit, FaSave } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'success' | 'failed';
  url?: string;
  editedName: string;
  extension: string;
  isEditing: boolean;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const id: string | null = session?.user?.userId || null;
    setUserId(id);
  }, [session]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithProgress = acceptedFiles.map((file) => {
      const fileNameParts = file.name.split('.');
      const extension = fileNameParts.length > 1 ? fileNameParts.pop() : '';
      const baseName = fileNameParts.join('.');

      return {
        file,
        progress: 0,
        status: 'pending' as const,
        editedName: baseName,
        extension: extension ? `.${extension}` : '',
        isEditing: false,
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...filesWithProgress]);
  }, []);

  const handleEditName = (index: number, newName: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((f, i) =>
        i === index ? { ...f, editedName: newName } : f
      )
    );
  };

  const toggleEditMode = (index: number) => {
    setFiles((prevFiles) =>
      prevFiles.map((f, i) =>
        i === index ? { ...f, isEditing: !f.isEditing } : f
      )
    );
  };

  const saveEditedName = (index: number) => {
    setFiles((prevFiles) =>
      prevFiles.map((f, i) =>
        i === index ? { ...f, isEditing: false } : f
      )
    );
  };

  const uploadFile = async (fileWithProgress: FileWithProgress) => {
    try {
      if (!userId) {
        console.error('User ID not found in session storage.');
        return;
      }

      const formData = new FormData();
      formData.append('file', fileWithProgress.file, fileWithProgress.editedName + fileWithProgress.extension);
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

      // Store URLs in session storage
      const existingUrls = JSON.parse(sessionStorage.getItem('uploadedUrls') || '[]') as string[];
      existingUrls.push(url);
      sessionStorage.setItem('uploadedUrls', JSON.stringify(existingUrls));

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

      <div className="mt-4 space-y-4">
        {files.map(({ file, progress, status, url, editedName, extension, isEditing }, index) => (
          <div key={file.name} className="rounded-lg border border-gray-300 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => handleEditName(index, e.target.value)}
                    className="border p-1 mr-1"
                  />
                ) : (
                  <span className="font-medium text-gray-800">{editedName}</span>
                )}
                <span className="text-gray-500">{extension}</span>
              </div>
              <div className="flex items-center">
                {status === 'success' ? (
                  <FaCheck className="text-green-500" />
                ) : status === 'failed' ? (
                  <FaRedo />
                ) : (
                  <>
                    {isEditing ? (
                      <FaSave
                        onClick={() => saveEditedName(index)}
                        className="text-blue-500 cursor-pointer hover:text-blue-700 mx-2"
                      />
                    ) : (
                      <FaEdit
                        onClick={() => toggleEditMode(index)}
                        className="text-gray-500 cursor-pointer hover:text-gray-700 mx-2"
                      />
                    )}
                    <FaTimes
                      onClick={() =>
                        setFiles((prevFiles) =>
                          prevFiles.filter((f) => f.file !== file)
                        )
                      }
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            {status === 'success' && url && (
              <div className="mb-2">
                <a href={url} className="text-blue-500" download>
                  Download
                </a>
              </div>
            )}

            {status === 'failed' && (
              <div className="text-red-500">Upload failed</div>
            )}

            <div className="h-2 bg-gray-200">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={startUpload}
            className="mt-4 rounded-lg bg-blue-500 py-2 px-4 text-white"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
