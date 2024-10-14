'use client';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Code, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ComponentSource } from './component-source';

type Props = {
  component: React.ReactNode;
  settingsEngine: React.ReactNode;
  filename: string;
};

export default function Preview({
  component,
  settingsEngine,
  filename,
}: Props) {
  return (
    <div className="mx-auto">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className={cn('flex items-center justify-end bg-inherit')}>
          <TabsTrigger
            value="preview"
            className={cn(
              'data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-100 data-[state=active]:shadow dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900',
            )}
          >
            <Eye size={16} />
            <span className="ml-1">Preview</span>
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className={cn(
              'data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-100 data-[state=active]:shadow dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900',
            )}
          >
            <Code size={16} />
            <span className="ml-1">Code</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="preview"
          className="relative w-full content-center rounded-lg py-4 shadow-[inset_0_0_2px_rgba(0,0,0,0.1)] shadow-slate-300"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex items-center justify-center p-4">
              {component}
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              {settingsEngine}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="rounded-lg">
          <div className="relative mx-auto w-full max-w-full overflow-auto">
            <ComponentSource src={filename} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
