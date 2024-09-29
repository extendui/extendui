import { cn } from "@/lib/utils";

export default function Step({ className, ...props }: React.ComponentProps<"h3">) {
    return (
        <h3
            className={cn(
                "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    );
}
