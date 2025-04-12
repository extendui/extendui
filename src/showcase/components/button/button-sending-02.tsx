import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader, SendHorizonal, X } from 'lucide-react';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';
import { cn } from '@/lib/utils';

const useStatus = ({ resloveTo }: { resloveTo: 'success' | 'error' }) => {
  const [status, setStatus] = React.useState('idle');
  const onSubmit = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus(resloveTo);
    }, 2000);
  };

  return {
    onSubmit,
    status,
  };
};

export const SendingButton02: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, className, ...props }, ref) => {
  const { status, onSubmit } = useStatus({ resloveTo: 'error' });
  return (
    <Button
      ref={ref}
      disabled={status == 'loading'}
      onClick={onSubmit}
      {...props}
      variant={status === 'error' ? 'destructive' : 'default'}
      className={cn('w-32', className)}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.span
            key={crypto.randomUUID()}
            exit={{
              opacity: 0,
              y: -15,
              transition: { duration: 0.3, type: 'spring' },
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {children}
            <SendHorizonal className="ml-2 h-4 w-4" />
          </motion.span>
        )}
        {status === 'loading' && (
          <motion.span
            key={crypto.randomUUID()}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 100, y: 0, transition: { delay: 0 } }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
          >
            <Loader className="animate-spin" size="19" />
          </motion.span>
        )}
        {['success', 'error'].includes(status) && (
          <motion.span
            key={crypto.randomUUID()}
            initial={{ opacity: 0, y: 15, scale: 0 }}
            animate={{
              opacity: 100,
              y: 0,
              scale: 1,
              transition: { delay: 0.1, duration: 0.4 },
            }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
          >
            {status === 'success' && <Check size="20" />}
            {status === 'error' && <X size="20" />}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
});

SendingButton02.displayName = 'SendingButton02';
