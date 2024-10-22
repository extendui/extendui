'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface InputAddonLeftProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputAddonLeft = React.forwardRef<HTMLInputElement, InputAddonLeftProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={`pl-10 ${className}`}
        type="text"
        placeholder="Input sitename..."
        leftAddon={'https://'}
        {...props}
      />
    )
  }
)

InputAddonLeft.displayName = 'InputAddonLeft'
