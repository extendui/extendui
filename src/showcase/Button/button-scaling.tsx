import * as React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';

export const ScalingButton: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}  // Button scales up slightly on hover
        whileTap={{ scale: 0.9 }}    // Button shrinks slightly on tap/click
        transition={{ type: 'spring', stiffness: 400, damping: 12 }} // Spring transition for smoothness
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

ScalingButton.displayName = 'ScalingButton';


