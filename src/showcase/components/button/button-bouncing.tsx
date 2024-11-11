import { motion } from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 8,
};

export const BouncingButton: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ y: 0, scale: 0.95 }}
      transition={springTransition}
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  );
});

BouncingButton.displayName = 'BouncingButton';
