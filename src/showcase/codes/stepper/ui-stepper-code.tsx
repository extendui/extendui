export function getStepperCode() {
    return `"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const stepperVariants = cva(
    "group/stepper inline-flex",
    {
        variants: {
            variant: {
                default: "data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
            },
            orientation: {
                horizontal: "flex-row",
                vertical: "flex-col",
            },
        },
        defaultVariants: {
            variant: "default",
            orientation: "horizontal",
        },
    }
);

const stepperItemVariants = cva(
    "group/step flex items-center",
    {
        variants: {
            orientation: {
                horizontal: "flex-row",
                vertical: "flex-col",
            },
        },
        defaultVariants: {
            orientation: "horizontal",
        },
    }
);

const indicatorVariants = cva(
    "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
    {
        variants: {
            variant: {
                default: "bg-muted text-muted-foreground data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground",
                outline: "border-2 border-muted text-muted-foreground data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:border-primary data-[state=completed]:border-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground bg-transparent",
                dotted: "border-2 border-dotted border-muted text-muted-foreground data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:border-primary data-[state=completed]:border-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground bg-transparent",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

type StepperContextValue = {
    activeStep: number;
    setActiveStep: (step: number) => void;
    orientation: "horizontal" | "vertical";
    variant?: VariantProps<typeof stepperVariants>["variant"];
    separatorWidth?: string;
};

type StepItemContextValue = {
    step: number;
    state: StepState;
    isDisabled: boolean;
    isLoading: boolean;
};

type StepState = "active" | "completed" | "inactive" | "loading";

const StepperContext = React.createContext<StepperContextValue | undefined>(undefined);
const StepItemContext = React.createContext<StepItemContextValue | undefined>(undefined);

const useStepper = () => {
    const context = React.useContext(StepperContext);
    if (!context) throw new Error("useStepper must be used within a Stepper");
    return context;
};

const useStepItem = () => {
    const context = React.useContext(StepItemContext);
    if (!context) throw new Error("useStepItem must be used within a StepperItem");
    return context;
};

interface StepperProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
    defaultValue?: number;
    value?: number;
    separatorWidth?: number;
    onValueChange?: (value: number) => void;
}

const StepperComponent = React.forwardRef<HTMLDivElement, StepperProps>(
    (
        {
            defaultValue = 0,
            value,
            separatorWidth = 50,
            onValueChange,
            variant,
            orientation = "horizontal",
            className,
            ...props
        },
        ref
    ) => {
        const [activeStep, setInternalStep] = React.useState(defaultValue);

        const setActiveStep = React.useCallback(
            (step: number) => {
                if (value === undefined) setInternalStep(step);
                onValueChange?.(step);
            },
            [value, onValueChange]
        );

        const currentStep = value ?? activeStep;

        const contextValue: StepperContextValue = {
            activeStep: currentStep,
            setActiveStep,
            orientation: orientation ?? "horizontal",
            separatorWidth: \`\${separatorWidth}px\`,
            variant,
        };

        return (
            <StepperContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    data-slot="stepper"
                    className={cn(stepperVariants({ variant, orientation }), className)}
                    data-orientation={orientation}
                    {...props}
                />
            </StepperContext.Provider>
        );
    }
);
StepperComponent.displayName = "Stepper";

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
    step: number;
    completed?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
    (
        { step, completed = false, disabled = false, loading = false, className, children, ...props },
        ref
    ) => {
        const { activeStep, orientation } = useStepper();
        const state: StepState = completed || step < activeStep ? "completed" : activeStep === step ? "active" : "inactive";
        const isLoading = loading && step === activeStep;

        return (
            <StepItemContext.Provider value={{ step, state, isDisabled: disabled, isLoading }}>
                <div
                    ref={ref}
                    data-slot="stepper-item"
                    className={cn(stepperItemVariants({ orientation }), className)}
                    data-state={state}
                    {...(isLoading ? { "data-loading": true } : {})}
                    {...props}
                >
                    {children}
                </div>
            </StepItemContext.Provider>
        );
    }
);
StepperItem.displayName = "StepperItem";

interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
    ({ asChild = false, className, children, ...props }, ref) => {
        const { setActiveStep } = useStepper();
        const { step, isDisabled } = useStepItem();

        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                ref={ref as any}
                data-slot="stepper-trigger"
                className={cn(
                    !asChild &&
                    "focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
                    className
                )}
                {...(!asChild ? { onClick: () => setActiveStep(step), disabled: isDisabled } : {})}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);
StepperTrigger.displayName = "StepperTrigger";

interface StepperIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'>, VariantProps<typeof indicatorVariants> {
    asChild?: boolean;
}

const StepperIndicator = React.forwardRef<HTMLSpanElement, StepperIndicatorProps>(
    ({ asChild = false, className, variant, children, ...props }, ref) => {
        const { state, step, isLoading } = useStepItem();

        return (
            <span
                ref={ref}
                data-slot="stepper-indicator"
                className={cn(indicatorVariants({ variant }), className)}
                data-state={state}
                {...props}
            >
                {asChild ? (
                    children
                ) : (
                    <>
                        <span className="transition-all group-data-loading/step:scale-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0">
                            {step}
                        </span>
                        <CheckIcon
                            className="absolute scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
                            size={16}
                            aria-hidden="true"
                        />
                        {isLoading && (
                            <span className="absolute transition-all">
                                <LoaderCircleIcon className="animate-spin" size={14} aria-hidden="true" />
                            </span>
                        )}
                    </>
                )}
            </span>
        );
    }
);
StepperIndicator.displayName = "StepperIndicator";

const StepperTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            data-slot="stepper-title"
            className={cn("text-sm font-medium", className)}
            {...props}
        />
    )
);
StepperTitle.displayName = "StepperTitle";

const StepperDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        data-slot="stepper-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
    />
));
StepperDescription.displayName = "StepperDescription";

const StepperSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { orientation, separatorWidth } = useStepper();
        return (
            <div
                ref={ref}
                data-slot="stepper-separator"
                className={cn(
                    "bg-muted group-data-[state=completed]/step:bg-primary m-1.5",
                    orientation === "horizontal"
                        ? "h-0.5 flex-1"
                        : "w-0.5",
                    className
                )}
                style={{
                    ...(orientation === "horizontal" && { width: separatorWidth }),
                    ...(orientation === "vertical" && { height: separatorWidth }),
                }}
                {...props}
            />
        )
    }
);
StepperSeparator.displayName = "StepperSeparator";

type StepperType = typeof StepperComponent & {
    Item: typeof StepperItem;
    Trigger: typeof StepperTrigger;
    Indicator: typeof StepperIndicator;
    Title: typeof StepperTitle;
    Description: typeof StepperDescription;
    Separator: typeof StepperSeparator;
};

const Stepper = StepperComponent as StepperType;

Stepper.Item = StepperItem;
Stepper.Trigger = StepperTrigger;
Stepper.Indicator = StepperIndicator;
Stepper.Title = StepperTitle;
Stepper.Description = StepperDescription;
Stepper.Separator = StepperSeparator;

export { Stepper };
`
}