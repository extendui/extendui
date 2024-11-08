'use client';

import * as React from 'react';
import { useState } from 'react';

import { Input } from '@/components/extendui/input';

interface InputClearProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputClear = React.forwardRef<HTMLInputElement, InputClearProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = useState('');

    const handleClear = () => {
      setValue('');
    };

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
          <Input.ClearButton onClick={handleClear} />
        </Input.Group>
      </Input>
    );
  },
);

InputClear.displayName = 'InputClear';
