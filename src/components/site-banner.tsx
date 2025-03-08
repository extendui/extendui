"use client";

import { ArrowRight, Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Banner } from "./extendui/banner";

export function SiteBanner() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className=" md:py-0">
            <div className="container items-center justify-center gap-4 h-12 flex-row">
                <Banner
                    position="top"
                    variant="primary"
                    width="default"
                    link="/announcements"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-green-400"
                >
                    <Banner.Description
                        position="center"
                        className="text-white flex items-center justify-center font-[400] no-underline hover:no-underline gap-2"
                    >
                        ✨ Check out our new product Animated!
                        <ArrowRight
                            size={16}
                            className={cn(
                                "transition-transform duration-300",
                                isHovered && "translate-x-1"
                            )}
                        />
                    </Banner.Description>
                </Banner>
            </div>
        </div>
    );
}