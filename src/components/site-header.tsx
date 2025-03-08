
import { Blocks } from "lucide-react";
import Link from "next/link";

import { CommandMenu } from "@/components/command-menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";


export async function SiteHeader() {
    let stars = 300; // Default value

    try {
        const response = await fetch(
            "https://api.github.com/repos/magicuidesign/magicui",
            {
                headers: process.env.GITHUB_OAUTH_TOKEN
                    ? {
                        Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
                        "Content-Type": "application/json",
                    }
                    : {},
                next: {
                    revalidate: 3600,
                },
            },
        );

        if (response.ok) {
            const data = await response.json();
            stars = data.stargazers_count || stars; // Update stars if API response is valid
        }
    } catch (error) {
        console.error("Error fetching GitHub stars:", error);
    }

    return (
        <header
            className={cn(
                "supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full border-b border-border bg-background/40 backdrop-blur-lg",
            )}
        >
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="mr-2 flex items-center justify-center gap-2 font-bold">
                            <span className="sr-only">{siteConfig.name}</span>
                            <Blocks className="h-6 w-6 text-accent-foreground" />
                        </div>
                    </Link>
                </div>

            </div>
            {/* <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" /> */}
        </header>
    );
}