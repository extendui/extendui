'use client';

import * as React from 'react';

import { Input } from '@/components/extendui/input';

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  placeholder?: string
  variant?: 'default' | 'filled' | 'flushed' | 'flushedfilled' | 'dashed'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(({
  className,
  value,
  placeholder = 'Type password here...',
  onChange,
  ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={`${className}`}
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    >
      <Input.Group>
        <Input.PasswordToggle />
      </Input.Group>
    </Input>
  );
});

InputPassword.displayName = 'InputPassword';
