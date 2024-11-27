import { Slot } from '@radix-ui/react-slot';
import { Tooltip } from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
          'border border-input bg-background shadow-sm hover:bg-secondary hover:text-secondary-foreground transition-all',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-all',
        ghost:
          'hover:bg-secondary hover:text-secondary-foreground transition-all',
        link: 'text-primary underline-offset-4 hover:underline transition-all',
        ringHover:
          'bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/80 hover:ring-offset-2 hover:ring-offset-background',
        glowingRing:
          'bg-primary text-primary-foreground relative overflow-hidden ring-2 ring-primary/50 animate-glow transition-all',
        shimmer:
          'bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] text-primary-foreground animate-shimmer transition-all',
        perimeterShimmer:
          'bg-primary text-primary-foreground relative overflow-hidden before:absolute before:inset-0 before:rounded-md before:border-2 before:border-accent/50 before:bg-transparent before:animate-perimeterShimmer transition-all',
        bouncing:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all animate-bounce',
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
  loading?: boolean;
  loadingText?: string;
  tooltipText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      loadingText = 'Processing...',
      tooltipText,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const content = loading ? (
      <>
        {size == 'icon' ? (
          <Loader2 className={cn('animate-spin')} />
        ) : (
          <>
            {loadingText}
            <Loader2 className={cn('ml-2 h-4 w-4 animate-spin')} />
          </>
        )}
      </>
    ) : (
      children
    );

    return tooltipText ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              disabled={loading}
              {...props}
            >
              {content}
            </Comp>
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };