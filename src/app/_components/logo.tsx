import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CodeXml } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../../../public/icon.png';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center justify-center gap-2 text-zinc-900 duration-200 dark:text-zinc-200',
        className,
      )}
    >
      <div className="mr-4 flex items-center justify-center gap-1 font-bold">
        <Image
          src={LogoImage}
          alt="Logo"
          width={600}
          height={600}
          className="h-8 w-8"
        />
        <span className="text-md font-bold">
          Extend{' '}
          <span className="text-emerald-600 dark:text-emerald-500">UI</span>
        </span>
        <Badge variant="outline" className="bg-muted">
          Alpha
        </Badge>
      </div>
    </Link>
  );
}
