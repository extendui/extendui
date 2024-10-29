export function getInputExtendedCode() {
  return `
'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"
import { User } from 'lucide-react'

interface InputExtendedProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputExtended = React.forwardRef<HTMLInputElement, InputExtendedProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    const handleClear = () => {
      setValue('');
    };
    return (
      <Input
        ref={ref}
        className={\`\${className}\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        required={true}
        {...props}
      >
        <Input.Group>
          <Input.Label>
            Username
          </Input.Label>
          <Input.LeftIcon>
            <User />
          </Input.LeftIcon>
          <Input.ClearButton onClick={handleClear} />
        </Input.Group>
      </Input>
    )
  }
)

InputExtended.displayName = 'InputExtended'
  `;
}
