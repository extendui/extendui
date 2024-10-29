'use client';

import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { cn } from '@/lib/utils';

import { CodeBlockWrapper } from './code-block-wrapper';
import { CopyButton } from './copy-button';

interface CodeResponse {
  code: string;
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  children?: React.ReactNode;
};

const fetchCode = async (src: string): Promise<CodeResponse> => {
  const response = await fetch(`/api/code?filename=${src}`);
  if (!response.ok) throw new Error('File not found');
  return response.json();
};

export function ComponentSource({ src, children, className, ...props }: Props) {
  const { data } = useQuery({
    queryKey: ['code', src],
    queryFn: () => fetchCode(src!),
    enabled: !!src,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const content = data?.code || (children as string) || '';

  return (
    <div className="relative w-full max-w-full overflow-auto">
      <CopyButton
        src={src}
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
