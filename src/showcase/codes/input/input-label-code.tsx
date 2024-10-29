export function getInputLabelCode() {
  return `
'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={\`\${className}\`}
        type="text"
        {...props}
      >
        <Input.Group>
          <Input.Label>
            Username
          </Input.Label>
        </Input.Group>
      </Input>
    )
  }
)

InputLabel.displayName = 'InputLabel'
  `
}



