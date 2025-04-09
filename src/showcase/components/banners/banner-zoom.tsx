"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import { Banner } from "@/components/extendui/banner"

const springTransitionDefault = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
};

const bannerVariantsDefault = {
    initial: { scale: 1.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0 },
}

type BannerProps = {
    springTransition?: {
        type: string;
        stiffness: number;
        damping: number;
    };
    bannerVariants?: {
        initial: { opacity: number };
        animate: { opacity: number };
        exit: { opacity: number };
    };
};

export default function BannerZoom({
    springTransition = springTransitionDefault,
    bannerVariants = bannerVariantsDefault,
}: BannerProps) {
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setIsVisible(false)
    }

    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg border">
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key="banner"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={bannerVariants}
                        transition={springTransition}
                        className="absolute left-0 top-0 w-full z-150"
                    >
                        <Banner variant={"default"} position={"top"} onDismiss={handleClose}>
                            <Banner.Description position="center">Banner component</Banner.Description>
                            <Banner.Dismiss />
                        </Banner>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex h-full min-h-[150px] items-center justify-center" />
        </div>
    )
}
