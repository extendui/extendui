'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, AlertCircle, File, Trash2 } from 'lucide-react'
import React, { useState, useCallback, useRef } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FileUploadProps = {
  maxSizeInMB?: number
  acceptedFileTypes?: string[]
  onUploadComplete?: (file: File) => void
  onUploadError?: (error: string) => void
  onDelete?: (file: File) => void
}

type FileType = 'application/pdf' | 'image/jpeg' | 'image/png' | 'default'

type UploadedFile = {
  id: number
  name: string
  size: number
  type: string
  uploadedAt: Date
}

export default function FileUpload({
  maxSizeInMB = 5,
  acceptedFileTypes = ['application/pdf'],
  onUploadComplete = () => { console.log('File uploaded!') },
  onUploadError = () => { console.log('File upload error!') },
  onDelete = () => { console.log('File deleted!') },
}: FileUploadProps) {
  const [currentUpload, setCurrentUpload] = useState<{ id: number; file: File; status: string } | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadTimeout = useRef<NodeJS.Timeout | null>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const getFileTypeDetails = (fileType: FileType) => {
    const types: Record<FileType, { icon: JSX.Element; color: string; darkColor: string }> = {
      'application/pdf': {
        icon: <span className="text-xs sm:text-sm font-bold text-red-600 dark:text-white">PDF</span>,
        color: 'bg-red-50',
        darkColor: 'dark:bg-red-500/60'
      },
      'image/jpeg': {
        icon: <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-white">JPG</span>,
        color: 'bg-blue-50',
        darkColor: 'dark:bg-blue-900'
      },
      'image/png': {
        icon: <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-white">PNG</span>,
        color: 'bg-green-50',
        darkColor: 'dark:bg-green-900'
      },
      'default': {
        icon: <File className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-white" />,
        color: 'bg-gray-50',
        darkColor: 'dark:bg-gray-800'
      }
    }
    return types[fileType] || types.default
  }

  const isFileDuplicate = (file: File) => {
    return uploadedFiles.some(
      uploadedFile =>
        uploadedFile.name === file.name &&
        uploadedFile.size === file.size &&
        uploadedFile.type === file.type
    )
  }

  const simulateUpload = useCallback((file: File) => {
    if (uploadTimeout.current) {
      clearTimeout(uploadTimeout.current)
    }

    setProgress(0)
    setCurrentUpload({
      id: Date.now(),
      file,
      status: 'uploading'
    })

    let currentProgress = 0
    const totalSteps = 100 // For 1% increments
    const timePerStep = 30 // Adjusted for smoother animation

    const incrementProgress = () => {
      currentProgress++
      const newProgress = (currentProgress / totalSteps) * 100

      setProgress(newProgress)

      if (currentProgress < totalSteps) {
        uploadTimeout.current = setTimeout(incrementProgress, timePerStep)
      } else {
        const uploadedFile = {
          id: Date.now(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date()
        }

        setUploadedFiles(prev => [...prev, uploadedFile])
        setCurrentUpload(null)
        setProgress(0)
        onUploadComplete(file)

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }

    uploadTimeout.current = setTimeout(incrementProgress, timePerStep)
  }, [onUploadComplete])

  const handleDragEvents = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave' || e.type === 'drop') {
      setIsDragging(false)
    }
  }

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0]
    setError(null)

    if (!file) return

    if (!acceptedFileTypes.includes(file.type)) {
      setError(`Invalid file type. Please upload: ${acceptedFileTypes.join(', ')}`)
      onUploadError('invalid-type')
      return
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeInMB}MB`)
      onUploadError('invalid-size')
      return
    }

    if (isFileDuplicate(file)) {
      setError(`File "${file.name}" has already been uploaded. Please choose a different file.`)
      onUploadError('duplicate-file')
      return
    }

    simulateUpload(file)
  }

  const handleDeleteFile = (fileId: number) => {
    const fileToDelete = uploadedFiles.find(f => f.id === fileId)
    if (fileToDelete) {
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
      onDelete(fileToDelete as unknown as File)
    }
  }

  const handleCancel = () => {
    if (uploadTimeout.current) {
      clearTimeout(uploadTimeout.current)
    }
    setCurrentUpload(null)
    setProgress(0)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-4 sm:px-0">
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-semibold dark:text-white">Upload Files</CardTitle>
        </CardHeader>
        <CardContent className='w-full mx-auto'>
          <div
            className={`relative border-2 ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-dashed border-gray-300 dark:border-gray-600'
              } rounded-lg p-4 sm:p-6 transition-colors duration-200 ease-in-out hover:border-gray-400 dark:hover:border-gray-500`}
            onDragEnter={handleDragEvents}
            onDragLeave={handleDragEvents}
            onDragOver={handleDragEvents}
            onDrop={(e) => {
              handleDragEvents(e)
              handleFiles(e.dataTransfer.files)
            }}
          >
            {!currentUpload ? (
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500" />
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className="mx-auto text-xs sm:text-sm dark:bg-gray-700 dark:text-white"
                  >
                    Select File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={acceptedFileTypes.join(',')}
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    or drop files here
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {acceptedFileTypes.join(', ')} up to {maxSizeInMB}MB
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                className="w-full rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 dark:bg-blue-900 rounded-lg overflow-hidden">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className={`flex-shrink-0 flex size-6 sm:size-8 p-1 sm:p-2 items-center justify-center rounded ${getFileTypeDetails(currentUpload.file.type as FileType).color} ${getFileTypeDetails(currentUpload.file.type as FileType).darkColor}`}>
                      {getFileTypeDetails(currentUpload.file.type as FileType).icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-medium truncate dark:text-white">{currentUpload.file.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {formatFileSize(currentUpload.file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{Math.round(progress)}%</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 p-1"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 h-1 w-full bg-blue-100 dark:bg-blue-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500 dark:bg-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <AnimatePresence mode="popLayout">
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base sm:text-lg font-semibold dark:text-white">Uploaded Files</CardTitle>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'}
                </span>
              </CardHeader>
              <CardContent className='w-full'>
                <div className="flex flex-col space-y-2 mx-auto overflow-hidden">
                  {uploadedFiles.map((file) => (
                    <div className='w-full' key={file.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                      >
                        <div className={`flex-shrink-0 flex size-6 sm:size-8 p-1 sm:p-2 items-center justify-center rounded ${getFileTypeDetails(file.type as FileType).color} ${getFileTypeDetails(file.type as FileType).darkColor}`}>
                          {getFileTypeDetails(file.type as FileType).icon}
                        </div>
                        <div className="flex-1 min-w-0 max-w-[calc(100%-3rem)]">
                          <h3 className="text-xs sm:text-sm font-medium truncate dark:text-white">{file.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteFile(file.id)}
                          className="flex-shrink-0 text-red-500 hover:bg-red-500/60 hover:bg-red-50 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-500/60 p-1"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
    </div>
  );
}