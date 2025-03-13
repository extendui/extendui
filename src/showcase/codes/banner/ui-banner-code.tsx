export function getBannerCode() {
    return `'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const bannerVariants = cva(
    'relative flex w-full items-center text-sm font-medium transition-all',
    {
        variants: {
            variant: {
                default: 'bg-accent text-foreground dark:bg-accent-foreground',
                primary: 'bg-primary text-primary-foreground',
                destructive: 'bg-destructive text-destructive-foreground',
                success: 'bg-green-500 text-white',
                warning: 'bg-amber-500 text-white',
                info: 'bg-blue-500 text-white',
                outline: 'border border-input bg-background',
                subtle: 'bg-muted text-muted-foreground',
                ghost: 'text-foreground',
                shimmer:
                    'animate-shimmer bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] text-primary-foreground',
            },
            position: {
                top: 'left-0 top-0 w-full',
                bottom: 'bottom-0 left-0 w-full',
                center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform',
                static: 'relative w-full',
            },
            size: {
                default: 'px-4 py-3',
                sm: 'px-3 py-2 text-xs',
                lg: 'px-6 py-4',
            },
            width: {
                default: 'w-full',
                auto: 'w-auto',
                fixed: 'max-w-md',
            },
        },
        defaultVariants: {
            variant: 'default',
            position: 'top',
            size: 'default',
            width: 'default',
        },
    }
);

type BannerElementCheck = {
    hasLeftIcon: boolean;
    hasRightIcon: boolean;
    hasDescription: boolean;
    hasDismiss: boolean;
};

type BannerContextType = {
    variant?: VariantProps<typeof bannerVariants>['variant'];
    position?: VariantProps<typeof bannerVariants>['position'];
    size?: VariantProps<typeof bannerVariants>['size'];
    width?: VariantProps<typeof bannerVariants>['width'];
    isVisible: boolean;
    link?: string;
    elementChecks: BannerElementCheck;
    handleDismiss: () => void;
};

const BannerContext = React.createContext<BannerContextType | undefined>(undefined);

const useBannerContext = () => {
    const context = React.useContext(BannerContext);
    if (!context) {
        throw new Error(
            'Banner compound components must be used within a Banner.Root component'
        );
    }
    return context;
};

const checkForChildComponent = (children: React.ReactNode, componentType: React.FC<any> | React.ForwardRefExoticComponent<any>) => {
    return React.Children.toArray(children).some((child) =>
        React.isValidElement(child) && child.type === componentType
    );
};

interface BannerRootProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
    link?: string;
    onDismiss?: () => void;
    defaultVisible?: boolean;
    children?: React.ReactNode;
}

const BannerRoot = React.forwardRef<HTMLDivElement, BannerRootProps>(
    (
        {
            className,
            variant,
            position,
            size,
            width,
            link,
            onDismiss,
            defaultVisible = true,
            children,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = React.useState(defaultVisible);

        const handleDismiss = React.useCallback(() => {
            setIsVisible(false);
            onDismiss?.();
        }, [onDismiss]);

        const elementChecks = React.useMemo<BannerElementCheck>(
            () => ({
                hasLeftIcon: checkForChildComponent(children, BannerLeftIcon),
                hasRightIcon: checkForChildComponent(children, BannerRightIcon),
                hasDescription: checkForChildComponent(children, BannerDescription),
                hasDismiss: checkForChildComponent(children, BannerDismiss),
            }),
            [children]
        );

        if (!isVisible) return null;

        const contextValue: BannerContextType = {
            variant,
            position,
            size,
            width,
            isVisible,
            link,
            elementChecks,
            handleDismiss,
        };

        return (
            <BannerContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    role="alert"
                    className={cn(
                        bannerVariants({ variant, position, size, width }),
                        position !== 'static' && 'absolute z-50',
                        className
                    )}
                    {...props}
                >
                    <div
                        className={cn(
                            'flex w-full items-center justify-between gap-2',
                            elementChecks.hasDismiss && 'pr-8'
                        )}
                    >
                        {children}
                    </div>
                </div>
            </BannerContext.Provider>
        );
    }
);
BannerRoot.displayName = 'Banner';

interface BannerIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

const BannerLeftIcon = React.forwardRef<HTMLSpanElement, BannerIconProps>(
    ({ className, children, ...props }, ref) => {
        const { elementChecks } = useBannerContext();

        return (
            <span
                ref={ref}
                className={cn(
                    'flex flex-shrink-0 items-center',
                    elementChecks.hasDescription ? 'mr-2' : 'mr-4',
                    className
                )}
                aria-hidden="true"
                {...props}
            >
                {children}
            </span>
        );
    }
);
BannerLeftIcon.displayName = 'Banner.LeftIcon';

const BannerRightIcon = React.forwardRef<HTMLSpanElement, BannerIconProps>(
    ({ className, children, ...props }, ref) => {
        const { elementChecks } = useBannerContext();

        return (
            <span
                ref={ref}
                className={cn(
                    'flex flex-shrink-0 items-center',
                    elementChecks.hasDescription ? 'ml-2' : 'ml-4',
                    className
                )}
                aria-hidden="true"
                {...props}
            >
                {children}
            </span>
        );
    }
);
BannerRightIcon.displayName = 'Banner.RightIcon';

interface BannerDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: 'left' | 'center' | 'right';
    asChild?: boolean;
}

const BannerDescription = React.forwardRef<HTMLElement, BannerDescriptionProps>(
    ({ className, position = 'center', asChild = false, children, ...props }, ref) => {
        const { link } = useBannerContext();

        if (asChild) {
            return (
                <div
                    ref={ref as React.Ref<HTMLDivElement>}
                    className={cn(
                        'flex-1 text-sm',
                        position === 'left' && 'text-left',
                        position === 'center' && 'text-center justify-center',
                        position === 'right' && 'text-right justify-end',
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        if (link) {
            const validProps = Object.fromEntries(
                Object.entries(props).filter(([key]) => React.isValidElement(key as keyof React.AnchorHTMLAttributes<HTMLAnchorElement>))
            );

            return (
                <a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        'flex-1 cursor-pointer text-sm',
                        position === 'left' && 'text-left',
                        position === 'center' && 'text-center justify-center',
                        position === 'right' && 'text-right justify-end',
                        className
                    )}
                    {...validProps}
                >
                    {children}
                </a>
            );
        }

        return (
            <div
                ref={ref as React.Ref<HTMLDivElement>}
                className={cn(
                    'flex-1 text-sm',
                    position === 'left' && 'text-left',
                    position === 'center' && 'text-center justify-center',
                    position === 'right' && 'text-right justify-end',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
BannerDescription.displayName = 'Banner.Description';

interface BannerDismissProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
}

const BannerDismiss = React.forwardRef<HTMLButtonElement, BannerDismissProps>(
    ({ className, onClick, icon = <X size={16} />, ...props }, ref) => {
        const { handleDismiss } = useBannerContext();

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            handleDismiss();
            onClick?.(event);
        };

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                className={cn(
                    'absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-all',
                    'opacity-70 hover:bg-black/10 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
                    className
                )}
                aria-label="Dismiss"
                {...props}
            >
                {icon}
            </button>
        );
    }
);
BannerDismiss.displayName = 'Banner.Dismiss';

const Banner = Object.assign(BannerRoot, {
    LeftIcon: BannerLeftIcon,
    RightIcon: BannerRightIcon,
    Description: BannerDescription,
    Dismiss: BannerDismiss,
});

export { Banner, bannerVariants };`
}