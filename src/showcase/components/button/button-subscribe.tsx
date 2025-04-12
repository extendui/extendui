import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';
import { cn } from '@/lib/utils';

type StatusState = {
  status: 'subscribe' | 'subscribed';
  onSubscribe: () => void;
  onUnsubscribe: () => void;
};

const useStatus = (initialStatus: 'subscribe' | 'subscribed'): StatusState => {
  const [status, setStatus] = React.useState(initialStatus);

  const onSubscribe = () => {
    setStatus('subscribed');
  };

  const onUnsubscribe = () => {
    setStatus('subscribe');
  };

  return { status, onSubscribe, onUnsubscribe };
};

export const SubscribeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { status, onSubscribe, onUnsubscribe } = useStatus('subscribe');
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <Button
        ref={ref}
        onClick={status === 'subscribe' ? onSubscribe : onUnsubscribe}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
        variant={status === 'subscribe' ? 'outline' : 'default'}
        className={cn('w-32', className)}
      >
        <AnimatePresence mode="wait">
          {status === 'subscribed' && (
            <motion.span
              key={status}
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              Subscribed
              <Check className="ml-2 size-4" />
            </motion.span>
          )}
          {status === 'subscribe' && (
            <motion.span
              key={status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              Subscribe
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="ml-1 size-4" />
              </motion.div>
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    );
  },
);

SubscribeButton.displayName = 'SubscribeButton';
