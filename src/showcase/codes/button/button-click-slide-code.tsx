export function getButtonClickSlideCode() {
  return `'use client'

import { motion } from "framer-motion"
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react'
import React, { useState } from "react"

import { Button, type ButtonProps } from "@/components/extendui/button"
import { cn } from "@/lib/utils"

export const ClickSlideButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {

        const [isSliding, setIsSliding] = useState(false)
        const [isOpen, setIsOpen] = useState(false)

        const handleClick = () => {
            setIsSliding(!isSliding)
            setTimeout(() => {
                setIsOpen(!isOpen)
            }, 750)
        }

        return (
            <>
                <motion.div
                    className={cn(
                        \`relative h-9 w-52 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold dark:shadow-button-inset-dark transition-colors duration-500\`,
                        isOpen ? "bg-primary dark:bg-accent" : "bg-accent shadow-button-inset dark:bg-accent/70",
                    )}
                >
                    <div
                        className={cn(
                            "transition-colors duration-500",
                            isOpen
                                ? "text-accent dark:text-primary-foreground [text-shadow:1px_1px_1px_rgba(255,255,255,0.3),_-1px_-1px_1px_rgba(0,0,0,0.7)]"
                                : "text-primary-foreground [text-shadow:1px_1px_1px_rgba(255,255,255,0.5)] dark:[text-shadow:1px_1px_1px_rgba(0,0,0,0.5)]"
                        )}
                    >
                        {isOpen ? 'OPENED' : 'OPEN'}
                    </div>
                    <motion.div
                        onClick={handleClick}
                        animate={isSliding ? { x: 172, rotate: 360 } : { x: 0, rotate: 0 }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut"
                        }}
                        className="absolute left-0 h-full flex items-center justify-center rounded-full"
                    >
                        <Button
                            ref={ref}
                            {...props}
                            size="icon"
                            onClick={handleClick}
                            className={cn(
                                "rounded-full shadow-button dark:bg-accent transition-colors duration-300",
                                className
                            )}
                        >
                            {isOpen ? <LockKeyholeOpen className="size-5 text-accent dark:text-primary-foreground transition-colors duration-300" strokeWidth={3} /> : <LockKeyhole strokeWidth={3} className="size-5 text-accent dark:text-primary-foreground transition-colors duration-300" size={5} />}
                        </Button>
                    </motion.div>
                </motion.div>
            </>
        )
    }
)

ClickSlideButton.displayName = 'ClickSlideButton';`;
}
