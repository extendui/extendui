import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader, SendHorizonal, X } from "lucide-react";
import React, { useState, useRef } from "react";

import { Button, type ButtonProps } from "@/components/extendui/button";
import { cn } from "@/lib/utils";

const useStatus = ({ resolveTo }: { resolveTo: "success" | "error" }) => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const onSubmit = () => {
        setStatus("loading");
        setTimeout(() => {
            setStatus(resolveTo);
        }, 2000);
    };

    return { status, onSubmit };
};

export const ButtonSlide = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, ...props }, ref) => {
        const [isDragging, setIsDragging] = useState(false);
        const [dragProgress, setDragProgress] = useState(0);
        const [completed, setCompleted] = useState(false);
        const dragHandleRef = useRef<HTMLDivElement | null>(null);
        const { status, onSubmit } = useStatus({ resolveTo: "success" });

        const handleDragEnd = () => {
            if (completed) return;
            setIsDragging(false);
            if (dragProgress >= 0.5) {
                setCompleted(true);
                onSubmit();
            }
            setDragProgress(0);
        };

        return (
            <motion.div
                animate={{
                    width: completed ? "8rem" : "12rem",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
                className="relative h-9 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
            >
                <AnimatePresence>
                    {!completed && (
                        <motion.div
                            ref={dragHandleRef}
                            drag="x"
                            dragConstraints={{
                                left: 0,
                                right: 155,
                            }}
                            dragElastic={0}
                            dragMomentum={false}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={handleDragEnd}
                            onDrag={(_, info) => {
                                const progress = Math.min(Math.max(info.offset.x / 155, 0), 1);
                                setDragProgress(progress);
                            }}
                            initial={{ x: 0 }}
                            animate={{ x: completed ? 155 : 0 }}
                            exit={{ x: 155 }}
                            transition={{ type: "spring", stiffness: 250, damping: 30 }}
                            className="absolute left-0 flex items-center justify-start"
                        >
                            <Button
                                ref={ref}
                                disabled={status === "loading"}
                                {...props}
                                size="icon"
                                className={cn(className, "rounded-xl")}
                            >
                                <SendHorizonal className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {completed && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
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
                                <AnimatePresence mode="wait">
                                    {status === "loading" && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Loader className="animate-spin" size={20} />
                                        </motion.div>
                                    )}
                                    {status === "success" && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Check size={20} />
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <X size={20} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }
);

ButtonSlide.displayName = "ButtonSlide";

export default ButtonSlide;
