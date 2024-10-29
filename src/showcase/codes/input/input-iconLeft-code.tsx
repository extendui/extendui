export function getInputIconLeftCode() {
  return `
'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"
import { User } from 'lucide-react'

interface InputIconLeftProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputIconLeft = React.forwardRef<HTMLInputElement, InputIconLeftProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    return (
      <Input
        ref={ref}
        className={\`\${className}\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
        {...props}
      >
        <Input.Group>
          <Input.LeftIcon>
            <User />
          </Input.LeftIcon>
        </Input.Group>
      </Input>
    )
  }
)

InputIconLeft.displayName = 'InputIconLeft'
  `;
}
