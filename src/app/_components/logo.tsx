import { Blocks } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center justify-center gap-2 text-zinc-900 duration-200 dark:text-zinc-200',
        className,
      )}
    >
      <div className="mr-4 flex items-center justify-center gap-2 font-bold">
        <Blocks className="h-6 w-6 text-emerald-600" />
        <span className="text-base font-bold">
          Extend
          <span className="text-emerald-600 dark:text-emerald-500">UI</span>
        </span>
        <Badge variant="outline" className="bg-muted">
          Alpha
        </Badge>
      </div>
    </Link>
  );
}
