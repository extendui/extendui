'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  expandButtonTitle?: string;
  disabled?: boolean;
};

export function CodeBlockWrapper({
  expandButtonTitle = 'View Code',
  disabled = false,
  className,
  children,
  ...props
}: Props) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn('relative overflow-hidden', className)} {...props}>
        <AnimatePresence initial={false}>
          <motion.div
            key="content"
            initial="collapsed"
            animate={isOpened ? 'expanded' : 'collapsed'}
            exit="collapsed"
            variants={{
              expanded: { height: 'auto', opacity: 1 },
              collapsed: { height: '288px', opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CollapsibleContent forceMount className="overflow-hidden">
              <div
                className={cn(
                  '[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]',
                  !isOpened
                    ? '[&_pre]:overflow-hidden'
                    : '[&_pre]:overflow-auto]',
                )}
              >
                {children}
              </div>
            </CollapsibleContent>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40"
            />
          )}
        </AnimatePresence>
        <div
          className={cn(
            'absolute flex items-center justify-center p-2',
            isOpened ? 'inset-x-0 bottom-0' : 'inset-0',
          )}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="secondary"
              className="h-8 text-xs"
              disabled={disabled}
            >
              {isOpened ? 'Collapse' : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
