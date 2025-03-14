export function getAlertDialog02() {
    return `import { XCircle } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialog02() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>
                    Error Dialog
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 text-white border-0">
                <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-rose-400" />
                        <AlertDialogTitle className="text-white">Error Detected</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-gray-300">
                        We&apos;ve encountered an error processing your request. Please try again or contact support if the issue
                        persists.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-gray-800 p-3 rounded-md my-2 text-sm text-gray-300 font-mono">
                    Error Code: 500 - Internal Server Error
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 border-gray-700 hover:bg-gray-800 text-white hover:text-white">Dismiss</AlertDialogCancel>
                    <AlertDialogAction className="bg-rose-500 hover:bg-rose-600 text-white hover:text-white">Contact Support</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
`;
}