import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import Step from '@/components/step';
import dynamic from 'next/dynamic';
import ButtonExample from '@/showcase/Button/button';
import ButtonSettingsEngine from '@/showcase/Button/settings-engine';
import FadeUp from '@/components/fadeup';

const DynamicSteps = dynamic(() => import('@/components/steps'));

export default function HomePage() {
  return (
    <main>
      <section id="hero" className="space-y-10">
        <div className="min-h-[calc(100dvh-4rem)] md:h-[100dvh] md:space-y-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center space-y-4 py-[32dvh] text-center">
            <div className="relative">
              <FadeUp delay={0.2} duration={0.8}>
                <h1 className="bg-gradient-to-br from-black via-zinc-600 to-zinc-400 bg-clip-text text-center text-3xl font-bold tracking-tight dark:from-white dark:via-neutral-200 dark:to-black/[0.6] sm:text-center sm:text-4xl md:text-6xl">
                  Welcome to Extend UI
                </h1>
              </FadeUp>
              <FadeUp delay={0.4} duration={0.8}>
                <p className="mx-2 mt-6 max-w-2xl text-base font-light tracking-tight dark:text-zinc-300 sm:text-xl">
                  Reusable components built on{' '}
                  <span className="inline font-semibold">shadcn/ui</span> to
                  increase performance when building web applications.
                </p>
              </FadeUp>
              <FadeUp delay={0.6} duration={1}>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Link href="/docs/" passHref>
                    <Button
                      variant="default"
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
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
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
              </FadeUp>
              <div className="gradient pointer-events-none absolute inset-0 -z-10 block opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Key Features</h2>
        <DynamicSteps>
          <Step>
            <FadeUp delay={0.2} duration={0.8}>
              Reusable Components
            </FadeUp>
          </Step>
          <FadeUp delay={0.25} duration={0.8}>
            <p className="mt-2">
              Build your UI faster with our pre-built, customizable components.
            </p>
          </FadeUp>
          <Step>
            <FadeUp delay={0.4} duration={0.8}>
              Performance Optimized
            </FadeUp>
          </Step>
          <FadeUp delay={0.45} duration={0.8}>
            <p className="mt-2">
              Enjoy improved application performance with our optimized
              component library.
            </p>
          </FadeUp>
          <Step>
            <FadeUp delay={0.6} duration={0.8}>
              Easy Integration
            </FadeUp>
          </Step>
          <FadeUp delay={0.65} duration={0.8}>
            <p className="mt-2">
              Seamlessly integrate with your existing React and Next.js
              projects.
            </p>
          </FadeUp>
        </DynamicSteps>
      </section>
      <section
        id="components-showcase"
        className="container mx-auto px-4 py-16"
      >
        <h2 className="mb-8 text-3xl font-bold">Components</h2>
        <div className="relative w-full content-center rounded-lg py-4 shadow-[inset_0_0_2px_rgba(0,0,0,0.1)] shadow-slate-300">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex items-center justify-center p-4">
              <Link href={'/docs/components/button'}>
                <ButtonExample />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <ButtonSettingsEngine />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
