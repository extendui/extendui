import { motion } from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';

const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 12,
};

export const ScalingButton: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={springTransition}
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  );
});

ScalingButton.displayName = 'ScalingButton';
