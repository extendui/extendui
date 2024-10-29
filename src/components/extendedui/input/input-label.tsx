'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('Kicky');
    return (
      <Input
        ref={ref}
        className={`${className}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        {...props}
      >
        <Input.Group>
          <Input.Label>Username</Input.Label>
        </Input.Group>
      </Input>
    );
  },
);

InputLabel.displayName = 'InputLabel';
