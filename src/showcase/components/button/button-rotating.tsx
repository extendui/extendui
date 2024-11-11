'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';

const ROTATION_RANGE = 15;

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export const RotatingButton: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-50, 50], [ROTATION_RANGE, -ROTATION_RANGE]);
  const controls = useAnimation();

  const handleMove = (
    clientX: number,
    currentTarget: HTMLElement,
  ) => {
    const rect = currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    x.set(clientX - centerX);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    handleMove(event.clientX, event.currentTarget);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleMove(touch.clientX, event.currentTarget);
  };

  const handleLeave = () => {
    controls.start({ rotate: 0 });
  };

  return (
    <motion.div
      style={{
        display: 'inline-block',
      }}
      className='touch-none'
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{ rotate }}
        animate={controls}
        transition={springTransition}
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    </motion.div>
  );
});

RotatingButton.displayName = 'RotatingButton';

