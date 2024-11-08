'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Button } from '@/components/extendui/button';
import { cn } from '@/lib/utils';

interface PulsatingShadowButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  glowColor?: string;
  pulseDuration?: number;
}

export const PulsatingShadowButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingShadowButtonProps
>(
  (
    {
      children,
      glowColor = '#059669',
      pulseDuration = 2.5,
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
        variants={{
          initial: {},
          animate: {},
          hover: {},
        }}
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
              transition: {
                duration: pulseDuration,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            },
            hover: {
              opacity: 0,
              scale: 1,
            },
          }}
          style={{
            backgroundColor: glowColor,
            filter: 'blur(8px)',
          }}
        />
        <Button
          variant={'default'}
          ref={ref}
          className={cn(
            'relative z-10 bg-accent-foreground shadow-none hover:bg-accent-foreground/90',
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

PulsatingShadowButton.displayName = 'PulsatingShadowButton';
