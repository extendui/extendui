export function getInputClearCode() {
  return `
'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"

interface InputClearProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputClear = React.forwardRef<HTMLInputElement, InputClearProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('');

    const handleClear = () => {
      setValue('');
    };
    return (
      <Input
        ref={ref}
        className={\`\${className}\`}
        type="text"
        placeholder="Type here..."
        {...props}
      >
        <Input.Group>
        <Input.ClearButton onClick={handleClear} />
        </Input.Group>
      </Input>
    )
  }
)

InputClear.displayName = 'InputClear'
  `
}



