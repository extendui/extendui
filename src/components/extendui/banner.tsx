import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight, X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const bannerVariants = cva(
    'relative flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all',
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
                ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
                shimmer: 'bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] text-primary-foreground animate-shimmer',
            },
            position: {
                top: 'top-0 left-0 w-full',
                bottom: 'bottom-0 left-0 w-full',
                left: 'left-0 top-0 h-full flex-col',
                right: 'right-0 top-0 h-full flex-col',
                center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ',
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
                fixed: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            position: 'top',
            size: 'default',
            width: 'default',
        },
    },
);

export interface BannerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
    asChild?: boolean;
    title?: string;
    icon?: React.ReactNode;
    link?: string;
    showArrow?: boolean;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
    (
        {
            className,
            variant,
            position,
            size,
            width,
            asChild = false,
            title = "Banner component",
            icon,
            link = "#",
            showArrow = true,
            dismissible = false,
            onDismiss,
            children,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'div';
        const [isVisible, setIsVisible] = React.useState(true);

        const handleDismiss = () => {
            setIsVisible(false);
            onDismiss?.();
        };

        if (!isVisible) {
            return null;
        }

        const content = children || (
            <p className="flex items-center justify-center">
                {link ? (
                    <a href={link} className="group flex items-center">
                        {icon && <span className="me-1 text-base leading-none">{typeof icon === 'string' ? icon : icon}</span>}
                        {title}
                        {showArrow && (
                            <ArrowRight
                                className="-mt-0.5 ms-2 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        )}
                    </a>
                ) : (
                    <>
                        {icon && <span className="me-1 text-base leading-none">{typeof icon === 'string' ? icon : icon}</span>}
                        {title}
                    </>
                )}
            </p>
        );

        return (
            <Comp
                className={cn(
                    bannerVariants({ variant, position, size, width, className }),
                    width === 'fixed' ? 'max-w-md' : '',
                    position !== 'static' ? 'absolute' : '',
                )}
                ref={ref}
                {...props}
            >
                {content}
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 hover:bg-black/10 hover:opacity-100"
                        aria-label="Dismiss"
                    >
                        <X size={16} />
                    </button>
                )}
            </Comp>
        );
    },
);
Banner.displayName = 'Banner';

export { Banner, bannerVariants };