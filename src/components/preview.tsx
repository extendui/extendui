'use client';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Code, Eye, Loader2, RotateCcw } from 'lucide-react';
import { ComponentSource } from './component-source';
import { ComponentSourceLive } from './component-source-live';
import { Suspense, useState } from 'react';
import { Button } from './ui/button';

type Props = {
  component: React.ReactNode;
  settingsEngine: React.ReactNode;
  filename?: string;
  componentName?: string;
  className?: string;
};

export default function Preview({
  component,
  settingsEngine,
  filename,
  componentName,
  className,
}: Props) {
  const [key, setKey] = useState(0);
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
          className={cn(
            'relative w-full content-center rounded-lg py-4 shadow-[inset_0_0_2px_rgba(0,0,0,0.1)] shadow-slate-300',
            className,
          )}
          key={key}
        >
          <div
            className={`grid grid-cols-1 gap-4 ${settingsEngine ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}
          >
            <Button
              onClick={() => setKey((prev) => prev + 1)}
              className="absolute right-4 top-4 z-10 flex size-6 items-center"
              variant="ghost"
              size={'icon'}
            >
              <RotateCcw className="size-3" />
            </Button>
            <Suspense
              fallback={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              <div className="flex items-center justify-center p-4">
                {component}
              </div>
            </Suspense>
            {settingsEngine && (
              <div className="flex flex-col items-center justify-center p-4">
                {settingsEngine}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="code" className="rounded-lg">
          <div className="relative mx-auto w-full max-w-full overflow-auto">
            {componentName ? (
              <ComponentSourceLive componentName={componentName} />
            ) : (
              <ComponentSource src={filename} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
