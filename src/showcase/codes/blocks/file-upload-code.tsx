
export function getFileUploadCode() {
  return `'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, File, Trash2, ImageIcon } from 'lucide-react'
import React, { useState, useCallback, useRef, type JSX } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/extendui/button'
import { Input } from '@/components/extendui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FileUploadProps = {
  maxSizeInMB?: number
  acceptedFileTypes?: string[]
  onUploadComplete?: (file: File) => void
  onUploadError?: (error: string) => void
  onDelete?: (file: File) => void
  multiple?: boolean
}

type FileType = 'application/pdf' | 'image/jpeg' | 'image/png' | 'default'

type UploadedFile = {
  id: number
  name: string
  size: number
  type: string
  uploadedAt: Date
}

const fileTypeDetails: Record<FileType, { icon: JSX.Element; color: string; darkColor: string }> = {
  'application/pdf': {
    icon: <File className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800'
  },
  'image/jpeg': {
    icon: <ImageIcon className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800'
  },
  'image/png': {
    icon: <ImageIcon className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800'
  },
  'default': {
    icon: <File className="size-4 text-gray-600 dark:text-white" />,
    color: 'bg-gray-50',
    darkColor: 'dark:bg-gray-800'
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} \${sizes[i]}\`
}

export default function FileUpload({
  maxSizeInMB = 5,
  acceptedFileTypes = ['application/pdf'],
  onUploadComplete = () => { toast.success('File uploaded successfully!') },
  onUploadError = (text: string) => { toast.error(text) },
  onDelete = () => { toast.success('File deleted successfully!') },
  multiple = false,
}: FileUploadProps) {
  const [currentUpload, setCurrentUpload] = useState<{ id: number; file: File; status: string } | null>(null)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadTimeout = useRef<NodeJS.Timeout | null>(null)

  const getFileTypeDetails = (fileType: string) => fileTypeDetails[fileType as FileType] || fileTypeDetails.default

  const isFileDuplicate = useCallback((file: File) => {
    return uploadedFiles.some(
      uploadedFile =>
        uploadedFile.name === file.name &&
        uploadedFile.size === file.size &&
        uploadedFile.type === file.type
    )
  }, [uploadedFiles])

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
    const totalSteps = 100
    const timePerStep = 30

    const incrementProgress = () => {
      currentProgress++
      const newProgress = (currentProgress / totalSteps) * 100

      setProgress(prevProgress => {
        return Math.max(prevProgress + 1, newProgress)
      })

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

  const handleDragEvents = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return

    const filesToUpload = multiple ? Array.from(files) : [files[0]]

    filesToUpload.forEach(file => {
      if (!acceptedFileTypes.includes(file.type)) {
        onUploadError(\`Invalid file type. Please upload: \${acceptedFileTypes.join(', ')}\`)
        return
      }

      if (file.size > maxSizeInMB * 1024 * 1024) {
        onUploadError(\`File size must be less than \${maxSizeInMB}MB\`)
        return
      }

      if (isFileDuplicate(file)) {
        onUploadError(\`File "\${file.name}" has already been uploaded. Please choose a different file.\`)
        return
      }

      simulateUpload(file)
    })
  }, [acceptedFileTypes, maxSizeInMB, isFileDuplicate, simulateUpload, onUploadError, multiple])

  const handleDeleteFile = useCallback((fileId: number) => {
    const fileToDelete = uploadedFiles.find(f => f.id === fileId)
    if (fileToDelete) {
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
      onDelete(fileToDelete as unknown as File)
    }
  }, [uploadedFiles, onDelete])

  const handleCancel = useCallback(() => {
    if (uploadTimeout.current) {
      clearTimeout(uploadTimeout.current)
    }
    setCurrentUpload(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const renderUploadArea = () => (
    <div className="text-center">
      <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
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
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
          or drop file{multiple ? 's' : ''} here
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {acceptedFileTypes.join(', ')} up to {maxSizeInMB}MB
        </p>
      </div>
    </div>
  )

  const renderUploadProgress = () => (
    <motion.div
      className="w-full rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg overflow-hidden">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className={\`shrink-0 flex size-6 sm:size-8 p-1 sm:p-2 items-center justify-center rounded bg-background\`}>
            {getFileTypeDetails(currentUpload!.file.type).icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-medium truncate">{currentUpload!.file.name}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {formatFileSize(currentUpload!.file.size)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0 ml-2">
          <div className="text-xs font-medium whitespace-nowrap w-12 text-right">
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
      <div className="mt-2 h-1 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: \`\${progress}%\` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )

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
              <CardTitle className="text-base sm:text-lg font-semibold">Uploaded Files</CardTitle>
              <span className="text-xs sm:text-sm text-muted-foreground">
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
                      className="flex items-center space-x-2 p-2 rounded-lg bg-muted"
                    >
                      <div className={\`shrink-0 flex size-6 sm:size-8 p-1 sm:p-2 items-center justify-center rounded bg-background\`}>
                        {getFileTypeDetails(file.type).icon}
                      </div>
                      <div className="flex-1 min-w-0 max-w-[calc(100%-3rem)]">
                        <h3 className="text-xs sm:text-sm font-medium truncate">{file.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">
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
  )

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-4 sm:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-semibold">Upload Files</CardTitle>
        </CardHeader>
        <CardContent className='w-full mx-auto'>
          <div
            className={\`relative border-2 \${isDragging ? 'border-primary bg-primary/10' : 'border-dashed border-muted-foreground/50'
              } rounded-lg p-4 sm:p-6 transition-colors duration-200 ease-in-out hover:border-muted-foreground\`}
            onDragEnter={handleDragEvents}
            onDragLeave={handleDragEvents}
            onDragOver={handleDragEvents}
            onDrop={(e) => {
              handleDragEvents(e)
              handleFiles(e.dataTransfer.files)
            }}
          >
            {!currentUpload ? renderUploadArea() : renderUploadProgress()}
          </div>
        </CardContent>
      </Card>
      {renderUploadedFiles()}
    </div>
  )
}`
}
