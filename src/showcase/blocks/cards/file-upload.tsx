'use client'

import React, { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Upload, AlertCircle, File, Trash2, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
    const types: Record<FileType, { icon: JSX.Element; color: string }> = {
      'application/pdf': {
        icon: <span className="text-sm font-bold text-red-600">PDF</span>,
        color: 'bg-red-50'
      },
      'image/jpeg': {
        icon: <span className="text-sm font-bold text-blue-600">JPG</span>,
        color: 'bg-blue-50'
      },
      'image/png': {
        icon: <span className="text-sm font-bold text-green-600">PNG</span>,
        color: 'bg-green-50'
      },
      'default': {
        icon: <File className="w-5 h-5 text-gray-600" />,
        color: 'bg-gray-50'
      }
    }
    return types[fileType as FileType] || types.default
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
    const totalSteps = 10
    const timePerStep = 300

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

    simulateUpload(file)
  }

  const handleDeleteFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    onDelete(uploadedFiles.find(f => f.id === fileId) as unknown as File)
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
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Upload Files</CardTitle>
        </CardHeader>
        <CardContent className='w-full mx-auto'>
          <div
            className={`relative border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'
              } rounded-lg p-6 transition-colors duration-200 ease-in-out hover:border-gray-400`}
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
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className="mx-auto"
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
                  <p className="mt-2 text-sm text-gray-600">
                    or drop files here
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {acceptedFileTypes.join(', ')} up to {maxSizeInMB}MB
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                className="w-full rounded-lg bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded ${getFileTypeDetails(currentUpload.file.type as FileType).color}`}>
                      {getFileTypeDetails(currentUpload.file.type as FileType).icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium truncate mx-auto">{currentUpload.file.name}</h3>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(currentUpload.file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-blue-600 font-medium">{Math.round(progress)}%</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
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
                  <AlertDescription>{error}</AlertDescription>
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent className='w-full mx-auto'>
                <div className="grid gap-2">
                  {uploadedFiles.map((file) => (
                    <div className='w-full' key={file.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50"
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded ${getFileTypeDetails(file.type as FileType).color}`}>
                          {getFileTypeDetails(file.type as FileType).icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium truncate mx-auto">{file.name}</h3>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
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
  )
}
