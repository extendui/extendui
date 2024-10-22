'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface InputAddonRightProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputAddonRight = React.forwardRef<HTMLInputElement, InputAddonRightProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={`${className}`}
        type="text"
        placeholder="Input sitename..."
        rightAddon={'.com'}
        {...props}
      />
    )
  }
)

InputAddonRight.displayName = 'InputAddonRight'
