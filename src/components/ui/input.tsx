'use client'

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const inputVariants = cva(
  "h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm  transition-all",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
        flushed: "rounded-none border-x-0 border-t-0",
        dashed: "border-dashed border-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const wrapperRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleFocus = () => {
      setIsFocused(true)
      inputRef.current?.focus()
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
        setIsFocused(false)
      }
    }

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsFocused(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    return (
      <div ref={wrapperRef} className="relative">
        <input
          className={cn(
            inputVariants({ variant }),
            isFocused,
            label && "placeholder:text-transparent",
            className
          )}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {label && (
          <label
            className={cn(
              "absolute left-3 top-2 text-sm text-muted-foreground transition-all duration-200 ease-in-out cursor-text",
              (isFocused || props.value) &&
              "-translate-y-[calc(90%)] rounded-md scale-[0.85] bg-background px-1 text-primary"
            )}
            onClick={handleFocus}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }