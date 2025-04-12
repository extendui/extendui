'use client';

import { SendHorizonal } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';

export const InputButtonRight = () => {
  const [value, setValue] = React.useState('');
  const [isPressed, setIsPressed] = React.useState(false);
  return (
    <div className="flex items-center">
      <Input
        className={`-me-px grow rounded-r-none focus-visible:rounded-r-none`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
      />
      <Button
        onClick={() => toast.info('Value: ' + value)}
        size={'icon'}
        className="hover:bg-primary/90 w-[40px] rounded-l-none border-l-0 shadow-none"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={!value}
      >
        <SendHorizonal
          className={`text-primary-foreground h-4 w-4 transition-all duration-200 ease-in-out ${
            isPressed ? 'scale-100' : 'hover:scale-125'
          }`}
        />
      </Button>
    </div>
  );
};
