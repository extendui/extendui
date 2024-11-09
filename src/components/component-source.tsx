'use client';

import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { cn } from '@/lib/utils';

import { CodeBlockWrapper } from './code-block-wrapper';
import { CopyButton } from './copy-button';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export function ComponentSource({ children, className, ...props }: Props) {
  const content = (children as string) || '';

  return (
    <div className="relative w-full max-w-full overflow-auto">
      <CopyButton
        value={content}
        className={cn('absolute right-4 top-4 z-10')}
      />
      <CodeBlockWrapper
        expandButtonTitle="Expand"
        className={cn('overflow-hidden rounded-md', className)}
        disabled={!content}
        {...props}
      >
        <div className="max-w-full overflow-auto">
          <SyntaxHighlighter
            language="typescript"
            style={nightOwl}
            customStyle={{
              margin: 0,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
              minHeight: '18rem',
            }}
            wrapLines={true}
            wrapLongLines={true}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      </CodeBlockWrapper>
    </div>
  );
}
