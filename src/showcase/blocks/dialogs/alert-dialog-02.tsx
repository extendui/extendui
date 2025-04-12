import { XCircle } from 'lucide-react';

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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function AlertDialog02() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Error Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-0 bg-gray-900 text-white">
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-400" />
            <AlertDialogTitle className="text-white">
              Error Detected
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-300">
            We&apos;ve encountered an error processing your request. Please try
            again or contact support if the issue persists.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-2 rounded-md bg-gray-800 p-3 font-mono text-sm text-gray-300">
          Error Code: 500 - Internal Server Error
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-700 bg-gray-700 text-white hover:bg-gray-800 hover:text-white">
            Dismiss
          </AlertDialogCancel>
          <AlertDialogAction className="bg-rose-500 text-white hover:bg-rose-600 hover:text-white">
            Contact Support
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
