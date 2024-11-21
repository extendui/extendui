"use client"

import { AnimatePresence, motion, useMotionValue, useTransform, useSpring, type PanInfo } from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from 'lucide-react'
import React, { useState, useRef, useCallback, useMemo } from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DRAG_CONSTRAINTS = { left: 0, right: 155 }
const DRAG_THRESHOLD = 0.90
const BUTTON_STATES = {
    initial: { width: "12rem" },
    completed: { width: "8rem" },
}

const ANIMATION_CONFIG = {
    spring: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.8,
    },
}

interface StatusIconProps {
    status: string
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
    const iconMap: Record<StatusIconProps['status'], JSX.Element> = useMemo(
        () => ({
            loading: <Loader2 className="animate-spin" size={20} />,
            success: <Check size={20} />,
            error: <X size={20} />,
        }),
        []
    )

    if (!iconMap[status]) return null

    return (
        <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
        >
            {iconMap[status]}
        </motion.div>
    )
}

const useButtonStatus = (resolveTo: "success" | "error") => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = useCallback(() => {
        setStatus("loading")
        setTimeout(() => {
            setStatus(resolveTo)
        }, 2000)
    }, [resolveTo])

    return { status, handleSubmit }
}

export const ButtonSlide = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, ...props }, ref) => {
        const [isDragging, setIsDragging] = useState(false)
        const [completed, setCompleted] = useState(false)
        const dragHandleRef = useRef<HTMLDivElement | null>(null)
        const { status, handleSubmit } = useButtonStatus("success")

        const dragX = useMotionValue(0)
        const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
        const dragProgress = useTransform(springX, [0, DRAG_CONSTRAINTS.right], [0, 1])

        // Color interpolation for the progress area
        // const progressBackgroundColor = useTransform(
        //     dragProgress,
        //     [0, DRAG_THRESHOLD],
        //     ['rgb(229, 231, 235)', 'rgb(0, 0, 0)'] // From gray-100 to green-400
        // )

        const handleDragStart = useCallback(() => {
            if (completed) return
            setIsDragging(true)
        }, [completed])

        const handleDragEnd = () => {
            if (completed) return
            setIsDragging(false)

            const progress = dragProgress.get()
            if (progress >= DRAG_THRESHOLD) {
                setCompleted(true)
                handleSubmit()
            } else {
                dragX.set(0) // Reset position if not completed
            }
        }

        const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            if (completed) return
            const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
            dragX.set(newX)
        }

        const adjustedWidth = useTransform(springX, (x) => x + 10);

        return (
            <motion.div
                animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
                transition={ANIMATION_CONFIG.spring}
                className="relative h-9 shadow-button-inset dark:shadow-button-inset-dark bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
            >
                {!completed && (
                    <motion.div
                        style={{
                            width: adjustedWidth,
                        }}
                        className="absolute left-0 top-0 bottom-0 z-0 bg-primary"
                    />
                )}
                <AnimatePresence key={crypto.randomUUID()}>
                    {!completed && (
                        <motion.div
                            ref={dragHandleRef}
                            drag="x"
                            dragConstraints={DRAG_CONSTRAINTS}
                            dragElastic={0.05}
                            dragMomentum={false}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDrag={handleDrag}
                            style={{ x: springX }}
                            className="absolute left-0 flex items-center justify-start cursor-grab active:cursor-grabbing z-10"
                        >
                            <Button
                                ref={ref}
                                disabled={status === "loading"}
                                {...props}
                                size="icon"
                                className={cn(
                                    className,
                                    "rounded-xl shadow-button",
                                    isDragging && "transition-transform scale-105"
                                )}
                            >
                                <SendHorizontal className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence key={crypto.randomUUID()}>
                    {completed && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Button
                                ref={ref}
                                disabled={status === "loading"}
                                {...props}
                                className={cn(
                                    className,
                                    "w-full h-full rounded-xl transition-all duration-300"
                                )}
                            >
                                <AnimatePresence key={crypto.randomUUID()} mode="wait">
                                    <StatusIcon status={status} />
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        )
    }
)

ButtonSlide.displayName = "ButtonSlide"