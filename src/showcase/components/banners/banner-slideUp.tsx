"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import { Banner } from "@/components/extendui/banner"

export default function BannerSlideUp() {
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setIsVisible(false)
    }

    const bannerVariants = {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
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
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
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
