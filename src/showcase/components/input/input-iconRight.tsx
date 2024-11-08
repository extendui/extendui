'use client';

import { User } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/extendui/input/input';

interface InputIconRightProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputIconRight = React.forwardRef<
  HTMLInputElement,
  InputIconRightProps
>(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState('');
  return (
    <Input
      ref={ref}
      className={`${className}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      placeholder="Type here..."
      {...props}
    >
      <Input.Group>
        <Input.RightIcon>
          <User />
        </Input.RightIcon>
      </Input.Group>
    </Input>
  );
});

InputIconRight.displayName = 'InputIconRight';
