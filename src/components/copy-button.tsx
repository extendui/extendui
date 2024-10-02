'use client';

import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

export default function CopyButton({ code }: { code: string | null }) {
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
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className="h-8 w-8 p-1"
      onClick={copyCode}
    >
      {btnIcon}
    </Button>
  );
}
