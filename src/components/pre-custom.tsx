import { Event } from "@/lib/events"
import { CopyButton, CopyNpmCommandButton } from "./copy-button"
import { StyleWrapper } from "./style-wrapper"
import { cn } from "@/lib/utils"
import { Style } from "@/registry/styles"
import { NpmCommands } from "@/types/unist.type"

type PreProps = React.HTMLProps<HTMLPreElement> & {
    __style__?: Style["name"]
    __rawString__?: string
    __withMeta__?: boolean
    __src__?: string
    __event__?: Event["name"]
} & NpmCommands

export function PreCustom({
    className,
    __rawString__,
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    __bunCommand__,
    __withMeta__,
    __src__,
    __event__,
    __style__,
    children,
    ...rest
}: PreProps) {
    return (
        <StyleWrapper styleName={__style__}>
            <div className="relative mb-4 mt-6">
                <pre
                    className={cn(
                        "max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
                        className
                    )}
                    {...rest}
                >
                    {children}
                </pre>
                {__rawString__ && (
                    <CopyButton
                        value={__rawString__}
                        src={__src__}
                        event={__event__}
                        className={cn(
                            "absolute right-4 top-4 z-10",
                            __withMeta__ && "top-16"
                        )}
                    />
                )}
                {__npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__ && (
                    <CopyNpmCommandButton
                        commands={{
                            __npmCommand__,
                            __yarnCommand__,
                            __pnpmCommand__,
                            __bunCommand__,
                        }}
                        className={cn(
                            "absolute right-4 top-4 z-10",
                            __withMeta__ && "top-16"
                        )}
                    />
                )}
            </div>
        </StyleWrapper>
    )
}