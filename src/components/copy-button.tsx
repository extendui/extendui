'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Check, Clipboard } from 'lucide-react';

export default function CopyButton() {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className="h-8 w-8 p-1"
      onClick={() => setCopied(!copied)}
    >
      {copied === true ? <Check /> : <Clipboard />}
    </Button>
  );
}
