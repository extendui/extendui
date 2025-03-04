'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const bannerVariants = cva(
    'relative flex items-center w-full text-sm font-medium transition-all',
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
                    'bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] text-primary-foreground animate-shimmer',
            },
            position: {
                top: 'top-0 left-0 w-full',
                bottom: 'bottom-0 left-0 w-full',
                center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
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

// Context Type
type BannerContextType = {
    variant?: VariantProps<typeof bannerVariants>['variant'];
    position?: VariantProps<typeof bannerVariants>['position'];
    size?: VariantProps<typeof bannerVariants>['size'];
    width?: VariantProps<typeof bannerVariants>['width'];
    isVisible: boolean;
    link?: string;
    elementChecks: {
        hasLeftIcon: boolean;
        hasRightIcon: boolean;
        hasDescription: boolean;
        hasDismiss: boolean;
    };
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

// Helper to check nested elements
const hasNestedElementOfType = (children: React.ReactNode, types: any[]) => {
    return React.Children.toArray(children).some((child) =>
        types.some((type) => React.isValidElement(child) && child.type === type)
    );
};

// Root Component
interface BannerRootProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
    link?: string;
    onDismiss?: () => void;
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
            children,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = React.useState(true);

        const handleDismiss = () => {
            setIsVisible(false);
            onDismiss?.();
        };

        const elementChecks = React.useMemo(
            () => ({
                hasLeftIcon: hasNestedElementOfType(children, [BannerLeftIcon]),
                hasRightIcon: hasNestedElementOfType(children, [BannerRightIcon]),
                hasDescription: hasNestedElementOfType(children, [BannerDescription]),
                hasDismiss: hasNestedElementOfType(children, [BannerDismiss]),
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
                    className={cn(
                        bannerVariants({ variant, position, size, width }),
                        position !== 'static' && 'absolute',
                        className
                    )}
                    {...props}
                >
                    <div
                        className={cn(
                            'flex items-center w-full',
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
BannerRoot.displayName = 'BannerRoot';

// Left Icon Component
const BannerLeftIcon = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
    const { elementChecks } = useBannerContext();

    return (
        <span
            ref={ref}
            className={cn(
                'flex items-center',
                elementChecks.hasDescription ? 'mr-2' : 'mr-4',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
});
BannerLeftIcon.displayName = 'BannerLeftIcon';

// Right Icon Component
const BannerRightIcon = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
    const { elementChecks } = useBannerContext();

    return (
        <span
            ref={ref}
            className={cn(
                'flex items-center',
                elementChecks.hasDescription ? 'ml-2' : 'ml-4',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
});
BannerRightIcon.displayName = 'BannerRightIcon';

// Description Component
interface BannerDescriptionProps
    extends React.HTMLAttributes<HTMLParagraphElement | HTMLAnchorElement> {
    position?: 'left' | 'center' | 'right';
}

const BannerDescription = React.forwardRef<
    HTMLParagraphElement | HTMLAnchorElement,
    BannerDescriptionProps
>(({ className, children, position = 'center', ...props }, ref) => {
    const { link } = useBannerContext();

    const commonClasses = cn(
        'text-sm flex-1',
        position === 'left' && 'text-left',
        position === 'center' && 'text-center',
        position === 'right' && 'text-right',
        link && 'hover:drop-shadow-[0_2px_3px_rgba(0,0,0,1)]',
        className
    );

    return link ? (
        <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={link}
            className={commonClasses}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
            {children}
        </a>
    ) : (
        <p
            ref={ref as React.Ref<HTMLParagraphElement>}
            className={commonClasses}
            {...(props as React.HTMLAttributes<HTMLParagraphElement>)}
        >
            {children}
        </p>
    );
});
BannerDescription.displayName = 'BannerDescription';

// Dismiss Button Component
const BannerDismiss = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
    const { handleDismiss } = useBannerContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent propagation to any parent elements
        handleDismiss();
        onClick?.(event); // Call custom onClick if provided
    };

    return (
        <button
            ref={ref}
            onClick={handleClick}
            className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 hover:bg-black/10 hover:opacity-100',
                className
            )}
            aria-label="Dismiss"
            {...props}
        >
            <X size={16} />
        </button>
    );
});
BannerDismiss.displayName = 'BannerDismiss';

// Compound Component Type
type BannerType = typeof BannerRoot & {
    LeftIcon: typeof BannerLeftIcon;
    RightIcon: typeof BannerRightIcon;
    Description: typeof BannerDescription;
    Dismiss: typeof BannerDismiss;
};

const Banner = BannerRoot as BannerType;

Banner.LeftIcon = BannerLeftIcon;
Banner.RightIcon = BannerRightIcon;
Banner.Description = BannerDescription;
Banner.Dismiss = BannerDismiss;

export { Banner, bannerVariants };