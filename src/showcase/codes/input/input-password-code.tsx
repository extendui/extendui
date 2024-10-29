export function getInputPasswordCode() {
  return `
'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={\`\${className}\`}
        type="text"
        placeholder="Type here..."
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

  `
}



