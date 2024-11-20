"use client"

import { motion } from "framer-motion"
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react'
import React, { useState } from "react"

import { Button } from "@/components/extendui/button"
import { cn } from "@/lib/utils"

export function SlidingSpinningButton() {
    const [isSliding, setIsSliding] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsSliding(true)
        setTimeout(() => {
            setIsOpen(true)
        }, 850)
    }

    return (
        <>
            <motion.div
                className={cn(
                    `relative h-9 w-52 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold`,
                    isOpen ? "bg-primary dark:bg-accent" : "bg-accent shadow-[inset_0px_0px_4px_rgba(0,0,0,0.8)]",
                )}
            >
                <div
                    className={cn(
                        "text-2xl font-bold",
                        isOpen
                            ? "text-accent dark:text-primary-foreground [text-shadow:1px_1px_1px_rgba(255,255,255,0.3),_-1px_-1px_1px_rgba(0,0,0,0.7)]"
                            : "text-primary-foreground [text-shadow:1px_1px_1px_rgba(255,255,255,0.3),_-1px_-1px_1px_rgba(0,0,0,0.5)]"
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
                    className="absolute left-0 h-full w-9 flex items-center justify-center rounded-full"
                >
                    <Button
                        className="rounded-full shadow-[0_0px_4px_1px_rgba(0,0,0,0.8)] dark:bg-accent"
                        size="icon"
                        onClick={handleClick}
                    >
                        {isOpen ? <LockKeyholeOpen className="size-5 text-accent dark:text-primary-foreground" strokeWidth={3} /> : <LockKeyhole strokeWidth={3} className="size-5 text-accent dark:text-primary-foreground" />}
                    </Button>
                </motion.div>
            </motion.div>
        </>
    )
}