import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section id="hero" className="space-y-10">
        <div className="min-h-[calc(100dvh-4rem)] md:h-[100dvh] md:space-y-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center space-y-4 py-[32dvh] text-center">
            <div className="relative">
              <p className="bg-gradient-to-br from-black via-zinc-600 to-zinc-200 bg-clip-text text-center text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-neutral-200 dark:to-black/[0.6] sm:text-center sm:text-5xl">
                Welcome to Extend UI
              </p>
              <p className="mx-2 mt-6 max-w-2xl text-base font-normal tracking-tight text-slate-600 sm:text-xl">
                Reusable components built on{' '}
                <p className="inline font-semibold">shadcn/ui</p> to increase
                performance when building web applications.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link href="docs/components/button" passHref>
                  <Button
                    variant={'default'}
                    className="flex items-center justify-center gap-1"
                  >
                    Get started
                    <ChevronRight size={16} />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/extendui/extendui"
                  passHref
                  target="_blank"
                >
                  <Button
                    variant={'outline'}
                    className="flex items-center justify-center gap-1"
                  >
                    <Star size={18} /> Star on GitHub
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Icons.react className="h-8 w-8" />
                <Icons.tailwind className="h-8 w-8" />
                <Icons.radix className="h-8 w-8" />
                <Icons.motion className="h-8 w-8" />
              </div>
              <div className="gradient pointer-events-none absolute inset-0 -z-10 block opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
