export function getInputButtonCode() {
  return `
'use client';

import { SendHorizonal } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/extendedui/button/button';
import { Input } from '@/components/extendedui/input/input';

export const InputButton = () => {
  const [value, setValue] = React.useState('');
  const [isPressed, setIsPressed] = React.useState(false);
  return (
    <div className="flex items-center">
      <Input
        className={\`flex-grow -me-px rounded-r-none focus-visible:rounded-r-none\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
      />
      <Button
        onClick={() => toast.info('Value: ' + value)}
        size={'icon'}
        className="w-[40px] rounded-l-none border-l-0 shadow-none hover:bg-primary/90"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={!value}
      >
        <SendHorizonal
          className={\`h-4 w-4 transition-all duration-200 ease-in-out text-primary-foreground \${isPressed ? 'scale-100' : 'hover:scale-125'
            }\`}
        />
      </Button>
    </div>
  );
};
`;
}
