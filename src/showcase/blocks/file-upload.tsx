'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, File, Trash2, ImageIcon } from 'lucide-react';
import React, { useState, useCallback, useRef, type JSX } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FileUploadProps = {
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
  onUploadComplete?: (file: File) => void;
  onUploadError?: (error: string) => void;
  onDelete?: (file: File) => void;
  multiple?: boolean;
};

type FileType = 'application/pdf' | 'image/jpeg' | 'image/png' | 'default';

type UploadedFile = {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
};

const fileTypeDetails: Record<
  FileType,
  { icon: JSX.Element; color: string; darkColor: string }
> = {
  'application/pdf': {
    icon: <File className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800',
  },
  'image/jpeg': {
    icon: <ImageIcon className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800',
  },
  'image/png': {
    icon: <ImageIcon className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800',
  },
  default: {
    icon: <File className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800',
  },
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default function FileUpload({
  maxSizeInMB = 5,
  acceptedFileTypes = ['application/pdf'],
  onUploadComplete = () => {
    toast.success('File uploaded successfully!');
  },
  onUploadError = (text: string) => {
    toast.error(text);
  },
  onDelete = () => {
    toast.success('File deleted successfully!');
  },
  multiple = false,
}: FileUploadProps) {
  const [currentUpload, setCurrentUpload] = useState<{
    id: number;
    file: File;
    status: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTimeout = useRef<NodeJS.Timeout | null>(null);

  const getFileTypeDetails = (fileType: string) =>
    fileTypeDetails[fileType as FileType] || fileTypeDetails.default;

  const isFileDuplicate = useCallback(
    (file: File) => {
      return uploadedFiles.some(
        (uploadedFile) =>
          uploadedFile.name === file.name &&
          uploadedFile.size === file.size &&
          uploadedFile.type === file.type,
      );
    },
    [uploadedFiles],
  );

  const simulateUpload = useCallback(
    (file: File) => {
      if (uploadTimeout.current) {
        clearTimeout(uploadTimeout.current);
      }

      setProgress(0);
      setCurrentUpload({
        id: Date.now(),
        file,
        status: 'uploading',
      });

      let currentProgress = 0;
      const totalSteps = 100;
      const timePerStep = 30;

      const incrementProgress = () => {
        currentProgress++;
        const newProgress = (currentProgress / totalSteps) * 100;

        setProgress((prevProgress) => {
          return Math.max(prevProgress + 1, newProgress);
        });

        if (currentProgress < totalSteps) {
          uploadTimeout.current = setTimeout(incrementProgress, timePerStep);
        } else {
          const uploadedFile = {
            id: Date.now(),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
          };

          setUploadedFiles((prev) => [...prev, uploadedFile]);
          setCurrentUpload(null);
          setProgress(0);
          onUploadComplete(file);

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };

      uploadTimeout.current = setTimeout(incrementProgress, timePerStep);
    },
    [onUploadComplete],
  );

  const handleDragEvents = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const filesToUpload = multiple ? Array.from(files) : [files[0]];

      filesToUpload.forEach((file) => {
        if (!acceptedFileTypes.includes(file.type)) {
          onUploadError(
            `Invalid file type. Please upload: ${acceptedFileTypes.join(', ')}`,
          );
          return;
        }

        if (file.size > maxSizeInMB * 1024 * 1024) {
          onUploadError(`File size must be less than ${maxSizeInMB}MB`);
          return;
        }

        if (isFileDuplicate(file)) {
          onUploadError(
            `File "${file.name}" has already been uploaded. Please choose a different file.`,
          );
          return;
        }

        simulateUpload(file);
      });
    },
    [
      acceptedFileTypes,
      maxSizeInMB,
      isFileDuplicate,
      simulateUpload,
      onUploadError,
      multiple,
    ],
  );

  const handleDeleteFile = useCallback(
    (fileId: number) => {
      const fileToDelete = uploadedFiles.find((f) => f.id === fileId);
      if (fileToDelete) {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
        onDelete(fileToDelete as unknown as File);
      }
    },
    [uploadedFiles, onDelete],
  );

  const handleCancel = useCallback(() => {
    if (uploadTimeout.current) {
      clearTimeout(uploadTimeout.current);
    }
    setCurrentUpload(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const renderUploadArea = () => (
    <div className="text-center">
      <Upload className="text-muted-foreground mx-auto h-8 w-8 sm:h-12 sm:w-12" />
      <div className="mt-4">
        <Button
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          className="mx-auto text-xs sm:text-sm"
        >
          Select File
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFileTypes.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
          multiple={multiple}
        />
        <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
          or drop file{multiple ? 's' : ''} here
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          {acceptedFileTypes.join(', ')} up to {maxSizeInMB}MB
        </p>
      </div>
    </div>
  );

  const renderUploadProgress = () => (
    <motion.div
      className="w-full rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-muted flex items-center justify-between overflow-hidden rounded-lg p-2 sm:p-3">
        <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3">
          <div
            className={`bg-background flex size-6 shrink-0 items-center justify-center rounded p-1 sm:size-8 sm:p-2`}
          >
            {getFileTypeDetails(currentUpload!.file.type).icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs font-medium sm:text-sm">
              {currentUpload!.file.name}
            </h3>
            <p className="text-muted-foreground truncate text-xs">
              {formatFileSize(currentUpload!.file.size)}
            </p>
          </div>
        </div>
        <div className="ml-2 flex shrink-0 items-center space-x-2">
          <div className="w-12 text-right text-xs font-medium whitespace-nowrap">
            {Math.round(progress)}%
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
      <div className="bg-secondary mt-2 h-1 w-full overflow-hidden rounded-full">
        <motion.div
          className="bg-primary h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );

  const renderUploadedFiles = () => (
    <AnimatePresence mode="popLayout">
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold sm:text-lg">
                Uploaded Files
              </CardTitle>
              <span className="text-muted-foreground text-xs sm:text-sm">
                {uploadedFiles.length}{' '}
                {uploadedFiles.length === 1 ? 'file' : 'files'}
              </span>
            </CardHeader>
            <CardContent className="w-full">
              <div className="mx-auto flex flex-col space-y-2 overflow-hidden">
                {uploadedFiles.map((file) => (
                  <div className="w-full" key={file.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-muted flex items-center space-x-2 rounded-lg p-2"
                    >
                      <div
                        className={`bg-background flex size-6 shrink-0 items-center justify-center rounded p-1 sm:size-8 sm:p-2`}
                      >
                        {getFileTypeDetails(file.type).icon}
                      </div>
                      <div className="max-w-[calc(100%-3rem)] min-w-0 flex-1">
                        <h3 className="truncate text-xs font-medium sm:text-sm">
                          {file.name}
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </motion.div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="mx-auto w-full max-w-md space-y-4 px-4 sm:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold sm:text-lg">
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent className="mx-auto w-full">
          <div
            className={`relative border-2 ${
              isDragging
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/50 border-dashed'
            } hover:border-muted-foreground rounded-lg p-4 transition-colors duration-200 ease-in-out sm:p-6`}
            onDragEnter={handleDragEvents}
            onDragLeave={handleDragEvents}
            onDragOver={handleDragEvents}
            onDrop={(e) => {
              handleDragEvents(e);
              handleFiles(e.dataTransfer.files);
            }}
          >
            {!currentUpload ? renderUploadArea() : renderUploadProgress()}
          </div>
        </CardContent>
      </Card>
      {renderUploadedFiles()}
    </div>
  );
}
