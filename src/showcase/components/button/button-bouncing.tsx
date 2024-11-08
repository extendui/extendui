import { motion } from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';

export const BouncingButton: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => {
  return (
    <motion.div
      whileHover={{ y: -10 }} // Button moves up (bounces) on hover
      whileTap={{ y: 0, scale: 0.95 }} // Button resets position and shrinks on tap/click
      transition={{ type: 'spring', stiffness: 300, damping: 8 }} // A bouncier transition effect
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  );
});

BouncingButton.displayName = 'BouncingButton';
