export function getInputSelectLeftCode() {
  return `
'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface InputSelectLeftProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputSelectLeft = React.forwardRef<HTMLInputElement, InputSelectLeftProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState('')
    const [selectValue, setSelectValue] = React.useState('com')

    return (
      <div className="flex items-center ">
        <Input
          ref={ref}
          className={\`flex-grow \${className} -me-px rounded-r-none  focus-visible:rounded-r-none \`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder='Type here...'
          {...props}
        />
        <Select value={selectValue} onValueChange={(val) => setSelectValue(val)}>
          <SelectTrigger className="w-[80px] border-l-0 rounded-l-none focus:outline-none focus:ring-0 shadow-none">
            <SelectValue placeholder=".com" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="com">.com</SelectItem>
            <SelectItem value="io">.io</SelectItem>
            <SelectItem value="xyz">.xyz</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }
)

InputSelectLeft.displayName = 'InputSelectLeft'
  `;
}