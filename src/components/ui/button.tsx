import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 transition-all',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-all',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-all',
        ghost: 'hover:bg-accent hover:text-accent-foreground transition-all',
        link: 'text-primary underline-offset-4 hover:underline transition-all',
        ringHover:
          'bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/80 hover:ring-offset-2 hover:ring-offset-background',
        glowingRing:
          'bg-primary text-primary-foreground relative overflow-hidden ring-2 ring-primary/50 animate-glow transition-all',
        shimmer:
          'bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] text-primary-foreground animate-shimmer transition-all',
        perimeterShimmer:
          'bg-primary text-primary-foreground relative overflow-hidden before:absolute before:inset-0 before:rounded-md before:border-2 before:border-emerald-500/50 before:bg-transparent before:animate-perimeterShimmer transition-all',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
