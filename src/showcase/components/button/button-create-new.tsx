'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import {
  Folder,
  ClipboardList,
  FileText,
  Trophy,
  Flag,
  Bell,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Folder, label: 'Project' },
  { icon: ClipboardList, label: 'Task' },
  { icon: FileText, label: 'Note' },
  { icon: Trophy, label: 'Goal' },
  { icon: Flag, label: 'Milestone' },
  { icon: Bell, label: 'Reminder' },
];

export default function CreateNewButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const menuVariants = {
    hidden: (custom: { width: number; height: number }) => ({
      width: custom.width,
      height: custom.height,
      opacity: 0,
    }),
    visible: {
      width: 320,
      height: 'auto',
      opacity: 1,
    },
  };

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="button"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.1 }}
          >
            <Button
              ref={buttonRef}
              variant="outline"
              onClick={() => setIsOpen(true)}
              className="bg-white text-base font-medium transition-colors duration-200 ease-in-out hover:bg-gray-50"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <Plus className="mr-1 h-5 w-5" />
              Create New
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={{
              width: buttonRef.current?.offsetWidth || 0,
              height: buttonRef.current?.offsetHeight || 0,
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute z-50 overflow-hidden rounded-lg bg-white shadow-lg"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
              <h2 className="mb-4 px-2 text-lg font-medium text-gray-800">
                Create New
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="grid grid-cols-3 gap-4"
              >
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center rounded-lg p-4 transition-colors"
                    onClick={() => {
                      console.log(`Clicked ${item.label}`);
                      setIsOpen(false);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.1 }}
                  >
                    <item.icon className="mb-2 h-6 w-6 text-gray-600" />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
