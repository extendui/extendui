'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Uploading...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setStatus('Uploaded');
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-full max-w-md rounded-lg bg-white p-4 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-red-100">
              <span className="text-sm font-bold text-red-600">PDF</span>
            </div>
            <div>
              <h3 className="text-sm font-medium">my-cv.pdf</h3>
              <p className="text-xs text-gray-500">
                {Math.round((progress / 100) * 120)} KB of 120 KB
                <AnimatePresence mode="wait">
                  {status === 'Uploading...' ? (
                    <motion.span
                      key="uploading"
                      className="ml-2 flex items-center text-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span
                        className="inline-block"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        ◌
                      </motion.span>
                      <span className="ml-1">Uploading...</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="uploaded"
                      className="ml-2 flex items-center text-green-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      <span>Uploaded</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <motion.div
          className="mt-3 h-1 overflow-hidden rounded-full bg-gray-200"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
