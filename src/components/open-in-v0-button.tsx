import { Button } from "./extendui/button";
import { Icons } from "./icons/icons";

export function OpenInV0Button({ url }: { url: string }) {
    return (
        <Button
            aria-label="Open in v0"
            variant={'link'}
            className="h-auto"
        >
            <a
                href={`https://v0.dev/chat/api/open?url=${url}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 mr-1"
            >
                Open in
            </a>
            <Icons.v0 className="h-4 w-4 " />
        </Button>
    );
}