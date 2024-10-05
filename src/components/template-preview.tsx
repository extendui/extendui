import type { ReactNode } from 'react';
import Link from 'next/link';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export default function TemplatePreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: 'outline',
        }),
        'not-prose group relative w-full gap-2',
      )}
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="size-4" />
    </Link>
  );
}
