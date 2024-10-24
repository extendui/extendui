export function getButton3DRotatingCode() {
  return `
'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';

export const Rotating3DButton: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    x.set(event.clientX - centerX);
  };

  const handleMouseLeave = () => {
    x.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 400,
        display: 'inline-block',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    </motion.div>
  );
});

Rotating3DButton.displayName = 'RotatingButton';
`
}