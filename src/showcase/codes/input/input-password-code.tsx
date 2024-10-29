export function getInputPasswordCode() {
  return `
'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('')
    return (
      <Input
        ref={ref}
        className={\`\${className}\`}
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type password here..."
        {...props}
      >
        <Input.Group>
          <Input.PasswordToggle />
        </Input.Group>
      </Input>
    )
  }
)

InputPassword.displayName = 'InputPassword'
  `;
}
