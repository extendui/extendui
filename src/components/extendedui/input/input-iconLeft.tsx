'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface InputIconLeftProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputIconLeft = React.forwardRef<HTMLInputElement, InputIconLeftProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={`${className}`}
        type="text"
        placeholder="Type here..."
        leftIcon={<Search className="h-4 w-4" />}
        {...props}
      />
    )
  }
)

InputIconLeft.displayName = 'InputIconLeft'
