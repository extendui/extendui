import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Code, Eye } from 'lucide-react';
import CopyButton from './copy-button';

type Props = {
  component: React.ReactNode;
  settingsEngine: React.ReactNode;
};

export default function Preview({ component, settingsEngine }: Props) {
  return (
    <Tabs defaultValue="preview">
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
      <div className="flex flex-col lg:flex-row">
        <div className="mask w-full">
          <TabsContent
            value="preview"
            className="dark:bg-gradient-dark bg-gradient relative h-[250px] w-full content-center rounded-lg bg-repeat shadow-[inset_0_0_2px_rgba(0,0,0,0.1)] shadow-slate-300"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center">
                {component}
              </div>
              <div className="flex flex-col items-center justify-center">
                {settingsEngine}
              </div>
            </div>
            <div className="absolute right-2 top-2">
              <CopyButton />
            </div>
          </TabsContent>
        </div>
      </div>
      <TabsContent value="code" className="rounded-lg">
        <div className="relative mx-auto max-w-6xl">Code</div>
      </TabsContent>
    </Tabs>
  );
}
