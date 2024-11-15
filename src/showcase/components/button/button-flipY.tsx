'use client'

import { motion } from 'framer-motion';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/extendui/button';

type FlipButtonYProps = ButtonProps & {
    springTransition?: {
        type: string;
        stiffness: number;
        damping: number;
    };
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
}

const springTransitionDefault = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
};

export const FlipButtonY = React.forwardRef<HTMLButtonElement, FlipButtonYProps>(
    ({
        springTransition = springTransitionDefault,
        frontContent = 'Front',
        backContent = 'Back',
        className,
        ...props },
        ref) => {
        const [isFlipped, setIsFlipped] = React.useState(false);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsFlipped(!isFlipped);
            props.onClick?.(event);
        };

        return (
            <motion.div
                className="relative h-9 w-24 perspective-1000"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={springTransition}
                style={{ perspective: 1000 }}
            >
                <Button
                    ref={ref}
                    className={`absolute w-full h-full ${className || ''}`}
                    style={{
                        transform: 'rotateY(0deg)',
                        zIndex: isFlipped ? 0 : 1,
                    }}
                    onClick={handleClick}
                    {...props}
                >
                    {frontContent}
                </Button>
                <Button
                    className={`absolute w-full h-full ${className || ''}`}
                    style={{
                        transform: 'rotateY(180deg)',
                        zIndex: isFlipped ? 1 : 0,
                    }}
                    onClick={handleClick}
                    {...props}
                >
                    {backContent}
                </Button>
            </motion.div>
        );
    }
);

FlipButtonY.displayName = 'FlipButtonY';
