'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Button } from './ui/button';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  expandButtonTitle?: string;
  disabled?: boolean;
}

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
        <CollapsibleContent
          forceMount
          className={cn('overflow-hidden', !isOpened && 'max-h-72')}
        >
          <div
            className={cn(
              '[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]',
              !isOpened ? '[&_pre]:overflow-hidden' : '[&_pre]:overflow-auto]',
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            'absolute flex items-center justify-center  p-2',
            isOpened ? 'inset-x-0 bottom-0' : 'inset-0 bg-black/40',
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="secondary" className="mb-8 h-8 text-xs" disabled={disabled}>
              {isOpened ? 'Collapse' : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
