import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section id="hero" className="space-y-10">
        <div className="min-h-[calc(100dvh-4rem)] md:h-[100dvh] md:space-y-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center space-y-4 py-[32dvh] text-center">
            <div className=" ">
              <p className="text-3xl font-semibold tracking-tight">
                Welcome to Extend UI
              </p>
              <p className="text-xl font-normal tracking-tight text-slate-400">
                Extend UI is a collection of React components that can be used
                in any project that uses shadcn.
              </p>
              <div className="mt-4">
                <Link href="/components/button" passHref>
                  <Button variant={'default'}>Get started</Button>
                </Link>
                <Link
                  href="https://github.com/extendui/extendui"
                  passHref
                  target="_blank"
                >
                  <Button variant={'link'} className="ml-2">
                    GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
