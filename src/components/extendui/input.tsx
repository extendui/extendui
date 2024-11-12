'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff, X } from 'lucide-react';
import * as React from 'react';

import { hasNestedElementOfType } from '@/helpers/hasNestedElementOfType';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'h-9 w-full rounded-md border border-input bg-background py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'border-input focus:outline-primary',
        filled: 'border-transparent bg-muted focus:outline-primary',
        flushed:
          'rounded-none border-x-0 border-t-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-secondary focus-visible:outline-none',
        flushedfilled:
          'rounded-none border-x-0 border-t-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-secondary',
        dashed: 'border-dashed border-2 focus:outline-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type InputContextType = {
  id: string;
  disabled?: boolean;
  error?: boolean;
  isFocused: boolean;
  showPassword: boolean;
  required?: boolean;
  value?: string | number | readonly string[];
  maxLength?: number;
  variant?: VariantProps<typeof inputVariants>['variant'];
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  elementChecks: {
    hasLeftIcon: boolean;
    hasRightIcon: boolean;
    hasLabel: boolean;
    hasPassword: boolean;
    hasClearButton: boolean
  }
  placeholder?: string
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setShowPassword: (show: boolean) => void;
};

const InputContext = React.createContext<InputContextType | undefined>(
  undefined,
);

const useInputContext = () => {
  const context = React.useContext(InputContext);
  if (!context) {
    throw new Error(
      'Input compound components must be used within an Input.Root component',
    );
  }
  return context;
};

interface InputRootProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputVariants> {
  error?: boolean;
  textError?: string;
  maxLength?: number;
  children?: React.ReactNode;
}

const InputComponent = React.forwardRef<HTMLInputElement, InputRootProps>(
  (props, ref) => {
    const {
      className,
      id,
      variant,
      type,
      error,
      textError,
      disabled,
      required,
      value,
      maxLength,
      children,
      placeholder,
      onFocus: propOnFocus,
      onBlur: propOnBlur,
      ...inputProps
    } = props;

    const [isFocused, setIsFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!disabled) {
        setIsFocused(true);
        propOnFocus?.(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      propOnBlur?.(e);
    };


    const elementChecks = React.useMemo(() => ({
      hasLeftIcon: hasNestedElementOfType(children, [InputLeftIcon]),
      hasRightIcon: hasNestedElementOfType(children, [InputRightIcon]),
      hasLabel: hasNestedElementOfType(children, [InputLabel]),
      hasPassword: hasNestedElementOfType(children, [InputPasswordToggle]),
      hasClearButton: hasNestedElementOfType(children, [InputClearButton])
    }), [children]);

    const generatedId = React.useId();
    const inputId = id || generatedId;

    const contextValue: InputContextType = {
      id: inputId,
      disabled,
      error,
      isFocused,
      showPassword,
      value,
      maxLength,
      variant,
      required,
      elementChecks,
      type,
      placeholder,
      onFocus: handleFocus,
      onBlur: handleBlur,
      setShowPassword,
    };

    const currentValue = String(value || '');
    const hasValue = currentValue.length > 0;

    const getCounterPosition = React.useCallback(() => {
      if (elementChecks.hasClearButton && hasValue && elementChecks.hasPassword) return 'right-[3.2rem]';
      if (elementChecks.hasPassword || elementChecks.hasRightIcon) return 'right-8';
      if (elementChecks.hasClearButton && hasValue) return 'right-8';
      return 'right-3';
    }, [elementChecks.hasClearButton, hasValue, elementChecks.hasPassword, elementChecks.hasRightIcon]);

    const getLabelPadding = React.useCallback(() => {
      if (elementChecks.hasClearButton && hasValue && elementChecks.hasPassword && maxLength) return 'pe-24';
      if (elementChecks.hasClearButton && hasValue && elementChecks.hasPassword) return 'pe-20';
      if ((elementChecks.hasPassword || elementChecks.hasRightIcon) && maxLength) return 'pe-20';
      if (elementChecks.hasClearButton && hasValue && maxLength) return 'pe-20';
      return 'pe-8';
    }, [elementChecks.hasClearButton, hasValue, elementChecks.hasPassword, elementChecks.hasRightIcon, maxLength]);

    const inputClassName = cn(
      inputVariants({ variant }),
      elementChecks.hasLeftIcon ? 'pl-9' : 'px-3',
      elementChecks.hasLabel,
      value && variant === 'flushedfilled' && 'bg-secondary',
      error && 'border-red-500',
      error &&
      !['flushedfilled', 'flushed'].includes(variant as string) &&
      'focus:outline-red-500',
      disabled && 'opacity-50 cursor-not-allowed',
      getLabelPadding(),
      className,
    );
    console.log(placeholder)
    return (
      <InputContext.Provider value={contextValue}>
        <div className="relative">
          {children}
          <input
            id={inputId}
            ref={ref}
            type={type === 'password' && showPassword ? 'text' : type}
            className={inputClassName}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            {...inputProps}
          />
          {maxLength && (
            <div className={cn(
              "absolute top-2.5 text-xs text-muted-foreground",
              getCounterPosition()
            )}>
              {currentValue.length}/{maxLength}
            </div>
          )}
          {error && textError && (
            <p className="mt-1 text-xs text-red-500">{textError}</p>
          )}
        </div>
      </InputContext.Provider>
    );
  },
);
InputComponent.displayName = 'InputComponent';


type InputType = typeof InputComponent & {
  Group: typeof InputGroup;
  Label: typeof InputLabel;
  LeftIcon: typeof InputLeftIcon;
  RightIcon: typeof InputRightIcon;
  PasswordToggle: typeof InputPasswordToggle;
  ClearButton: typeof InputClearButton;
};

const Input = InputComponent as InputType;

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div ref={ref} className={cn('relative', props.className)} {...props} />
));
InputGroup.displayName = 'InputGroup';

const InputLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  const { className, children, ...rest } = props;
  const {
    id,
    isFocused,
    required,
    value,
    disabled,
    error,
    variant,
    elementChecks,
    type,
    placeholder,
  } = useInputContext();

  const labelClassName = cn(
    'absolute top-2 text-sm text-muted-foreground transition-all duration-200 ease-in-out cursor-text border-transparent ',
    elementChecks.hasLeftIcon ? 'left-9' : 'left-3',
    isFocused && 'font-medium',
    (isFocused || value || (type === 'date') || placeholder) && [
      '-top-2.5  bg-background px-1 text-primary text-xs rounded-md',
      variant === 'flushed' || variant === 'flushedfilled'
        ? `-left-[7px] pl-2`
        : `left-[7px] border-2`,
    ],
    error && 'text-red-500',
    disabled && 'opacity-50 cursor-not-allowed',
    required && `after:content-['*'] after:ml-0.5 after:text-red-500`,
    className,
  );

  return (
    <label ref={ref} htmlFor={id} className={labelClassName} {...rest}>
      {children}
    </label>
  );
});
InputLabel.displayName = 'InputLabel';

const InputLeftIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, children, ...rest } = props;
  const { disabled, error } = useInputContext();

  return (
    <div
      ref={ref}
      className={cn(
        'absolute left-3 top-2.5 flex h-4 w-4 items-center',
        disabled && 'opacity-50',
        error && 'text-red-500',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
InputLeftIcon.displayName = 'InputLeftIcon';

const InputRightIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, children, ...rest } = props;
  const { disabled, error, elementChecks } = useInputContext();

  return (
    <div
      ref={ref}
      className={cn(
        'absolute right-3 top-2.5 flex h-4 w-4 items-center',
        disabled && 'opacity-50',
        error && 'text-red-500',
        elementChecks.hasPassword && 'hidden',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
InputRightIcon.displayName = 'InputRightIcon';

const InputPasswordToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { className, ...rest } = props;
  const { showPassword, setShowPassword } = useInputContext();

  return (
    <button
      ref={ref}
      type="button"
      className={cn('absolute right-3 top-2.5 flex items-center', className)}
      onClick={() => setShowPassword(!showPassword)}
      {...rest}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  );
});
InputPasswordToggle.displayName = 'InputPasswordToggle';

const InputClearButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { className, onClick, ...rest } = props;
  const { value, elementChecks } = useInputContext();

  if (!value) return null;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'absolute right-3 top-2.5 flex items-center',
        (elementChecks.hasPassword || elementChecks.hasRightIcon) && 'right-8',
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      <X className="h-4 w-4" />
    </button>
  );
});
InputClearButton.displayName = 'InputClearButton';

Input.Group = InputGroup;
Input.Label = InputLabel;
Input.LeftIcon = InputLeftIcon;
Input.RightIcon = InputRightIcon;
Input.PasswordToggle = InputPasswordToggle;
Input.ClearButton = InputClearButton;

export { Input };
