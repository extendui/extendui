'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CodeBlockWrapper } from './code-block-wrapper';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  children?: React.ReactNode;
};

export function ComponentSource({ src, children, className, ...props }: Props) {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      const fetchCode = async () => {
        try {
          const response = await fetch(`/api/code?filename=${src}`);
          if (!response.ok) throw new Error('File not found');
          const data = await response.json();
          setCode(data.code);
        } catch (error) {
          console.error(error);
          setCode('Error loading code');
        }
      };

      fetchCode();
    }
  }, [src]);

  const content = code || (children as string) || '';

  return (
    <div className="relative w-full max-w-full overflow-auto">
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
