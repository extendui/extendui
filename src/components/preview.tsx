'use client';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Code, Eye, Check, Clipboard } from 'lucide-react';
import CopyButton from './copy-button';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useToast } from '@/hooks/use-toast';

type Props = {
  component: React.ReactNode;
  settingsEngine: React.ReactNode;
  filename: string; // Pass the filename as a prop
};

export default function Preview({ component, settingsEngine, filename }: Props) {
  const [code, setCode] = useState<string | null>(null);
  const [btnIcon, setBtnIcon] = useState(<Clipboard size={16} />);
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard
      .writeText(code ?? '')
      .then(() => {
        setBtnIcon(<Check size={16} />);
        setTimeout(() => {
          setBtnIcon(<Clipboard size={16} />);
        }, 1500);
        toast({
          description: 'Copied code to clipboard',
          title: 'Copied',
          duration: 4000,
          variant: 'default',
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Fetch the code from the API when the component mounts
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`/api/code?filename=${filename}`);
        if (!response.ok) throw new Error('File not found');
        const data = await response.json();
        setCode(data.code);
      } catch (error) {
        console.error(error);
        setCode('Error loading code');
      }
    };

    fetchCode();
  }, [filename]);

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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-center">{component}</div>
              <div className="flex flex-col items-center justify-center">{settingsEngine}</div>
            </div>
          </TabsContent>
        </div>
      </div>
      <TabsContent value="code" className="rounded-lg">
        <div className="relative mx-auto max-w-6xl">
          {code && (
            <SyntaxHighlighter language="typescript" style={gruvboxDark}>
              {code}
            </SyntaxHighlighter>
          )}
          <div className="absolute right-2 top-2">
            <CopyButton icon={btnIcon} onClick={copyCode} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
