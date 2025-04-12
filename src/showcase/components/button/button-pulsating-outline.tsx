'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';
import { cn } from '@/lib/utils';

type PulsatingOutlineShadowButtonProps = ButtonProps & {
  glowColor?: string;
  transition?: {
    type: string;
    stiffness: number;
    damping: number;
  };
  filter?: string;
};

const transitionDefault = {
  duration: 2.5,
  repeat: Infinity,
  ease: 'easeInOut',
};

export const PulsatingOutlineShadowButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingOutlineShadowButtonProps
>(
  (
    {
      children,
      glowColor = '#059669',
      transition = transitionDefault,
      filter = 'blur(4px)',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        className={`relative inline-block ${className}`}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="absolute inset-0 rounded-md"
          variants={{
            initial: {
              opacity: 0,
              scale: 1,
            },
            animate: {
              opacity: [0, 1, 0],
              scale: [1, 1.05, 1],
              transition: transition,
            },
            hover: {
              opacity: 0,
              scale: 1,
            },
          }}
          style={{
            backgroundColor: glowColor,
            filter: filter,
          }}
        />
        <Button
          variant={'outline'}
          ref={ref}
          className={cn(
            `relative z-10 shadow-none border-[${glowColor}]/40 border-2 hover:bg-[${glowColor}]/40`,
            className,
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  },
);

PulsatingOutlineShadowButton.displayName = 'PulsatingOutlineShadowButton';
