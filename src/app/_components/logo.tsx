import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CodeXml } from 'lucide-react';
import Link from 'next/link';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center justify-center gap-2 text-zinc-900 duration-200 dark:text-zinc-200',
        className,
      )}
    >
      <CodeXml className="text-emerald-400" />
      <div className="mr-4 flex items-center justify-center gap-1 font-bold">
        Extend <span className="text-emerald-400">UI</span>
        <Badge variant="outline" className="bg-muted">
          Beta
        </Badge>
      </div>
    </Link>
  );
}
