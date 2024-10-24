'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface InputIconRightProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputIconRight = React.forwardRef<HTMLInputElement, InputIconRightProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={`${className}`}
        type="text"
        placeholder="Type here..."
        rightIcon={<Search className="h-4 w-4" />}
        {...props}
      />
    )
  }
)

InputIconRight.displayName = 'InputIconRight'
