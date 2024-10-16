import * as React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';

export const RotatingButton: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ rotate: 15 }}  // Button rotates slightly on hover
        whileTap={{ rotate: 0 }}     // Button resets rotation on tap/click
        transition={{ type: 'spring', stiffness: 500, damping: 10 }}  // Smooth rotation
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

RotatingButton.displayName = 'RotatingButton';

