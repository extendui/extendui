'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button/button';

export const RotatingButton: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-50, 50], [-15, 15]);
  const controls = useAnimation();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    x.set(event.clientX - centerX);
  };

  const handleMouseLeave = () => {
    controls.start({ rotate: 0 });
  };

  return (
    <motion.div
      style={{
        display: 'inline-block',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotate }}
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    </motion.div>
  );
});

RotatingButton.displayName = 'RotatingButton';
