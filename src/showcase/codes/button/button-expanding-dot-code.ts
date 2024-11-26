export function getButtonExpandingDotCode() {
    return `'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as React from 'react';

import { type ButtonProps } from '@/components/extendui/button';

export const ExpandingDotButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children }, ref) => {
  return (
    <motion.button
      ref={ref}
      className="group relative flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-black hover:text-white"
      whileHover="hover"
      initial="default"
    >
      <motion.div
        className="relative flex h-6 w-6 items-center justify-center"
        variants={{
          default: { width: 24 },
          hover: { width: 28 },
        }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={{
            default: { scale: 1 },
            hover: {
              scale: 1.2,
              backgroundColor: 'white',
              borderRadius: '9999px',
            },
          }}
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-gray-800 group-hover:bg-white"
            variants={{
              default: { scale: 1 },
              hover: { scale: 1 },
            }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-gray-800"
          variants={{
            default: { opacity: 0, scale: 0.5 },
            hover: { opacity: 1, scale: 1 },
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      {children}
    </motion.button>
  );
});
ExpandingDotButton.displayName = 'ExpandingDotButton';`
}