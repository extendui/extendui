'use client'

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { Eye, EyeOff, X } from 'lucide-react'

const inputVariants = cva(
  "h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-input focus:outline-primary",
        filled: "border-transparent bg-muted focus:outline-primary",
        flushed: "rounded-none border-x-0 border-t-0 px-1 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-secondary focus-visible:outline-none",
        flushedfilled: "rounded-none border-x-0 border-t-0 px-1 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-secondary",
        dashed: "border-dashed border-2 focus:outline-primary",
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
  error?: boolean
  textError?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, type, error, textError, leftIcon, rightIcon, leftAddon, rightAddon, clearable, onClear, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const wrapperRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleFocus = () => {
      if (!props.disabled) {
        setIsFocused(true)
        inputRef.current?.focus()
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
        setIsFocused(false)
      }
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      onClear?.()
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

    console.log(props.value)


    return (
      <div ref={wrapperRef} className="relative">
        {leftAddon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftAddon}
          </div>
        )}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            inputVariants({ variant }),
            (props.value && (variant === 'flushedfilled')) && "bg-secondary",
            label && "placeholder:text-transparent",
            error && "border-red-500",
            error && variant !== 'flushedfilled' && variant !== 'flushed' && "focus:outline-red-500",
            props.disabled && "opacity-50 cursor-not-allowed",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            leftAddon && "pl-36",
            rightAddon && "pr-10",
            clearable && "pr-10",
            className
          )}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={type === 'password' && showPassword ? 'text' : type}
          {...props}
        />
        {label && (
          <label
            className={cn(
              "absolute left-3 top-2 text-sm text-muted-foreground transition-all duration-200 ease-in-out cursor-text border-transparent",
              (isFocused) && "font-medium",
              (isFocused || props.value) && `-translate-y-[calc(85%)] rounded-md scale-[0.85] bg-background px-1 text-primary border-2 left-1.5 ${(variant === 'flushed' || variant === 'flushedfilled') && "-left-1.5 pl-0"}`,
              ((isFocused || props.value) && (variant === 'flushed' || variant === 'filled' || variant === 'flushedfilled') && "-translate-y-[calc(95%)]"),
              error && "text-red-500",
              props.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={props.disabled ? undefined : handleFocus}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {rightIcon}
          </div>
        )}
        {rightAddon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {rightAddon}
          </div>
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
          </button>
        )}
        {clearable && props.value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
        {error && textError && (
          <p className="mt-1 text-xs text-red-500">{textError}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }