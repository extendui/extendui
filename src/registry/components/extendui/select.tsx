'use client';

import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const selectVariants = cva(
  'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        default: 'border-select',
        filled: 'border-transparent bg-muted',
        flushed: 'rounded-none border-x-0 border-t-0 outline-hidden',
        flushedfilled: 'rounded-none border-x-0 border-t-0 outline-hidden',
        dashed: 'border-dashed border-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const selectContentVariants = cva(
  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'border-select',
        filled: 'border-transparent bg-muted',
        flushed: 'rounded-none border-x-0 border-t-0 outline-hidden',
        flushedfilled: 'rounded-none border-x-0 border-t-0 outline-hidden',
        dashed: 'border-dashed border-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type SelectContextType = {
  variant?: VariantProps<typeof selectVariants>['variant'];
  error?: boolean;
  disabled?: boolean;
};

const SelectContext = React.createContext<SelectContextType | undefined>(
  undefined,
);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(
      'Select compound components must be used within a Select component',
    );
  }
  return context;
};

interface SelectProps
  extends React.ComponentProps<typeof SelectPrimitive.Root>,
    VariantProps<typeof selectVariants> {
  error?: boolean;
  children: React.ReactNode;
}

const SelectComponent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  SelectProps
>(({ children, variant, error, disabled, ...props }, ref) => {
  const contextValue: SelectContextType = {
    variant,
    error,
    disabled,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <SelectPrimitive.Root disabled={disabled} {...props}>
        {children}
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  );
});
SelectComponent.displayName = 'Select';

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    openIcon?: React.ReactNode;
    icon?: React.ReactNode;
    leftText?: string;
  }
>(
  (
    {
      className,
      children,
      openIcon = <CaretSortIcon />,
      icon,
      leftText,
      ...props
    },
    ref,
  ) => {
    const { variant, error, disabled } = useSelectContext();

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          selectVariants({ variant }),
          className,
          error && [
            'border-red-500 text-red-500',
            !['flushedfilled', 'flushed'].includes(variant as string) &&
              'focus:outline-red-500',
          ],
          disabled && 'cursor-not-allowed opacity-50',
          icon && 'relative ps-9',
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              'text-primary pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3',
              error && 'text-red-500',
            )}
          >
            {icon}
          </div>
        )}
        {leftText ? (
          <span className={cn(error && 'text-red-500')}>
            {`${leftText} `}
            {children}
          </span>
        ) : (
          children
        )}
        <SelectPrimitive.Icon asChild>{openIcon}</SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = 'SelectScrollUpButton';

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = 'SelectScrollDownButton';

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    variant?: VariantProps<typeof selectContentVariants>['variant'];
  }
>(
  (
    {
      className,
      children,
      position = 'popper',
      variant: contentVariant,
      ...props
    },
    ref,
  ) => {
    const { variant: rootVariant } = useSelectContext();
    const effectiveVariant = contentVariant || rootVariant;

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            selectContentVariants({ variant: effectiveVariant }),
            position === 'popper' &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className,
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              'p-1',
              position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);
SelectContent.displayName = 'SelectContent';

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-secondary focus:text-secondary-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectItem';

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

const SelectHelperText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { error } = useSelectContext();
  return (
    <p
      ref={ref}
      className={cn(
        'text-muted-foreground mt-2 text-xs',
        error && 'text-red-500',
        className,
      )}
      {...props}
    />
  );
});
SelectHelperText.displayName = 'SelectHelperText';

type SelectType = typeof SelectComponent & {
  Group: typeof SelectPrimitive.Group;
  Value: typeof SelectPrimitive.Value;
  Icon: typeof SelectPrimitive.Icon;
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Label: typeof SelectLabel;
  Item: typeof SelectItem;
  Separator: typeof SelectSeparator;
  ScrollUpButton: typeof SelectScrollUpButton;
  ScrollDownButton: typeof SelectScrollDownButton;
  HelperText: typeof SelectHelperText;
};

const Select = SelectComponent as SelectType;

Select.Group = SelectPrimitive.Group;
Select.Value = SelectPrimitive.Value;
Select.Icon = SelectPrimitive.Icon;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Separator = SelectSeparator;
Select.ScrollUpButton = SelectScrollUpButton;
Select.ScrollDownButton = SelectScrollDownButton;
Select.HelperText = SelectHelperText;

export { Select };
