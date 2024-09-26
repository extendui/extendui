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
              <p className="bg-gradient-to-br from-black via-zinc-600 to-zinc-200 bg-clip-text text-start text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-neutral-200 dark:to-black/[0.6] sm:text-center sm:text-5xl">
                Welcome to Extend UI
              </p>
              <p className="text-xl font-normal tracking-tight text-slate-400">
                Extend UI is a collection of React components that can be used
                in any project that uses shadcn.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Link href="/components/button" passHref>
                  <Button
                    variant={'secondary'}
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
                    variant={'default'}
                    className="flex items-center justify-center gap-1"
                  >
                    <Star /> Star on GitHub
                  </Button>
                </Link>
              </div>
              <div className="gradient pointer-events-none absolute inset-0 -z-10 block opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
