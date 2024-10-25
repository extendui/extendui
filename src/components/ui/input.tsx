'use client'

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { Eye, EyeOff, X } from 'lucide-react'
import { hasNestedElementOfType } from "@/helpers/hasNestedElementOfType"

const inputVariants = cva(
  "h-9 w-full rounded-md border border-input bg-background py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-input focus:outline-primary",
        filled: "border-transparent bg-muted focus:outline-primary",
        flushed: "rounded-none border-x-0 border-t-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-secondary focus-visible:outline-none",
        flushedfilled: "rounded-none border-x-0 border-t-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-secondary",
        dashed: "border-dashed border-2 focus:outline-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type InputContextType = {
  id: string
  disabled?: boolean
  error?: boolean
  isFocused: boolean
  showPassword: boolean
  value?: string | number | readonly string[]
  variant?: VariantProps<typeof inputVariants>["variant"]
  hasLeftElement: boolean
  hasLabel: boolean
  hasPassword: boolean
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  setShowPassword: (show: boolean) => void
}

const InputContext = React.createContext<InputContextType | undefined>(undefined)

const useInputContext = () => {
  const context = React.useContext(InputContext)
  if (!context) {
    throw new Error("Input compound components must be used within an Input.Root component")
  }
  return context
}

interface InputRootProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputVariants> {
  error?: boolean
  textError?: string
  children?: React.ReactNode
}

const InputRoot = React.forwardRef<HTMLInputElement, InputRootProps>((props, ref) => {
  const {
    className,
    id,
    variant,
    type,
    error,
    textError,
    disabled,
    value,
    children,
    onFocus: propOnFocus,
    onBlur: propOnBlur,
    ...inputProps
  } = props

  const [isFocused, setIsFocused] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled) {
      setIsFocused(true)
      propOnFocus?.(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    propOnBlur?.(e)
  }

  const hasLeft = hasNestedElementOfType(children, [InputLeftElement])
  const hasLabel = hasNestedElementOfType(children, [InputLabel])
  const hasPassword = hasNestedElementOfType(children, [PasswordToggle])

  const contextValue: InputContextType = {
    id: id || '',
    disabled,
    error,
    isFocused,
    showPassword,
    value,
    variant,
    hasLeftElement: hasLeft,
    hasLabel,
    hasPassword,
    onFocus: handleFocus,
    onBlur: handleBlur,
    setShowPassword,
  }

  const inputClassName = cn(
    inputVariants({ variant }),
    hasLeft ? "pl-9" : "px-3",
    hasLabel && "placeholder:text-transparent",
    value && variant === 'flushedfilled' && "bg-secondary",
    error && "border-red-500",
    error && !['flushedfilled', 'flushed'].includes(variant as string) && "focus:outline-red-500",
    disabled && "opacity-50 cursor-not-allowed",
    className
  )

  return (
    <InputContext.Provider value={contextValue}>
      <div className="relative">
        {children}
        <input
          ref={ref}
          type={type === 'password' && showPassword ? 'text' : type}
          className={inputClassName}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...inputProps}
        />
        {error && textError && (
          <p className="mt-1 text-xs text-red-500">{textError}</p>
        )}
      </div>
    </InputContext.Provider>
  )
})
InputRoot.displayName = "Input.Root"

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} className={cn("relative", props.className)} {...props} />
))
InputGroup.displayName = "Input.Group"

const InputLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>((props, ref) => {
  const { className, children, ...rest } = props
  const { id, isFocused, value, disabled, error, variant, hasLeftElement } = useInputContext()

  const labelClassName = cn(
    "absolute top-2 text-sm text-muted-foreground transition-all duration-200 ease-in-out cursor-text border-transparent",
    hasLeftElement ? "left-9" : "left-3",
    isFocused && "font-medium",
    (isFocused || value) && [
      "-translate-y-[calc(85%)] scale-[0.85] bg-background px-1 text-primary",
      variant === 'flushed' || variant === 'flushedfilled'
        ? `-left-1.5 pl-0`
        : `left-1.5 rounded-md border-2`,
      (variant === 'flushed' || variant === 'filled' || variant === 'flushedfilled') &&
      "-translate-y-[calc(95%)]"
    ],
    error && "text-red-500",
    disabled && "opacity-50 cursor-not-allowed",
    className
  )

  return (
    <label
      ref={ref}
      htmlFor={id}
      className={labelClassName}
      {...rest}
    >
      {children}
    </label>
  )
})
InputLabel.displayName = "Input.Label"

const InputLeftElement = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, children, ...rest } = props
  const { disabled, error } = useInputContext()

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-3 flex items-center top-2.5 h-4 w-4",
        disabled && "opacity-50",
        error && "text-red-500",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
InputLeftElement.displayName = "Input.LeftElement"

const InputRightElement = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, children, ...rest } = props
  const { disabled, error } = useInputContext()

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-3 flex items-center top-2.5",
        disabled && "opacity-50",
        error && "text-red-500",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
InputRightElement.displayName = "Input.RightElement"

const PasswordToggle = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  const { className, ...rest } = props
  const { showPassword, setShowPassword } = useInputContext()

  return (
    <button
      ref={ref}
      type="button"
      className={cn("absolute right-3 top-2 flex items-center", className)}
      onClick={() => setShowPassword(!showPassword)}
      {...rest}
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  )
})
PasswordToggle.displayName = "Input.PasswordToggle"

const ClearButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  const { className, onClick, ...rest } = props
  const { value, hasPassword } = useInputContext()

  if (!value) return null

  return (
    <button
      ref={ref}
      type="button"
      className={cn("absolute right-3 top-2 flex items-center", hasPassword && "right-8", className)}
      onClick={onClick}
      {...rest}
    >
      <X className="h-4 w-4" />
    </button>
  )
})
ClearButton.displayName = "Input.ClearButton"

const Input = {
  Root: InputRoot,
  Group: InputGroup,
  Label: InputLabel,
  LeftElement: InputLeftElement,
  RightElement: InputRightElement,
  PasswordToggle: PasswordToggle,
  ClearButton: ClearButton,
}

export { Input }