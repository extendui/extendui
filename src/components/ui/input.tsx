import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { Label } from "./label";


const inputVariants = cva(
  `h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
  {
    variants: {
      variant: {
        default: "",
        outline: "",
      }
    },
    defaultVariants: {
      variant: "default",
    }
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

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
    }

    return (
      <div className="relative">
        <input
          className={cn(
            inputVariants({
              variant,
            }),
            label && "placeholder:text-transparent",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {label && (
          <label
            className={cn(
              "absolute left-3 top-2 text-sm text-muted-foreground transition-all duration-200 ease-in-out",
              (isFocused) && "-translate-y-[calc(100%)] scale-[0.85] bg-background px-1 text-primary"
            )}
            onClick={handleFocus}
          >
            {label}
          </label>)}
      </div>
    )
  },
);
Input.displayName = "Input";

export { Input };