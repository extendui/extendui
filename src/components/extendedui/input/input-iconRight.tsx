'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Search, User } from 'lucide-react'

interface InputIconRightProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const InputIconRight = React.forwardRef<HTMLInputElement, InputIconRightProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('')
    return (
      <Input
        ref={ref}
        className={`${className}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here..."
        {...props}
      >
        <Input.Group>
          <Input.RightIcon>
            <User />
          </Input.RightIcon>
        </Input.Group>
      </Input>
    )
  }
)

InputIconRight.displayName = 'InputIconRight'
