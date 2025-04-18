'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';

type Rotating3DButtonProps = ButtonProps & {
  springTransition?: {
    type: string;
    stiffness: number;
    damping: number;
  };
  rotationRange?: number;
};

const ROTATION_RANGE = 20;

const springTransitionDefault = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export const Rotating3DButton = React.forwardRef<
  HTMLButtonElement,
  Rotating3DButtonProps
>(
  (
    {
      children,
      springTransition = springTransitionDefault,
      rotationRange = ROTATION_RANGE,
      ...props
    },
    ref,
  ) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [rotationRange, -rotationRange]);
    const rotateY = useTransform(x, [-50, 50], [-rotationRange, rotationRange]);

    const handleMove = (
      clientX: number,
      clientY: number,
      currentTarget: HTMLElement,
    ) => {
      const rect = currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(clientX - centerX);
      y.set(clientY - centerY);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      handleMove(event.clientX, event.clientY, event.currentTarget);
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY, event.currentTarget);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        style={{
          perspective: 400,
          display: 'inline-block',
        }}
        className="touch-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        onMouseLeave={handleLeave}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
          }}
          transition={springTransition}
        >
          <Button ref={ref} {...props}>
            {children}
          </Button>
        </motion.div>
      </motion.div>
    );
  },
);

Rotating3DButton.displayName = 'Rotating3DButton';
