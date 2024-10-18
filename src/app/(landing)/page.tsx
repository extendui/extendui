import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { ChevronRight, Globe, Recycle, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ButtonExample from '@/showcase/components/Button/button';
import ButtonSettingsEngine from '@/showcase/components/Button/settings-engine';
import FadeUp from '@/components/fadeup';
import { Card, CardContent } from '@/components/ui/card';

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
      <section
        id="features"
        className="container mx-auto px-4 py-16 md:py-24 lg:py-32"
      >
        <FadeUp delay={0.1} duration={0.8}>
          <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
        </FadeUp>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FadeUp delay={0.2} duration={0.8}>
            <Card className="border-none shadow-none">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Recycle className="h-12 w-12" />
                <h3 className="text-xl font-bold"> Reusable Components</h3>
                <p className="text-center text-gray-600">
                  Build your UI faster with our pre-built, customizable
                  components.
                </p>
              </CardContent>
            </Card>
          </FadeUp>
          <FadeUp delay={0.4} duration={0.8}>
            <Card className="border-none shadow-none">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Zap className="h-12 w-12" />
                <h3 className="text-xl font-bold"> Performance Optimized</h3>
                <p className="text-center text-gray-600">
                  Enjoy improved application performance with our optimized
                  component library.
                </p>
              </CardContent>
            </Card>
          </FadeUp>
          <FadeUp delay={0.6} duration={0.8}>
            <Card className="border-none shadow-none">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Globe className="h-12 w-12" />
                <h3 className="text-xl font-bold"> Easy Integration</h3>
                <p className="text-center text-gray-600">
                  Seamlessly integrate with your existing React and Next.js
                  projects.
                </p>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>
      <section
        id="components-showcase"
        className="container mx-auto px-4 py-16"
      >
        <h2 className="mb-8 text-center text-3xl font-bold">Components</h2>
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
