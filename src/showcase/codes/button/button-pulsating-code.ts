export function getButtonPulsatingCode() {
  return `'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';
import { cn } from '@/lib/utils';

type PulsatingShadowButtonProps = ButtonProps & {
  glowColor?: string;
  transition?: {
    type: string;
    stiffness: number;
    damping: number;
  };
  filter?: string;
}

const transitionDefault = {
  duration: 2.5,
  repeat: Infinity,
  ease: 'easeInOut',
};

export const PulsatingShadowButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingShadowButtonProps
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
        className={\`relative inline-block \${className}\`}
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

PulsatingShadowButton.displayName = 'PulsatingShadowButton';`;
}
